<!--
  Name: 15-spigot-stream.md
  Purpose: Expert challenge to stream pi's digits with the Rabinowitz-Wagon spigot.
  Description: Asks the player to produce decimal digits of pi one at a time using
    only small integer arithmetic, with no big high-precision number and no final
    division. Hints and a full solution are folded away so nothing spoils early.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 15: The Spigot Stream

> Tier: Expert. Make the digits drip out one at a time, from a tap made of integers.

Most ways to compute pi build one enormous number and read it off at the end.
A spigot does the opposite. It emits digit after digit in order, using nothing
but small integers, and it never holds the whole value at once. Stanley
Rabinowitz and Stan Wagon published the trick in 1995. Your job is to build the
tap and watch pi pour out.

## The task

Write a program that prints the first 1,000 decimal digits of pi, printed as
they are produced, left to right, with these properties:

1. No big-number type. Every value in the working array fits in a machine
   integer. No arbitrary-precision floats, no `Decimal`, no fractions.

2. No division at the end. A digit is committed during the carrying passes, not
   by dividing one giant number by another once the run finishes.

3. Streaming output. The first digit appears before the last is computed, so a
   reader sees `3`, then `1`, then `4`, and so on.

## Rules

- Standard library only.
- The array length must be sized from the digit count up front. The 1995
  algorithm is bounded: you tell it how many digits you want, and it allocates
  `10*n/3 + 1` small entries. That is allowed. What is not allowed is holding a
  single high-precision number.
- Watch the nines. A run of 9s cannot be released immediately, because a later
  carry might turn `...8 9 9 9` into `...9 0 0 0`. Hold the pending digit and
  the count of 9s until the next pass decides them.

## You have solved it when

Your first 200 digits must read:

```
31415926535897932384626433832795028841971693993751
05820974944592307816406286208998628034825342117067
98214808651328230664709384460955058223172535940812
84811174502841027019385211055596446229489549303819
```

Compare against [`data/pi-1000.txt`](../data/pi-1000.txt) for the full first
thousand.

<details>
<summary>Hint 1: the series behind the tap</summary>

The spigot comes from writing pi in a mixed-radix form:

$$\pi = 2 + \frac{1}{3}\left(2 + \frac{2}{5}\left(2 + \frac{3}{7}\left(2 +
\cdots\right)\right)\right)$$

Each nested factor `i/(2i+1)` gives column `i` its own radix. The array holds
one small integer per column. You repeatedly multiply the whole array by 10,
normalize each column against its radix `2i-1`, and pass the carry inward.
</details>

<details>
<summary>Hint 2: the carry and the held digit</summary>

Sweep columns from the far end back to the front. For column `i`, form
`value = 10*a[i-1] + carry*i`, then set `a[i-1] = value % (2*i-1)` and
`carry = value // (2*i-1)`. At the front, `a[0] = carry % 10` and the new
leading `carry` is a candidate digit.

If that candidate is 9, do not print it yet. Count it. If the next pass
produces a 10, the held 9s each become 0 and the digit before them ticks up by
one. If it produces anything else, the held 9s were really 9s. This is the only
subtle part.
</details>

<details>
<summary>Solution</summary>

This repository ships the worked implementation at
[`algorithms/python/spigot.py`](../algorithms/python/spigot.py). The core is a
generator that allocates its array once and yields digits forever within the
requested bound:

```python
def pi_stream(count):
    steps = count + 10
    length = (10 * steps) // 3 + 1

    a = [2] * length
    nines = 0
    predigit = 0

    produced = 0
    started = False

    for _ in range(steps):
        carry = 0

        for i in range(length, 0, -1):
            value = 10 * a[i - 1] + carry * i
            a[i - 1] = value % (2 * i - 1)
            carry = value // (2 * i - 1)

        a[0] = carry % 10
        carry //= 10

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
            if not started:
                started = True
                continue
            yield digit
            produced += 1
            if produced == count:
                return
```

Change the shipped `main` to request 1,000 instead of 200, or call
`pi_stream(1000)` yourself. Running the file as shipped prints the first 200
digits and self-checks them:

```
Rabinowitz-Wagon spigot, first 200 digits of pi:

  31415926535897932384626433832795028841971693993751
  05820974944592307816406286208998628034825342117067
  98214808651328230664709384460955058223172535940812
  84811174502841027019385211055596446229489549303819

  verified against the first 200 known digits.
```

Notice what did not happen: no value ever exceeded a small integer, and no
division closed the run. Every digit fell out of the carry at the front of the
array, in order.
</details>

## What you just proved

Digits of pi can be produced with grade-school integer arithmetic and a fixed
array, one at a time, in order. It is not fast: the cost grows like the square
of the digit count, so no record was ever set this way. That was never the
point. The point is that the machinery is small enough to hold in your head,
and it shows a truth that feels impossible the first time you meet it, that you
can start reading pi without first computing it.

The 1995 version needs its length fixed in advance. Jeremy Gibbons removed even
that in 2006 with a truly unbounded stream. If you want the next rung, make your
tap run forever without being told when to stop.

---

Continue: [Challenge 16: The Hex Digit Oracle](16-hex-digit-oracle.md).

[The challenge ladder](README.md) · [How pi gets computed](../atlas/04-algorithms.md) ·
[Repository home](../README.md)
