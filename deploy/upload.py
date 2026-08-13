"""Upload the static export to the www.frankonia-korea.com document root.

Credentials come from the environment or a local `.env` file, never from this
file — the repository is public. Run after a production build:

    STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH= \
    NEXT_PUBLIC_SITE_ORIGIN=https://www.frankonia-korea.com \
    NEXT_PUBLIC_INDEXABLE=1 npx next build

    python deploy/upload.py

For a one-shot build + upload, use `deploy/deploy.py` instead.

Requires paramiko (`pip install paramiko`).

The far end is verified before anything is sent: its host key has to match
`deploy/known_hosts`, the user's `~/.ssh/known_hosts`, or the fingerprint in
SFTP_HOST_FINGERPRINT. An unrecognised key aborts the upload. Record it once
with `ssh-keyscan -p 22 <host> >> deploy/known_hosts`, and check the
fingerprint against what the hosting provider publishes rather than against
the connection you are trying to verify.

The site content goes up first and .htaccess last, so the document root is
never left pointing at a half-uploaded tree.
"""

import base64
import hashlib
import os
import posixpath
import stat
import sys
import time

import paramiko

# Every message below is written with an em dash, and the Windows console this
# is launched from is cp949, which cannot encode one. On 2026-08-12 that raised
# UnicodeEncodeError on the "host key verified" line — after the connection was
# open and one line before the first file would have gone up, which is the worst
# possible place for a print statement to end a deploy. Force UTF-8 on the
# streams rather than rewriting the prose in ASCII; `errors="replace"` means a
# console that still cannot render a glyph prints a placeholder instead of
# aborting the upload.
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8", errors="replace")
    except (AttributeError, ValueError):  # not a TextIOWrapper, or already detached
        pass

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# The tree to upload. `out/` by default, but overridable, because `out/` is not
# a safe place to spend forty minutes reading from: `npm test` and
# `npm run build:static` both rmtree it and write a *staging* build in its
# place, and the file list here is taken once at the start. A rebuild partway
# through has twice ended an upload on FileNotFoundError with the site half
# replaced — and would have been worse had it not, since the staging build
# carries the GitHub Pages base path. Point DEPLOY_SOURCE at a checkout or a
# copy that nothing else writes to, and a concurrent build cannot reach it.
LOCAL = os.environ.get("DEPLOY_SOURCE") or os.path.join(ROOT, "out")
HTACCESS = os.path.join(ROOT, "deploy", "htaccess")
KNOWN_HOSTS = os.path.join(ROOT, "deploy", "known_hosts")


def load_dotenv(path: str) -> None:
    """Populate os.environ from a KEY=VALUE file. Existing vars win."""
    if not os.path.isfile(path):
        return
    with open(path, "r", encoding="utf-8") as handle:
        for raw in handle:
            line = raw.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = value


load_dotenv(os.path.join(ROOT, ".env"))
REMOTE = os.environ.get("SFTP_REMOTE", "/public_html")


def fingerprint(key: paramiko.PKey) -> str:
    """The SHA256 fingerprint in the form OpenSSH prints it."""
    digest = hashlib.sha256(key.asbytes()).digest()
    return "SHA256:" + base64.b64encode(digest).decode().rstrip("=")


class PinnedHostKey(paramiko.MissingHostKeyPolicy):
    """Accept an unknown host only if its key matches a fingerprint we were
    told to expect. This is for CI and fresh machines, where there is no
    known_hosts file to check against but the fingerprint can be handed over
    as a secret."""

    def __init__(self, expected: str) -> None:
        self.expected = expected.strip()

    def missing_host_key(self, client, hostname, key) -> None:
        seen = fingerprint(key)
        if seen != self.expected:
            raise paramiko.SSHException(
                f"host key for {hostname} is {seen}, "
                f"but SFTP_HOST_FINGERPRINT says {self.expected} — "
                "refusing to upload"
            )


def connect(host: str, port: int, user: str) -> paramiko.SSHClient:
    """Open a verified SSH session.

    Without this the client would take whatever key the far end offers, which
    means anyone able to answer for the hostname can collect the password and
    then serve their own files from the document root. Trust comes from one of
    two places, in order: `deploy/known_hosts` or the user's own
    `~/.ssh/known_hosts`, else a fingerprint pinned in SFTP_HOST_FINGERPRINT.
    If neither is available the connection is refused rather than trusted.
    """
    client = paramiko.SSHClient()
    client.load_system_host_keys()
    if os.path.isfile(KNOWN_HOSTS):
        client.load_host_keys(KNOWN_HOSTS)

    pin = os.environ.get("SFTP_HOST_FINGERPRINT")
    client.set_missing_host_key_policy(
        PinnedHostKey(pin) if pin else paramiko.RejectPolicy()
    )

    key_file = os.environ.get("SFTP_KEY")
    client.connect(
        hostname=host,
        port=port,
        username=user,
        # A key is preferred: it is not replayable and never sits in .env as
        # plaintext. Password auth stays for hosts that allow nothing else.
        key_filename=key_file or None,
        passphrase=os.environ.get("SFTP_KEY_PASS") or None,
        password=os.environ.get("SFTP_PASS") or None,
        allow_agent=bool(key_file),
        look_for_keys=bool(key_file),
        timeout=30,
    )
    return client


def main() -> int:
    if not os.path.isdir(LOCAL):
        print(f"no build output at {LOCAL} — run the production build first")
        return 1

    # A staging build carries the GitHub Pages base path baked into every link
    # and would be broken on the real domain. Catch it before it ships.
    index = os.path.join(LOCAL, "index.html")
    if os.path.isfile(index):
        with open(index, "r", encoding="utf-8") as handle:
            html = handle.read()
        if "/Frankonia-Korea/_next/" in html:
            print("out/ was built for GitHub Pages (NEXT_PUBLIC_BASE_PATH=/Frankonia-Korea)")
            print("rebuild with an empty base path — see .env.example — then rerun")
            return 1
        if 'name="robots" content="noindex' in html:
            # Nearly always a forgotten variable: a production upload that no
            # search engine may read is not what the person running this wants.
            # A soft launch is the exception, so it gets a way to say so — and
            # says it loudly, because a site left this way stays invisible.
            if os.environ.get("ALLOW_NOINDEX") != "1":
                print("out/ was built with indexing held back (NEXT_PUBLIC_INDEXABLE unset)")
                print("rebuild with NEXT_PUBLIC_INDEXABLE=1, then rerun")
                print("if the soft launch is deliberate, set ALLOW_NOINDEX=1")
                return 1
            print("NOTE: uploading a noindex build (ALLOW_NOINDEX=1).")
            print("      robots.txt disallows everything and every page carries")
            print("      noindex. Nothing will be indexed until you rebuild with")
            print("      NEXT_PUBLIC_INDEXABLE=1 and redeploy.")

    missing = [k for k in ("SFTP_HOST", "SFTP_USER") if not os.environ.get(k)]
    if missing:
        print(f"missing environment variable(s): {', '.join(missing)}")
        print("fill them into .env (see .env.example) and rerun")
        return 1
    if not os.environ.get("SFTP_PASS") and not os.environ.get("SFTP_KEY"):
        print("no credential: set SFTP_KEY (preferred) or SFTP_PASS in .env")
        return 1

    host = os.environ["SFTP_HOST"]
    user = os.environ["SFTP_USER"]
    port = int(os.environ.get("SFTP_PORT", "22"))

    try:
        client = connect(host, port, user)
    except paramiko.BadHostKeyException as exc:
        print(f"the host key for {host} has CHANGED.")
        print(f"  expected {fingerprint(exc.expected_key)}")
        print(f"  got      {fingerprint(exc.key)}")
        print("this is either a server rebuild or someone in the middle.")
        print("confirm with the host before removing the old entry — do not just delete it.")
        return 1
    except paramiko.AuthenticationException as exc:
        # Caught ahead of SSHException, which it subclasses: the host key was
        # fine here, and sending the reader off to run ssh-keyscan would be
        # advice for a problem they do not have.
        print(f"{host} accepted the connection but refused the credential: {exc}")
        print("check SFTP_USER, and SFTP_KEY / SFTP_PASS in .env")
        return 1
    except paramiko.SSHException as exc:
        print(f"refusing to connect to {host}: {exc}")
        print("")
        print("if this is the first upload from this machine, record the host key:")
        print(f"    ssh-keyscan -p {port} {host} >> deploy/known_hosts")
        print("then check the fingerprint against what the hosting provider states —")
        print("reading it off the connection you are trying to verify proves nothing.")
        return 1

    sftp = client.open_sftp()
    sftp.get_channel().settimeout(120)
    print(f"connected to {host} — host key verified")

    # The document root has to be one the web server already serves. Every
    # directory below it is created on demand, so a mistyped root would be
    # created too, and the upload would report success while the domain went on
    # serving whatever was there before — the failure gives no sign of itself.
    try:
        sftp.stat(REMOTE)
    except IOError:
        print(f"the document root {REMOTE} does not exist on {host}")
        print("this account serves one directory per domain off its root;")
        print("check SFTP_REMOTE against what is actually there:")
        try:
            for name in sorted(sftp.listdir(".")):
                print(f"    /{name}")
        except IOError:
            pass
        client.close()
        return 1

    stamp = time.strftime("%Y%m%d-%H%M%S")
    backup = f"{REMOTE}/.htaccess.bak-{stamp}"
    try:
        with sftp.open(f"{REMOTE}/.htaccess") as handle:
            previous = handle.read()
        with sftp.open(backup, "wb") as handle:
            handle.write(previous)
        print(f"backed up .htaccess -> {backup}")
    except IOError:
        print("no existing .htaccess to back up")

    seen: set[str] = set()

    def ensure_dir(path: str) -> None:
        if path in ("", "/", REMOTE) or path in seen:
            return
        try:
            sftp.stat(path)
        except IOError:
            ensure_dir(posixpath.dirname(path))
            sftp.mkdir(path)
        seen.add(path)

    files = []
    for folder, _dirs, names in os.walk(LOCAL):
        for name in names:
            local = os.path.join(folder, name)
            files.append((local, os.path.relpath(local, LOCAL).replace("\\", "/")))

    for index_no, (local, relative) in enumerate(sorted(files, key=lambda item: item[1]), 1):
        remote = posixpath.join(REMOTE, relative)
        ensure_dir(posixpath.dirname(remote))
        sftp.put(local, remote)
        if index_no % 20 == 0 or index_no == len(files):
            print(f"  {index_no}/{len(files)} files")

    sftp.put(HTACCESS, posixpath.join(REMOTE, ".htaccess"))
    print("uploaded .htaccess")

    # Remove what the build no longer produces, so renamed or dropped assets do
    # not linger. Guarded on the upload having actually delivered a site, so a
    # broken build cannot empty the document root.
    if len(files) < 40:
        print(f"only {len(files)} files uploaded — skipping prune as a safety check")
    else:
        keep = {rel for _local, rel in files} | {".htaccess"}
        removed = 0

        def prune(remote_dir: str, prefix: str = "") -> None:
            nonlocal removed
            for entry in sftp.listdir_attr(remote_dir):
                name = entry.filename
                rel = f"{prefix}{name}"
                remote = posixpath.join(remote_dir, name)
                if stat.S_ISDIR(entry.st_mode):
                    prune(remote, f"{rel}/")
                    continue
                # Keep operator-managed files: backups and anything hidden.
                if name.startswith("."):
                    continue
                if rel not in keep:
                    sftp.remove(remote)
                    print(f"  removed stale {rel}")
                    removed += 1

        prune(REMOTE)
        print(f"pruned {removed} stale file(s)")

    print("deployment complete")

    client.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
