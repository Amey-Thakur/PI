# Name: gauss_legendre.py
# Purpose: Compute pi with the Gauss-Legendre AGM iteration using Decimal.
# Description: The arithmetic-geometric mean converges quadratically, so the
#   count of correct digits roughly doubles every iteration. This file runs
#   the iteration at 1000-digit precision and prints the correct-digit count
#   after each step so the doubling is plain to see.
# Usage: py gauss_legendre.py
# Tech Stack: Python 3, standard library only (decimal).
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

from decimal import Decimal, getcontext


def matching_digits(approx, reference):
    """Count leading digits shared by two Decimal values (point ignored)."""

    a = str(approx).replace(".", "")
    b = str(reference).replace(".", "")
    count = 0
    for x, y in zip(a, b):
        if x != y:
            break
        count += 1
    return count


def gauss_legendre(iterations):
    """Yield the pi estimate after each of the given AGM iterations."""

    a = Decimal(1)
    b = Decimal(1) / Decimal(2).sqrt()
    t = Decimal(1) / Decimal(4)
    p = Decimal(1)

    for _ in range(iterations):
        a_next = (a + b) / 2
        b = (a * b).sqrt()
        t -= p * (a - a_next) ** 2
        a = a_next
        p *= 2

        yield (a + b) ** 2 / (4 * t)


def main():
    # A little headroom above 1000 keeps the reference itself clean.
    getcontext().prec = 1030

    estimates = list(gauss_legendre(11))

    # The last iteration is fully converged, so it serves as the yardstick
    # for scoring every earlier one.
    reference = estimates[-1]

    print("Gauss-Legendre AGM, correct digits after each iteration:")
    print()

    previous = 0
    for i, estimate in enumerate(estimates[:-1], start=1):
        good = matching_digits(estimate, reference)

        if previous:
            ratio = f"{good / previous:.2f}x previous"
        else:
            ratio = "start"
        print(f"  iteration {i:2d}: {good:4d} correct digits ({ratio})")

        previous = good

        # Once past 1000 digits the doubling has made its point.
        if good >= 1000:
            break


if __name__ == "__main__":
    main()
