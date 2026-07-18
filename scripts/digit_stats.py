# Name: digit_stats.py
# Purpose: Measure how evenly the digits 0-9 appear across the datasets.
# Description: Counts digit frequencies at four depths and runs a chi-square
#   test at each. Pi is believed normal but nobody has proved it, so these
#   numbers are evidence, not certainty; the atlas chapter on open problems
#   explains the gap. Output feeds data/digit-frequency.json, which the site
#   reads to render its frequency bars.
# Usage: py scripts/digit_stats.py
# Tech Stack: Python 3, standard library only
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

import json
from collections import Counter
from pathlib import Path

# Chi-square with 9 degrees of freedom stays below this value 95% of the
# time when digits are truly uniform. Crossing it once is noise; crossing
# it at every depth would be news.
CHI_SQUARE_95 = 16.919


def chi_square(counts, total):
    """Distance between observed digit counts and a perfectly even spread."""
    expected = total / 10
    return sum((counts[str(d)] - expected) ** 2 / expected for d in range(10))


def main():
    data_dir = Path(__file__).resolve().parent.parent / "data"
    source = data_dir / "pi-1000000.txt"
    decimals = source.read_text(encoding="ascii").replace("3.", "", 1).replace("\n", "")

    report = {
        "source": source.name,
        "note": "decimal digits only; the leading 3 is not counted",
        "chi_square_95_percent": CHI_SQUARE_95,
        "depths": {},
    }

    for depth in (1_000, 10_000, 100_000, 1_000_000):
        counts = Counter(decimals[:depth])
        ordered = {str(d): counts[str(d)] for d in range(10)}
        report["depths"][str(depth)] = {
            "counts": ordered,
            "chi_square": round(chi_square(ordered, depth), 3),
        }

    out = data_dir / "digit-frequency.json"
    out.write_text(json.dumps(report, indent=2) + "\n", encoding="ascii")
    print(f"wrote {out.name}")


if __name__ == "__main__":
    main()
