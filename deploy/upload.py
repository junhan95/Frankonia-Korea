"""Upload the static export to the www.frankonia-korea.com document root.

Credentials come from the environment or a local `.env` file, never from this
file — the repository is public. Run after a production build:

    STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH= \
    NEXT_PUBLIC_SITE_ORIGIN=https://www.frankonia-korea.com \
    NEXT_PUBLIC_INDEXABLE=1 npx next build

    python deploy/upload.py

For a one-shot build + upload, use `deploy/deploy.py` instead.

Requires paramiko (`pip install paramiko`).

The site content goes up first and .htaccess last, so the document root is
never left pointing at a half-uploaded tree.
"""

import os
import posixpath
import stat
import sys
import time

import paramiko

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCAL = os.path.join(ROOT, "out")
HTACCESS = os.path.join(ROOT, "deploy", "htaccess")


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
            print("out/ was built with indexing held back (NEXT_PUBLIC_INDEXABLE unset)")
            print("rebuild with NEXT_PUBLIC_INDEXABLE=1, then rerun")
            return 1

    missing = [k for k in ("SFTP_HOST", "SFTP_USER", "SFTP_PASS") if not os.environ.get(k)]
    if missing:
        print(f"missing environment variable(s): {', '.join(missing)}")
        print("fill them into .env (see .env.example) and rerun")
        return 1
    host = os.environ["SFTP_HOST"]
    user = os.environ["SFTP_USER"]
    password = os.environ["SFTP_PASS"]

    transport = paramiko.Transport((host, 22))
    transport.connect(username=user, password=password)
    sftp = paramiko.SFTPClient.from_transport(transport)
    sftp.get_channel().settimeout(120)

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

    transport.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
