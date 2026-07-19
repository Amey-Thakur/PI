<!--
  Name: 20-the-292-surprise.md
  Purpose: Expert challenge to compute pi's continued fraction and read the 292.
  Description: Asks the player to build the simple continued fraction of pi from
    the repository digits with integer arithmetic, find the term 292 early in the
    expansion, form the convergents, and explain why that large 292 is the reason
    355/113 approximates pi so well.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 20: The 292 Surprise

> Tier: Expert. Find the number hiding at position five of pi's continued fraction, and learn why 355/113 is a small miracle.

Written as a simple continued fraction, pi begins
$[3; 7, 15, 1, 292, 1, 1, 1, 2, \ldots]$. The first few terms are small and
ordinary. Then, in fifth place, a 292 appears, far larger than its neighbors.
That one number is the reason a fraction Chinese astronomers found around 480 CE,
355/113, matches pi to six decimals with only three digits on top and three on
the bottom. Your task is to compute the continued fraction yourself, from digits,
with nothing but integers, and then explain the 292.

## The task

1. Compute the simple continued fraction of pi from the repository digits using
   integer arithmetic. Recover $[3; 7, 15, 1, 292, 1, 1, 1, \ldots]$.

2. Form the convergents, the fractions you get by truncating the continued
   fraction after each term: 3, 22/7, 333/106, 355/113, and the next one.

3. Explain, with a computed number, what the 292 does: why truncating right
   before it gives 355/113, and why that convergent is so accurate.

## Rules

- Standard library only. `fractions.Fraction` keeps the arithmetic exact.
- The digits are truncated, so the true value of pi lies between `P/Q` and
  `(P+1)/Q`, where `P` is the digit string read as an integer and `Q` is the
  power of ten under it. A continued-fraction term is trustworthy only while both
  bounds still agree on it. Keep the shared prefix and stop where they part.
  Trusting terms past that point means reading noise from your own truncation.

<details>
<summary>Hint 1: the continued fraction is repeated division</summary>

A simple continued fraction is the Euclidean algorithm in disguise. Given a
fraction `num/den`, the next term is `num // den`, and then you replace
`(num, den)` with `(den, num - term*den)` and repeat. Start from pi as a
fraction and each floor division peels off one term. This is exactly how you
would reduce a fraction to lowest terms, only you record the quotients along the
way.
</details>

<details>
<summary>Hint 2: certify each term with the bracket</summary>

Run the peeling twice, once on `P/Q` and once on `(P+1)/Q`. The true pi sits
between them, so any term where the two runs agree is a term pi really has. The
moment they disagree, truncation has caught up with you and every later term is
suspect. This is how you know which terms you earned and which you imagined.
</details>

<details>
<summary>Hint 3: convergents from the terms</summary>

Build numerators and denominators with the standard recurrence. With terms
$a_0, a_1, a_2, \ldots$, set $h_{-1}=1, h_{-2}=0, k_{-1}=0, k_{-2}=1$ and then
$h_n = a_n h_{n-1} + h_{n-2}$, $k_n = a_n k_{n-1} + k_{n-2}$. Each $h_n/k_n$ is a
convergent, and it is the best rational approximation to pi among all fractions
with denominator no larger than $k_n$.
</details>

<details>
<summary>Full solution and the numbers</summary>

```python
# Name: continued_fraction.py
# Purpose: Build the simple continued fraction of pi from the repo digits.
# Description: Reads pi as an exact rational P/Q from the digit file, brackets the
#   true value between P/Q and (P+1)/Q, and keeps only the continued-fraction
#   terms both bounds agree on, so no term is an artifact of truncation. Then it
#   forms the convergents and measures how well 355/113 pins pi down.
#   Run from the repository root.
# Usage: py continued_fraction.py
# Tech Stack: Python 3, standard library only (fractions, decimal).
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

from fractions import Fraction
from decimal import Decimal, getcontext


def load_digits():
    with open("data/pi-1000.txt") as f:
        return "".join(ch for ch in f.read() if ch.isdigit())


def cf_terms(frac, limit):
    terms = []
    num, den = frac.numerator, frac.denominator
    for _ in range(limit):
        a = num // den
        terms.append(a)
        num, den = den, num - a * den
        if den == 0:
            break
    return terms


def certified_terms(digits, n_decimals, limit=80):
    P = int(digits[:1 + n_decimals])
    Q = 10 ** n_decimals
    lo = cf_terms(Fraction(P, Q), limit)
    hi = cf_terms(Fraction(P + 1, Q), limit)
    out = []
    for x, y in zip(lo, hi):
        if x != y:
            break
        out.append(x)
    return out


def convergents(terms):
    h_prev, h = 1, terms[0]
    k_prev, k = 0, 1
    result = [(h, k)]
    for a in terms[1:]:
        h, h_prev = a * h + h_prev, h
        k, k_prev = a * k + k_prev, k
        result.append((h, k))
    return result


digits = load_digits()
terms = certified_terms(digits, 1000)

print("continued fraction of pi, terms the data certifies:")
print(terms)
print()

for i, (h, k) in enumerate(convergents(terms[:6])):
    print(f"convergent {i}: {h}/{k}")
print()

getcontext().prec = 40
pi = Decimal(digits[0] + "." + digits[1:41])
approx = Decimal(355) / Decimal(113)
q_next = 292 * 113 + 106
error = abs(pi - approx)
bound = 1 / (Decimal(113) * Decimal(q_next))
print(f"355/113 as a decimal: {approx:.10f}")
print(f"|pi - 355/113|      : {error:.3e}")
print(f"the 292 makes the next denominator {q_next}")
print(f"so the error is about 1 / (113 * {q_next}) = {bound:.3e}")
```

Running it prints:

```
continued fraction of pi, terms the data certifies:
[3, 7, 15, 1, 292, 1, 1, 1, 2, 1, 3, 1, 14, 2, 1, 1, 2, 2, 2, 2, 1, 84, 2, 1, 1, 15, 3, 13, 1, 4, 2, 6, 6, 99, 1, 2, 2, 6, 3, 5, 1, 1, 6, 8, 1, 7, 1, 2, 3, 7, 1, 2, 1, 1, 12, 1, 1, 1, 3, 1, 1, 8, 1, 1, 2, 1, 6, 1, 1, 5, 2, 2, 3, 1, 2, 4, 4, 16, 1, 161]

convergent 0: 3/1
convergent 1: 22/7
convergent 2: 333/106
convergent 3: 355/113
convergent 4: 103993/33102
convergent 5: 104348/33215

355/113 as a decimal: 3.1415929204
|pi - 355/113|      : 2.668e-7
the 292 makes the next denominator 33102
so the error is about 1 / (113 * 33102) = 2.673e-7
```

The thousand decimals certify 80 terms, and the front of the list is exactly
$[3; 7, 15, 1, 292, 1, 1, 1, \ldots]$. The convergents march out as
3, 22/7, 333/106, 355/113, 103993/33102.
</details>

## What the 292 means

A convergent $p_n/q_n$ approximates pi with an error smaller than
$\dfrac{1}{q_n\, q_{n+1}}$, where the next denominator is
$q_{n+1} = a_{n+1} q_n + q_{n-1}$. Read that carefully: the size of the next
term, $a_{n+1}$, controls how good the current convergent is. A large next term
makes $q_{n+1}$ jump, which makes the error tiny.

355/113 is the convergent that sits right before the 292. So its accuracy is
governed by that 292:

$$q_{n+1} = 292 \times 113 + 106 = 33102, \qquad
|\pi - \tfrac{355}{113}| < \frac{1}{113 \times 33102} = \frac{1}{3\,740\,526}
\approx 2.673 \times 10^{-7}$$

The computed error, $2.668 \times 10^{-7}$, sits just under that bound. This is
why 355/113 feels like a cheat: with only three digits over three, it locks pi
down to six decimal places, an accuracy you would normally expect to buy with a
much larger denominator. The 292 is the whole reason. It says the next
improvement to 355/113 does not arrive until the denominator leaps to 33102, so
355/113 holds its lead for a long stretch of the number line. Zu Chongzhi found
this fraction in the fifth century and it went unbeaten for nearly a thousand
years.

And that is the general lesson hiding in the continued fraction: a large term is
the signal of an unusually good rational approximation just before it. Truncating
the continued fraction at any point hands you the single best fraction of its
size, and the terms you skip tell you how good that fraction is. Pi's early 292
is a small stroke of luck, and 355/113 is the prize.

---

Continue: [Challenge 21: The Million Club](21-the-million-club.md), where the Master tier begins.

[The challenge ladder](README.md) · [The formula collection](../atlas/03-formulas.md) ·
[Repository home](../README.md)
