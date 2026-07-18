# Name: generate_digits.py
# Purpose: Produce every digit file in data/ from a single trusted computation.
# Description: Computes pi with the Chudnovsky formula using binary splitting
#   on plain integers, then slices one master result into the four published
#   digit files. One computation feeds every file, so the datasets can never
#   disagree with each other. Independent verification lives in
#   verify_digits.py, kept separate so a bug here cannot hide there.
# Usage: py scripts/generate_digits.py
# Tech Stack: Python 3, standard library only
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

import math
import sys
import time
from pathlib import Path

# Digit counts of the published files. The largest drives the computation;
# the smaller files are prefixes of the same result.
SIZES = [1_000, 10_000, 100_000, 1_000_000]

# Extra digits computed beyond the largest file, so truncation error in the
# final division can never reach a published digit.
GUARD = 10

# Chudnovsky constants. Each series term contributes about 14.18 digits,
# which is why this formula holds every computation record since 1989.
C3_OVER_24 = 640320**3 // 24


def split(a, b):
    """Combine series terms a..b-1 into (P, Q, T) by halving the range.

    Binary splitting keeps every multiplication between numbers of similar
    size, which is what makes million-digit precision practical in plain
    Python. A term-by-term loop over the same series would run for days.
    """
    if b - a == 1:
        if a == 0:
            p = q = 1
        else:
            p = (6 * a - 5) * (2 * a - 1) * (6 * a - 1)
            q = a * a * a * C3_OVER_24
        t = p * (13591409 + 545140134 * a)
        return p, q, -t if a & 1 else t

    mid = (a + b) // 2
    p_left, q_left, t_left = split(a, mid)
    p_right, q_right, t_right = split(mid, b)
    return p_left * p_right, q_left * q_right, q_right * t_left + p_left * t_right


def pi_digits(count):
    """Return pi as a string of digits: '3' followed by count decimals."""
    terms = count // 14 + 2
    _, q, t = split(0, terms)

    # pi = 426880 * sqrt(10005) * Q / T, evaluated at a scale of 10^count
    # so the answer arrives as one big integer instead of a float.
    root = math.isqrt(10005 * 10**(2 * count))
    return str(426880 * q * root // t)


def write_wrapped(path, digits, count):
    """Write '3.' on its own line, then exactly 100 digits per line.

    Fixed-width lines make positions computable by eye: line n holds
    decimal places (n-1)*100+1 through n*100.
    """
    decimals = digits[1 : count + 1]
    lines = ["3."] + [decimals[i : i + 100] for i in range(0, count, 100)]
    path.write_text("\n".join(lines) + "\n", encoding="ascii", newline="\n")


def main():
    data_dir = Path(__file__).resolve().parent.parent / "data"
    data_dir.mkdir(exist_ok=True)

    total = max(SIZES) + GUARD
    sys.set_int_max_str_digits(total + 100)

    started = time.perf_counter()
    digits = pi_digits(total)
    elapsed = time.perf_counter() - started
    print(f"computed {total:,} digits in {elapsed:,.1f}s")

    for size in SIZES:
        path = data_dir / f"pi-{size}.txt"
        write_wrapped(path, digits, size)
        print(f"wrote {path.name}")


if __name__ == "__main__":
    main()
