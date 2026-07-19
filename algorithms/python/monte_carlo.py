# Name: monte_carlo.py
# Purpose: Estimate pi by throwing random darts at a quarter circle.
# Description: Darts land uniformly on the unit square. The share that fall
#   inside the quarter circle approaches pi/4, so four times that share
#   estimates pi. The run is seeded for a repeatable result and shows why the
#   error shrinks only like 1 over the square root of the dart count.
# Usage: py monte_carlo.py
# Tech Stack: Python 3, standard library only (random, math).
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

import math
import random


def estimate_pi(darts):
    """Return the pi estimate from throwing the given number of darts."""

    inside = 0
    for _ in range(darts):
        x = random.random()
        y = random.random()
        if x * x + y * y <= 1.0:
            inside += 1

    return 4.0 * inside / darts


def main():
    # Fixed seed so the printed numbers are the same on every run.
    random.seed(31415)

    darts = 1_000_000
    estimate = estimate_pi(darts)
    error = abs(estimate - math.pi)

    print("Monte Carlo dart throwing:")
    print()
    print(f"  darts:     {darts}")
    print(f"  estimate:  {estimate}")
    print(f"  true pi:   {math.pi}")
    print(f"  error:     {error:.6f}")
    print()

    # The moral: statistical error falls off as 1 over sqrt(n). One more
    # correct decimal digit costs roughly a hundred times more darts.
    print(f"  1/sqrt(n): {1.0 / math.sqrt(darts):.6f}")
    print("  To gain one digit you need about 100x more darts.")


if __name__ == "__main__":
    main()
