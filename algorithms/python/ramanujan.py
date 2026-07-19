# Name: ramanujan.py
# Purpose: Compute pi with Ramanujan's 1914 series using Decimal arithmetic.
# Description: Ramanujan found a series for 1/pi whose terms shrink by roughly
#   eight decimal orders each step. This file sums five terms with Decimal,
#   inverts to get pi, and reports how many correct digits each partial sum
#   holds so the near constant gain per term is visible.
# Usage: py ramanujan.py
# Tech Stack: Python 3, standard library only (decimal, math).
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

from decimal import Decimal, getcontext
from math import factorial


# Pi to 50 places, used only to score how many digits each partial sum earns.
REFERENCE = "314159265358979323846264338327950288419716939937510"


def ramanujan_term(k):
    """One term of Ramanujan's series as an exact integer ratio.

    Keeping numerator and denominator as plain ints defers all rounding to
    the single Decimal division, which protects the digit count we report.
    """

    numerator = factorial(4 * k) * (1103 + 26390 * k)
    denominator = (factorial(k) ** 4) * (396 ** (4 * k))
    return Decimal(numerator) / Decimal(denominator)


def matching_digits(approx):
    """Count leading digits of approx that agree with the reference pi."""

    got = str(approx).replace(".", "")
    count = 0
    for a, b in zip(got, REFERENCE):
        if a != b:
            break
        count += 1
    return count


def main():
    # Sixty places of working precision leave headroom above the roughly
    # forty correct digits that five terms deliver.
    getcontext().prec = 60

    root_two = Decimal(2).sqrt()
    partial = Decimal(0)

    print("Ramanujan 1914 series, digits earned as terms accumulate:")
    print()

    previous = 0
    for k in range(5):
        partial += ramanujan_term(k)
        pi = Decimal(9801) / (2 * root_two * partial)

        good = matching_digits(pi)
        gained = good - previous
        previous = good

        print(f"  terms {k + 1}: {good:3d} correct digits (+{gained})")

    print()
    print(f"  approximation: {pi}")


if __name__ == "__main__":
    main()
