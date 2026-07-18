#!/usr/bin/env python3
"""Replace the website APK and refresh size, SHA-256, and config metadata."""
from __future__ import annotations

import argparse
import hashlib
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = ROOT / "salat" / "assets" / "downloads"
CONFIG = ROOT / "salat" / "assets" / "js" / "config.js"
DESTINATION = DOWNLOADS / "firas-prayer-display.apk"
SHA_FILE = DOWNLOADS / "firas-prayer-display_SHA256.txt"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("apk", type=Path, help="Path to the newly signed APK")
    parser.add_argument("--version", default="2.6.5")
    parser.add_argument("--release-date", default="19 يوليو 2026")
    args = parser.parse_args()

    source = args.apk.expanduser().resolve()
    if not source.is_file() or source.suffix.lower() != ".apk":
        raise SystemExit(f"APK not found: {source}")

    DOWNLOADS.mkdir(parents=True, exist_ok=True)
    if source != DESTINATION.resolve():
        shutil.copy2(source, DESTINATION)

    digest = hashlib.sha256(DESTINATION.read_bytes()).hexdigest()
    size_mb = f"{DESTINATION.stat().st_size / 1024 / 1024:.1f} MB"
    SHA_FILE.write_text(f"{digest}  {DESTINATION.name}\n", encoding="utf-8")
    CONFIG.write_text(
        "window.APP_CONFIG = Object.freeze({\n"
        f'  version: "{args.version}",\n'
        f'  releaseDate: "{args.release_date}",\n'
        '  apkUrl: "assets/downloads/firas-prayer-display.apk",\n'
        '  apkFileName: "firas-prayer-display.apk",\n'
        f'  apkSize: "{size_mb}",\n'
        f'  sha256: "{digest}"\n'
        "});\n",
        encoding="utf-8",
    )
    print(f"Updated: {DESTINATION}")
    print(f"Size: {size_mb}")
    print(f"SHA-256: {digest}")


if __name__ == "__main__":
    main()
