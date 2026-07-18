# Name: verify_digits.py
# Purpose: Prove the published digit files correct by independent recomputation.
# Description: Recomputes pi with the Gauss-Legendre iteration on the decimal
#   module and compares it against every file in data/. Nothing is shared with
#   generate_digits.py: different formula, different arithmetic engine. Two
#   unrelated methods agreeing on a million digits is how record computations
#   are validated, applied here at repository scale.
# Usage: py scripts/verify_digits.py
# Tech Stack: Python 3, standard library only
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

import math
import sys
from decimal import Decimal, getcontext
from pathlib import Path

# First decimals of pi as printed in reference tables for over a century.
# Guards against the one failure both algorithms could share: a bug in how
# this repository writes files rather than in how it computes.
KNOWN_PREFIX = "14159265358979323846264338327950288419716939937510"


def pi_gauss_legendre(count):
    """Return pi as a string of digits: '3' followed by count decimals.

    Each iteration doubles the number of correct digits, so a million
    digits needs about twenty passes. The decimal module carries the
    precision; the loop only orchestrates.
    """
    getcontext().prec = count + 25

    a = Decimal(1)
    b = Decimal(1) / Decimal(2).sqrt()
    t = Decimal("0.25")
    p = 1

    for _ in range(int(math.log2(count)) + 3):
        a_next = (a + b) / 2
        b = (a * b).sqrt()
        t -= p * (a - a_next) ** 2
        a = a_next
        p *= 2

    pi = (a + b) ** 2 / (4 * t)
    return str(pi).replace(".", "")[: count + 1]


def read_digits(path):
    """Rebuild the digit string from a wrapped data file."""
    text = path.read_text(encoding="ascii")
    return "3" + text.replace("3.", "", 1).replace("\n", "")


def main():
    data_dir = Path(__file__).resolve().parent.parent / "data"
    files = sorted(data_dir.glob("pi-*.txt"), key=lambda p: len(p.read_text()))
    if not files:
        sys.exit("no data files found; run generate_digits.py first")

    largest = max(int(f.stem.split("-")[1]) for f in files)
    print(f"recomputing {largest:,} digits with Gauss-Legendre...")
    reference = pi_gauss_legendre(largest)

    if not reference.startswith("3" + KNOWN_PREFIX):
        sys.exit("FAIL: reference computation does not match the known prefix")

    for path in files:
        digits = read_digits(path)
        if digits != reference[: len(digits)]:
            first_bad = next(
                i for i, (x, y) in enumerate(zip(digits, reference)) if x != y
            )
            sys.exit(f"FAIL: {path.name} diverges at digit {first_bad}")
        print(f"ok {path.name}: {len(digits) - 1:,} decimals match")

    print("all files verified against an independent computation")


if __name__ == "__main__":
    main()
