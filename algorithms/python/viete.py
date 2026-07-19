# Name: viete.py
# Purpose: Approximate pi with Viete's nested square root product.
# Description: Viete gave the first exact formula for pi as an infinite product,
#   2/pi = (a1/2)(a2/2)(a3/2)..., where a1 = sqrt(2) and every next term nests
#   one more root: a_{k+1} = sqrt(2 + a_k). Multiply enough terms, invert, and
#   pi appears. It converges by roughly a factor of four each term.
# Usage: py viete.py
# Tech Stack: Python 3, standard library only (math)
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

import math


# Each factor is a cosine of a halving angle in disguise, so the running product
# tightens onto 2/pi. Taking 2 divided by the product returns pi itself.

def main():

    print("Viete's nested radical product for pi")
    print("reference pi = 3.14159265358979323846")
    print()
    print(f"{'terms':>6}  {'pi estimate':>18}  {'abs error':>10}")

    product = 1.0
    a = math.sqrt(2.0)

    for k in range(1, 26):

        product *= a / 2.0
        estimate = 2.0 / product

        print(f"{k:>6}  {estimate:>18.15f}  {abs(estimate - math.pi):>10.2e}")

        # Add one more nested root for the following factor.
        a = math.sqrt(2.0 + a)

    print()
    print(f"true pi: {math.pi:.15f}")


if __name__ == "__main__":
    main()
