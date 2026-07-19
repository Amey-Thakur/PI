# Name: check_links.py
# Purpose: Prove that no internal link in the repository points at nothing.
# Description: Scans every markdown file for relative links and fails if a
#   target file does not exist. External URLs are left alone: they belong to
#   the web, not to this check. Runs in CI so a renamed file can never
#   silently orphan the references to it.
# Usage: py scripts/check_links.py
# Tech Stack: Python 3, standard library only
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

import re
import sys
from pathlib import Path

LINK = re.compile(r"\[[^\]]*\]\(([^)\s]+)\)")

# Directories that never contain authored markdown.
SKIP_DIRS = {".git", "__pycache__", "node_modules", ".claude"}


def targets(md_file):
    """Yield each relative link target in a markdown file, fragment stripped."""
    for raw in LINK.findall(md_file.read_text(encoding="utf-8")):
        if raw.startswith(("http://", "https://", "mailto:", "#")):
            continue
        yield raw.split("#", 1)[0]


def main():
    root = Path(__file__).resolve().parent.parent
    broken = []

    for md in sorted(root.rglob("*.md")):
        if SKIP_DIRS.intersection(p.name for p in md.parents):
            continue
        for target in targets(md):
            if not (md.parent / target).exists():
                broken.append(f"{md.relative_to(root)} -> {target}")

    if broken:
        print("broken links:")
        for b in broken:
            print(" ", b)
        sys.exit(1)

    print("all internal links resolve")


if __name__ == "__main__":
    main()
