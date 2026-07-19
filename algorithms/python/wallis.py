# Name: wallis.py
# Purpose: Approximate pi with the Wallis infinite product.
# Description: Wallis found that pi/2 equals (2*2)/(1*3) times (4*4)/(3*5) times
#   (6*6)/(5*7) and so on, each factor being (2n * 2n) / ((2n-1)(2n+1)). The
#   product drifts toward pi, but its error falls only like 1/n, so it takes
#   many factors to gain each new digit.
# Usage: py wallis.py
# Tech Stack: Python 3, standard library only (math)
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

import math


# The product builds pi/2, so the estimate is twice the running product. Progress
# is printed at spaced checkpoints to make the slow crawl easy to read.

def main():

    print("Wallis product for pi")
    print("reference pi = 3.14159265358979323846")
    print()
    print(f"{'factors':>10}  {'pi estimate':>18}  {'abs error':>10}")

    checkpoints = [10, 100, 1000, 10000, 100000, 1000000]
    target = max(checkpoints)

    product = 1.0
    idx = 0

    for n in range(1, target + 1):

        product *= (2.0 * n) * (2.0 * n) / ((2.0 * n - 1.0) * (2.0 * n + 1.0))

        if n == checkpoints[idx]:
            estimate = 2.0 * product
            print(f"{n:>10}  {estimate:>18.15f}  {abs(estimate - math.pi):>10.2e}")
            idx += 1

    print()
    print("Each extra digit costs roughly ten times more factors here.")
    print(f"true pi: {math.pi:.15f}")


if __name__ == "__main__":
    main()
