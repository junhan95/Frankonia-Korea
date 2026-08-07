"""Build the production static export and upload it in one step.

Reads credentials and build variables from `.env` at the repo root (see
`.env.example`). Run from the repo root:

    python deploy/deploy.py

Steps:
    1. Load .env into the environment.
    2. Run `next build` with STATIC_EXPORT=1 and the NEXT_PUBLIC_* vars.
    3. Hand off to `deploy/upload.py`, which pushes `out/` over SFTP.

Any step that fails aborts the pipeline — the upload never runs on a broken
build. This is the last stage of the release path: local check, then GitHub
Pages staging, then here.
"""

import os
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEPLOY = os.path.dirname(os.path.abspath(__file__))


def load_dotenv(path: str) -> None:
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


def require(keys: list[str]) -> int:
    missing = [k for k in keys if not os.environ.get(k)]
    if missing:
        print(f"missing environment variable(s): {', '.join(missing)}")
        print("fill them into .env (see .env.example) and rerun")
        return 1
    return 0


def run(cmd: list[str], **kwargs) -> int:
    print(f"\n$ {' '.join(cmd)}")
    return subprocess.call(cmd, cwd=ROOT, **kwargs)


def main() -> int:
    load_dotenv(os.path.join(ROOT, ".env"))

    if require(["SFTP_HOST", "SFTP_USER", "SFTP_PASS"]):
        return 1

    os.environ["STATIC_EXPORT"] = "1"
    # The production site serves from the domain root, so no base path. The
    # GitHub Pages staging build is the one that needs /Frankonia-Korea.
    os.environ.setdefault("NEXT_PUBLIC_BASE_PATH", "")
    os.environ.setdefault("NEXT_PUBLIC_SITE_ORIGIN", "https://www.frankonia-korea.com")
    os.environ.setdefault("NEXT_PUBLIC_INDEXABLE", "1")

    # A stale out/ from a staging build would otherwise be uploaded verbatim
    # if the build failed to overwrite every file.
    shutil.rmtree(os.path.join(ROOT, "out"), ignore_errors=True)

    npx = shutil.which("npx") or shutil.which("npx.cmd")
    if not npx:
        print("npx not found on PATH — install Node.js first")
        return 1

    code = run([npx, "next", "build"])
    if code != 0:
        print("build failed — aborting upload")
        return code

    code = run([sys.executable, os.path.join(DEPLOY, "upload.py")])
    if code != 0:
        print("upload failed")
        return code

    print("\nall done")
    return 0


if __name__ == "__main__":
    sys.exit(main())
