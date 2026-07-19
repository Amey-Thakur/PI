# Name: spigot.py
# Purpose: Stream the digits of pi with the Rabinowitz-Wagon spigot algorithm.
# Description: A spigot algorithm drips out digits of pi one at a time without
#   ever holding a big high-precision number. This is the 1995 Rabinowitz and
#   Wagon method: a fixed integer array acts as a mixed-radix accumulator, and
#   a held pre-digit lets a late carry ripple back before a digit is committed.
# Usage: py spigot.py
# Tech Stack: Python 3, standard library only.
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18


# First 210 digits of pi, used to check the stream we produce.
REFERENCE = (
    "314159265358979323846264338327950288419716939937510"
    "582097494459230781640628620899862803482534211706798"
    "214808651328230664709384460955058223172535940812848"
    "111745028410270193852110555964462294895493038196442881097"
)


def pi_stream(count):
    """Yield the first count digits of pi (leading 3 first), one at a time.

    The array is the only sizable state and it is allocated once, so the
    generator runs in memory that does not grow as digits stream out.
    """

    steps = count + 10
    length = (10 * steps) // 3 + 1

    a = [2] * length
    nines = 0
    predigit = 0

    produced = 0
    started = False

    for _ in range(steps):
        carry = 0

        # Sweep the columns from least to most significant, normalizing each
        # against its own odd radix and passing the carry inward.
        for i in range(length, 0, -1):
            value = 10 * a[i - 1] + carry * i
            a[i - 1] = value % (2 * i - 1)
            carry = value // (2 * i - 1)

        a[0] = carry % 10
        carry //= 10

        # A 9 might still be bumped by a carry from the next step, so hold it.
        if carry == 9:
            nines += 1
            continue

        if carry == 10:
            batch = [predigit + 1] + [0] * nines
            predigit = 0
        else:
            batch = [predigit] + [9] * nines
            predigit = carry

        nines = 0

        for digit in batch:
            # The algorithm opens with a placeholder digit; drop it once.
            if not started:
                started = True
                continue

            yield digit
            produced += 1
            if produced == count:
                return


def main():
    print("Rabinowitz-Wagon spigot, first 200 digits of pi:")
    print()

    collected = []
    line = []
    for digit in pi_stream(200):
        collected.append(str(digit))

        # Print in blocks so the one-at-a-time stream stays readable.
        line.append(str(digit))
        if len(line) == 50:
            print("  " + "".join(line))
            line = []

    if line:
        print("  " + "".join(line))

    produced = "".join(collected)
    print()
    if produced == REFERENCE[:200]:
        print("  verified against the first 200 known digits.")
    else:
        print("  MISMATCH against known digits.")


if __name__ == "__main__":
    main()
