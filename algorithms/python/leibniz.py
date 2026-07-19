# Name: leibniz.py
# Purpose: Approximate pi with the Leibniz alternating series.
# Description: The Leibniz series says pi/4 = 1 - 1/3 + 1/5 - 1/7 + ... It is
#   correct and famous but painfully slow: the error shrinks about as 1/terms,
#   so tenfold more work buys only one more correct digit. The checkpoints at
#   10, 1000, and 100000 terms make that sluggishness plain to see.
# Usage: py leibniz.py
# Tech Stack: Python 3, standard library only (math)
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

import math


# Odd denominators with alternating signs sum to pi/4, so the estimate is four
# times the running total. Watch how little the answer improves between stops.

def main():

    print("Leibniz series for pi (the slow classic)")
    print("reference pi = 3.14159265358979323846")
    print()
    print(f"{'terms':>10}  {'pi estimate':>18}  {'abs error':>10}")

    checkpoints = [10, 1000, 100000]
    target = max(checkpoints)

    total = 0.0
    idx = 0

    for n in range(target):

        # Sign alternates with n; denominator runs 1, 3, 5, 7, ...
        total += (-1.0) ** n / (2.0 * n + 1.0)

        if idx < len(checkpoints) and n + 1 == checkpoints[idx]:
            estimate = 4.0 * total
            print(f"{n + 1:>10}  {estimate:>18.15f}  {abs(estimate - math.pi):>10.2e}")
            idx += 1

    print()
    print("Even 100000 terms pins down only a handful of digits.")
    print(f"true pi: {math.pi:.15f}")


if __name__ == "__main__":
    main()
