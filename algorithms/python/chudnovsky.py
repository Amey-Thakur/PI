# Name: chudnovsky.py
# Purpose: Compute pi to n digits with the Chudnovsky series via binary splitting.
# Description: The Chudnovsky brothers' series adds about fourteen digits per
#   term. Binary splitting evaluates the rational sum with only integer
#   multiplications, so a single big-integer square root at the end yields pi.
#   The demo computes 1000 digits and checks them against data/pi-1000.txt.
# Usage: py chudnovsky.py
# Tech Stack: Python 3, standard library only (math, os).
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

import math
import os


# Constants from the Chudnovsky identity.
_C = 640320
_C3_OVER_24 = _C ** 3 // 24


def _binary_split(a, b):
    """Return P, Q, T for the half-open term range [a, b).

    Splitting the range in half keeps the integers balanced in size, which is
    what makes the whole sum cost far less than adding terms one by one.
    """

    if b - a == 1:
        if a == 0:
            p = q = 1
        else:
            p = (6 * a - 5) * (2 * a - 1) * (6 * a - 1)
            q = a * a * a * _C3_OVER_24

        t = p * (13591409 + 545140134 * a)
        if a & 1:
            t = -t

        return p, q, t

    m = (a + b) // 2
    p_left, q_left, t_left = _binary_split(a, m)
    p_right, q_right, t_right = _binary_split(m, b)

    p = p_left * p_right
    q = q_left * q_right
    t = q_right * t_left + p_left * t_right

    return p, q, t


def pi_digits(n):
    """Return the first n digits of pi as a string, leading 3 included."""

    # Ten guard digits absorb the rounding in the final division so the digits
    # we hand back are all trustworthy.
    places = n + 10

    terms = int(places / 14.1816474627 + 1)
    p, q, t = _binary_split(0, terms)

    scale = 10 ** places
    sqrt_c = math.isqrt(10005 * scale * scale)
    pi_scaled = (q * 426880 * sqrt_c) // t

    return str(pi_scaled)[:n]


def _reference_path():
    """Locate data/pi-1000.txt relative to this file, not the caller's cwd."""

    here = os.path.dirname(os.path.abspath(__file__))
    root = os.path.dirname(os.path.dirname(here))
    return os.path.join(root, "data", "pi-1000.txt")


def main():
    digits = pi_digits(1000)

    raw = open(_reference_path()).read()
    reference = "".join(c for c in raw if c.isdigit())[:1000]

    if digits == reference:
        print("Chudnovsky binary splitting, 1000 digits verified.")
        print()
        print(f"  first 50: {digits[:50]}")
        print(f"  last 50:  {digits[-50:]}")
    else:
        first_bad = next(i for i in range(1000) if digits[i] != reference[i])
        print(f"MISMATCH at digit {first_bad}")


if __name__ == "__main__":
    main()
