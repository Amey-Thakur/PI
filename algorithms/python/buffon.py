# Name: buffon.py
# Purpose: Estimate pi with Buffon's needle experiment.
# Description: Drop needles whose length equals the spacing between parallel
#   lines. The chance a needle crosses a line is 2/pi, so with n drops and c
#   crossings, 2n/c estimates pi. The run is seeded so the outcome repeats.
# Usage: py buffon.py
# Tech Stack: Python 3, standard library only (random, math).
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

import math
import random


def drop_needles(drops):
    """Return how many of the dropped needles cross a line.

    Needle length equals line spacing, so only the distance from the needle
    center to the nearest line and the tilt angle decide a crossing.
    """

    crossings = 0
    for _ in range(drops):
        # Distance from center to the nearest line, in [0, spacing/2].
        distance = random.uniform(0.0, 0.5)
        angle = random.uniform(0.0, math.pi / 2)

        if 0.5 * math.sin(angle) >= distance:
            crossings += 1

    return crossings


def main():
    # Fixed seed keeps the estimate reproducible.
    random.seed(271828)

    drops = 1_000_000
    crossings = drop_needles(drops)
    estimate = 2.0 * drops / crossings
    error = abs(estimate - math.pi)

    print("Buffon's needle (needle length equals line spacing):")
    print()
    print(f"  drops:     {drops}")
    print(f"  crossings: {crossings}")
    print(f"  estimate:  {estimate}   (2n / crossings)")
    print(f"  true pi:   {math.pi}")
    print(f"  error:     {error:.6f}")


if __name__ == "__main__":
    main()
