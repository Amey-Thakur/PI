# Name: bbp.py
# Purpose: Extract hexadecimal digits of pi at any position with the BBP formula.
# Description: The Bailey-Borwein-Plouffe formula can produce a hex digit of pi
#   deep in the expansion without computing the digits before it. The trick is
#   modular exponentiation: 16^(d-k) mod (8k+j) is evaluated exactly, so only a
#   small fractional tail needs floating point to pin down one hex digit.
# Usage: py bbp.py
# Tech Stack: Python 3, standard library only.
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18


_HEX = "0123456789ABCDEF"


def _series(j, d):
    """Fractional part of the j-th BBP sub-sum shifted to position d.

    The head runs on exact integer modular powers; the tail is a fast
    converging float sum that contributes only the low-order correction.
    """

    total = 0.0
    for k in range(d + 1):
        denominator = 8 * k + j
        total += pow(16, d - k, denominator) / denominator
        total -= int(total)

    tail = 0.0
    k = d + 1
    while True:
        term = 16.0 ** (d - k) / (8 * k + j)
        if term < 1e-17:
            break
        tail += term
        k += 1

    return (total + tail) % 1.0


def _hex_digit(d):
    """Return the single hex digit of pi at position d (0-based after point)."""

    fraction = (
        4 * _series(1, d)
        - 2 * _series(4, d)
        - _series(5, d)
        - _series(6, d)
    ) % 1.0

    return _HEX[int(16 * fraction)]


def hex_digits_at(position, count):
    """Return count hex digits of pi starting at the given position.

    Each digit is derived on its own, so rounding never accumulates from one
    digit to the next.
    """

    return "".join(_hex_digit(position + i) for i in range(count))


def main():
    at_zero = hex_digits_at(0, 10)
    at_thousand = hex_digits_at(1000, 10)

    print("Bailey-Borwein-Plouffe hex digit extraction:")
    print()
    print(f"  position 0:    {at_zero}")
    print(f"  position 1000: {at_thousand}")
    print()

    # Pi in hex is 3.243F6A8885..., so position 0 is a fixed known check.
    if at_zero == "243F6A8885":
        print("  position 0 verified as 243F6A8885.")
    else:
        print("  MISMATCH at position 0.")


if __name__ == "__main__":
    main()
