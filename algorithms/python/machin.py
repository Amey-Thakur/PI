# Name: machin.py
# Purpose: Compute pi to 50 exact decimals with Machin's arctangent formula.
# Description: Machin's identity is pi/4 = 4 arctan(1/5) - arctan(1/239). Because
#   1/5 and 1/239 are small, their arctan series converge fast. Doing the whole
#   thing in scaled integers (no floats) keeps every digit exact, and the result
#   is checked against a hardcoded 50 decimal reference.
# Usage: py machin.py
# Tech Stack: Python 3, standard library only (no imports)
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18


def arctan_inv(x, unit):

    # Sum the series arctan(1/x) = 1/x - 1/(3 x^3) + 1/(5 x^5) - ... entirely in
    # integers scaled by `unit`. Working in integers means no rounding creeps in,
    # so the only care needed is a few guard digits absorbed by the caller.
    total = 0
    term = unit // x
    x_squared = x * x
    denom = 1
    sign = 1

    while term != 0:
        total += sign * (term // denom)
        term //= x_squared
        denom += 2
        sign = -sign

    return total


def main():

    digits = 50
    guard = 15
    unit = 10 ** (digits + guard)

    # pi = 16 arctan(1/5) - 4 arctan(1/239), scaled up by `unit`.
    pi_scaled = 16 * arctan_inv(5, unit) - 4 * arctan_inv(239, unit)

    # Drop the guard digits used only to keep the tail honest.
    pi_scaled //= 10 ** guard

    text = str(pi_scaled)
    computed = text[0] + "." + text[1:]

    reference = "3.14159265358979323846264338327950288419716939937510"

    print("Machin's formula: pi to 50 decimals with pure integer arithmetic")
    print()
    print(f"computed : {computed}")
    print(f"reference: {reference}")
    print(f"match    : {computed == reference}")


if __name__ == "__main__":
    main()
