# Name: euler_basel.py
# Purpose: Approximate pi from Euler's solution to the Basel problem.
# Description: Euler proved that 1/1^2 + 1/2^2 + 1/3^2 + ... equals pi^2/6, so
#   pi is sqrt(6 * sum). The partial sums converge, but the leftover tail past N
#   terms is about 1/N, which means the last digits arrive slowly. Checkpoints
#   show the sqrt(6*sum) estimate creeping up.
# Usage: py euler_basel.py
# Tech Stack: Python 3, standard library only (math)
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

import math


# Sum reciprocals of squares, then read pi off as sqrt(6 * sum). The slow tail
# is the whole story here: doubling the work barely moves the trailing digits.

def main():

    print("Euler's Basel sum toward pi^2 / 6")
    print("reference pi = 3.14159265358979323846")
    print()
    print(f"{'terms':>10}  {'pi estimate':>18}  {'abs error':>10}")

    checkpoints = [10, 100, 1000, 10000, 100000, 1000000]
    target = max(checkpoints)

    total = 0.0
    idx = 0

    for n in range(1, target + 1):

        total += 1.0 / (n * n)

        if n == checkpoints[idx]:
            estimate = math.sqrt(6.0 * total)
            print(f"{n:>10}  {estimate:>18.15f}  {abs(estimate - math.pi):>10.2e}")
            idx += 1

    print()
    print("The tail beyond N terms is roughly 1/N, so accuracy comes in slowly.")
    print(f"true pi: {math.pi:.15f}")


if __name__ == "__main__":
    main()
