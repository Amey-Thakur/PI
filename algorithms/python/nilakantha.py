# Name: nilakantha.py
# Purpose: Approximate pi with the Nilakantha alternating series.
# Description: Nilakantha wrote pi = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - ...
#   Each correction uses three consecutive integers, so the terms fall like
#   1/n^3 and the sum closes on pi far quicker than Leibniz does. The same
#   checkpoints (10, 1000, 100000) show the gap in speed.
# Usage: py nilakantha.py
# Tech Stack: Python 3, standard library only (math)
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

import math


# Start at 3 and add shrinking, sign flipping corrections. Because each term is
# a product of three growing integers, accuracy arrives with very few terms.

def main():

    print("Nilakantha series for pi (faster than Leibniz)")
    print("reference pi = 3.14159265358979323846")
    print()
    print(f"{'terms':>10}  {'pi estimate':>18}  {'abs error':>10}")

    checkpoints = [10, 1000, 100000]
    target = max(checkpoints)

    total = 3.0
    idx = 0

    for k in range(1, target + 1):

        # The k-th correction uses the three integers 2k, 2k+1, 2k+2.
        m = 2.0 * k
        term = 4.0 / (m * (m + 1.0) * (m + 2.0))
        total += term if k % 2 == 1 else -term

        if idx < len(checkpoints) and k == checkpoints[idx]:
            print(f"{k:>10}  {total:>18.15f}  {abs(total - math.pi):>10.2e}")
            idx += 1

    print()
    print("At the same term count Nilakantha reaches many more digits than Leibniz.")
    print(f"true pi: {math.pi:.15f}")


if __name__ == "__main__":
    main()
