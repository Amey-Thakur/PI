# Name: archimedes.py
# Purpose: Trap pi between inscribed and circumscribed polygons by doubling sides.
# Description: Archimedes started with a hexagon and kept doubling the side count.
#   The inscribed polygon stays shorter than the circle, the circumscribed one
#   stays longer, so pi is caught between their semiperimeters. Each doubling is
#   a harmonic mean followed by a geometric mean, both built from math.sqrt.
# Usage: py archimedes.py
# Tech Stack: Python 3, standard library only (math)
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

import math


# For a unit circle the semiperimeter of an inscribed polygon sits just below
# pi and a circumscribed one sits just above. Doubling the number of sides
# squeezes the pair together, so the true value is always in the reported range.

def main():

    # A regular hexagon is the clean starting point: its inscribed semiperimeter
    # is exactly 3, which is why Archimedes chose it.
    sides = 6
    lower = 3.0
    upper = 2.0 * math.sqrt(3.0)

    print("Archimedes polygon method: bounds on pi")
    print("reference pi = 3.14159265358979323846")
    print()
    print(f"{'sides':>12}  {'lower bound':>18}  {'upper bound':>18}  {'gap':>10}")
    print(f"{sides:>12}  {lower:>18.15f}  {upper:>18.15f}  {upper - lower:>10.2e}")

    for _ in range(25):

        # Harmonic mean gives the next circumscribed value, geometric mean the
        # next inscribed value. This is Archimedes' doubling in modern notation.
        upper = 2.0 * upper * lower / (upper + lower)
        lower = math.sqrt(upper * lower)
        sides *= 2

        print(f"{sides:>12}  {lower:>18.15f}  {upper:>18.15f}  {upper - lower:>10.2e}")

    print()
    print(f"final lower: {lower:.15f}")
    print(f"final upper: {upper:.15f}")
    print(f"true pi    : {math.pi:.15f}")


if __name__ == "__main__":
    main()
