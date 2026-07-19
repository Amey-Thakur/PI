<!--
  Name: 16-hex-digit-oracle.md
  Purpose: Expert challenge to extract a far-out hex digit of pi with the BBP formula.
  Description: Asks the player to compute the hexadecimal digit of pi at position
    10000 without computing any digit before it, using the Bailey-Borwein-Plouffe
    formula, then to cross-check the answer against a second starting position.
    The verified answer is folded into the solution.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 16: The Hex Digit Oracle

> Tier: Expert. Name the 10,000th hex digit of pi without computing the 9,999 before it.

In 1995 David Bailey, Peter Borwein, and Simon Plouffe found a formula that
should not exist. It lets you reach into the middle of pi and read a single
hexadecimal digit far out in the expansion, without computing any of the digits
that come before it. No supercomputer, no billion-digit file, a few registers of
memory. You are going to use it as an oracle: ask for one digit, deep in, and get
it.

## The task

Compute the hexadecimal digit of pi at position 10000, counting hex digits after
the point, without computing positions 1 through 9999 first. Then prove your
answer to yourself.

1. Implement the BBP formula and extract the single hex digit at position 10000.

2. Cross-check it. Run the extraction a second time from a different starting
   position that overlaps position 10000, and confirm both agree on that digit.
   If two independent starting points disagree, your extraction is wrong.

3. State the answer as a hex character, `0` to `F`.

## Rules

- Standard library only.
- Fix the position convention and write it down. Here position `p` means the
  `p`-th hex digit after the point, one-indexed, so pi = `3.243F6A8885...` has
  `2` at position 1, `4` at position 2, `3` at position 3, and `F` at position 4.
- The named digit must be produced by the far-out extraction, not by expanding
  pi to 10000 places and indexing. That would defeat the whole exercise.

## The formula

$$\pi = \sum_{k=0}^{\infty} \frac{1}{16^k}\left(\frac{4}{8k+1} -
\frac{2}{8k+4} - \frac{1}{8k+5} - \frac{1}{8k+6}\right)$$

Because every term is scaled by a power of 16, multiplying the sum by
$16^{\,p-1}$ and keeping the fractional part shifts the digit you want to the
front. The integer part of each `16^(p-1) / (8k+j)` is thrown away with a modular
exponentiation, so the numbers stay tiny, and the tail past `k = p` is so small
you add only a handful of terms.

<details>
<summary>Hint 1: split it into four sums</summary>

Define one helper `S(j, n)` that returns the fractional part of
$\sum_{k} 16^{\,n-k}/(8k+j)$. The digit stream starting at position `p` comes
from `frac = 4*S(1, n) - 2*S(4, n) - S(5, n) - S(6, n)` with `n = p - 1`, taken
modulo 1. The leading hex digit of `frac` is position `p`.
</details>

<details>
<summary>Hint 2: keep only the fractional part</summary>

For `k` from 0 to `n`, the term is `pow(16, n-k, 8k+j) / (8k+j)`, and you add
these modulo 1. The `pow(base, exp, mod)` three-argument call is the whole trick:
it computes `16^(n-k) mod (8k+j)` without ever forming the huge power. For `k`
past `n`, add the ordinary floating terms `16.0**(n-k)/(8k+j)` until they fall
below your precision. Then multiply the fractional result by 16 repeatedly and
read off hex digits.
</details>

<details>
<summary>Hint 3: the cross-check that catches rounding</summary>

Double precision gives about nine trustworthy hex digits per extraction. So
extract a short run of digits, not just one. Start once at position 10000 and
read the first digit of the run. Start again at position 9995 and read the sixth
digit of that run. Both name position 10000. If they match, the leading digits of
both runs are in their trustworthy range and you can believe them.
</details>

<details>
<summary>Full solution and the answer</summary>

```python
# Name: bbp_oracle.py
# Purpose: Extract the hex digit of pi at a chosen position with the BBP formula.
# Description: Sums the four BBP series with modular exponentiation so no large
#   power is ever formed, keeps only the fractional part, and reads hex digits
#   off the front. A second overlapping start cross-checks the target digit.
# Usage: py bbp_oracle.py
# Tech Stack: Python 3, standard library only.
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18


def bbp_series(j, n):
    s = 0.0
    for k in range(n + 1):
        r = 8 * k + j
        s = (s + pow(16, n - k, r) / r) % 1.0
    k = n + 1
    while True:
        t = 16.0 ** (n - k) / (8 * k + j)
        if t < 1e-17:
            break
        s += t
        k += 1
    return s % 1.0


def hex_block(start_pos, count):
    n = start_pos - 1
    frac = (4 * bbp_series(1, n) - 2 * bbp_series(4, n)
            - bbp_series(5, n) - bbp_series(6, n)) % 1.0
    out = ""
    for _ in range(count):
        frac *= 16.0
        d = int(frac)
        out += "0123456789ABCDEF"[d]
        frac -= d
    return out


here = hex_block(10000, 8)
earlier = hex_block(9995, 8)

print("block from position 10000:", here)
print("digit at position 10000:  ", here[0])
print("block from position 9995: ", earlier)
print("its 6th digit (also 10000):", earlier[5])
print("cross-check agrees:", here[0] == earlier[5])
```

Running it prints:

```
block from position 10000: 68AC8FCF
digit at position 10000:   6
block from position 9995:  B49EC68A
its 6th digit (also 10000): 6
cross-check agrees: True
```

The hex digit of pi at position 10000 is **6**. The eight digits starting there
are `68AC8FCF`.

A third, unrelated check seals it. The verified decimal file
[`data/pi-1000000.txt`](../data/pi-1000000.txt) is an exact rational
`P / 10^1000000`. The hex digit at position `p` is
`(P * 16**p // 10**1000000) % 16`. Feeding it position 10000 through 10007
returns `68AC8FCF`, the same block, computed with no BBP machinery at all. Three
routes, one answer.
</details>

## What you just proved

You read a digit from deep inside pi without its neighbors. That is genuinely
strange: the formula does not compute pi faster than anyone else, and pulling
every digit this way would cost about as much as position times work. Its gift
is random access to a single far digit in bounded memory.

This is not a toy. Record computations use exactly this as their final proof. A
Chudnovsky run of trillions of digits is checked by extracting a hex digit near
the very end with a BBP-type formula and confirming it matches, a test that
shares none of the machinery that produced the record. You just ran the same
check, at position 10000 instead of position 100 trillion.

One catch worth knowing: no base-10 formula of this kind is known for pi. The
random access is a gift of base 16, not something anyone can currently do for the
decimal digits you memorized in [Challenge 1](README.md).

---

Continue: [Challenge 17: Doubling Down](17-doubling-down.md).

[The challenge ladder](README.md) · [How pi gets computed](../atlas/04-algorithms.md) ·
[Repository home](../README.md)
