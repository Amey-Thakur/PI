<!--
  Name: 19-identity-forge.md
  Purpose: Expert challenge to prove or falsify Machin-like arctangent identities.
  Description: Asks the player to verify famous Machin-like formulas for pi/4 at
    high precision by computing arctangent series, confirm the true ones agree
    with pi to hundreds of digits, and falsify a plausible-looking impostor by
    the size of its residual. The task is deciding identities by computation.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 19: The Identity Forge

> Tier: Expert. Take four arctangent formulas and let arithmetic rule each one true or false.

For 250 years, computing pi meant finding a good Machin-like identity: a way to
write $\pi/4$ as a whole-number combination of arctangents of small fractions,
where the series converge fast. Some are famous and correct. Some look correct
and are not. This challenge hands you a forge: compute both sides to hundreds of
digits and let the residual, the gap between them, deliver the verdict. A true
identity leaves a gap at the precision floor. A false one leaves a gap you can
see.

## The task

Verify three real identities and falsify one impostor, all by computation at high
precision.

Machin, 1706:
$$\frac{\pi}{4} = 4\arctan\frac{1}{5} - \arctan\frac{1}{239}$$

Euler:
$$\frac{\pi}{4} = \arctan\frac{1}{2} + \arctan\frac{1}{3}$$

Gauss, three terms:
$$\frac{\pi}{4} = 12\arctan\frac{1}{18} + 8\arctan\frac{1}{57} -
5\arctan\frac{1}{239}$$

Impostor, to be knocked down:
$$\frac{\pi}{4} \stackrel{?}{=} 4\arctan\frac{1}{5} - \arctan\frac{1}{238}$$

For each one, compute four times the right-hand side, compare to pi, and report
how many digits agree and how big the residual is.

## Rules

- Standard library only. `decimal` gives you the precision; the arctangent series
  gives you the values.
- Score against the verified digits in
  [`data/pi-1000000.txt`](../data/pi-1000000.txt), not against a library constant.
- A verdict is the residual. Do not eyeball the first few digits and call it
  proven. Compute the gap and read its exponent.

<details>
<summary>Hint 1: arctangent of a small fraction</summary>

For an integer `x`, the series

$$\arctan\frac{1}{x} = \frac{1}{x} - \frac{1}{3x^3} + \frac{1}{5x^5} - \cdots$$

converges quickly when `x` is large: each term is smaller than the last by a
factor of $x^2$. Carry each term as a `Decimal`, divide by $x^2$ to get the next,
alternate the sign, and stop when a term underflows your working precision.
</details>

<details>
<summary>Hint 2: what a true identity looks like</summary>

Set the precision to a margin above your target, say 1030 for a 1000-digit test.
A true identity will match pi for every digit you can check, and the residual
will sit at roughly $10^{-1000}$, which is just the floor set by where you
truncated the reference. A false identity betrays itself much earlier: the
residual is enormous by comparison, maybe $10^{-5}$, and it stops matching pi
after only a handful of digits.
</details>

<details>
<summary>Full solution and the verdicts</summary>

```python
# Name: identity_forge.py
# Purpose: Prove or falsify Machin-like identities for pi/4 by computation.
# Description: Computes arctan(1/x) from its series in Decimal, forms each
#   candidate combination, multiplies by four, and compares to the verified
#   reference pi by counting matching digits and measuring the residual.
#   Run from the repository root.
# Usage: py identity_forge.py
# Tech Stack: Python 3, standard library only (decimal).
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

from decimal import Decimal, getcontext

DIGITS = 1000
getcontext().prec = DIGITS + 30


def reference_pi(n_decimals):
    with open("data/pi-1000000.txt") as f:
        d = "".join(ch for ch in f.read() if ch.isdigit())
    return Decimal("3." + d[1:1 + n_decimals])


def arctan_inv(x):
    x = Decimal(x)
    x2 = x * x
    term = 1 / x
    total = Decimal(0)
    k = 0
    while term != 0:
        total += term / (2 * k + 1) if k % 2 == 0 else -term / (2 * k + 1)
        term /= x2
        k += 1
    return total


def verdict(name, terms):
    pi_est = 4 * sum(Decimal(c) * arctan_inv(d) for c, d in terms)
    a = str(pi_est).replace(".", "")
    b = str(pi_ref).replace(".", "")
    match = 0
    for x, y in zip(a, b):
        if x != y:
            break
        match += 1
    print(f"{name}")
    print(f"  digits matching pi: {match - 1}    residual ~ {abs(pi_est - pi_ref):.3e}")


pi_ref = reference_pi(DIGITS)

verdict("Machin 1706   : 4 atan(1/5) - atan(1/239)", [(4, 5), (-1, 239)])
verdict("Euler         : atan(1/2) + atan(1/3)", [(1, 2), (1, 3)])
verdict("Gauss 3-term  : 12 atan(1/18) + 8 atan(1/57) - 5 atan(1/239)",
        [(12, 18), (8, 57), (-5, 239)])
verdict("Impostor      : 4 atan(1/5) - atan(1/238)", [(4, 5), (-1, 238)])
```

Running it prints:

```
Machin 1706   : 4 atan(1/5) - atan(1/239)
  digits matching pi: 1000    residual ~ 3.810e-1001
Euler         : atan(1/2) + atan(1/3)
  digits matching pi: 1000    residual ~ 3.810e-1001
Gauss 3-term  : 12 atan(1/18) + 8 atan(1/57) - 5 atan(1/239)
  digits matching pi: 1000    residual ~ 3.810e-1001
Impostor      : 4 atan(1/5) - atan(1/238)
  digits matching pi: 4    residual ~ 7.032e-5
```

The three real identities match pi for all 1000 checked decimals, and their
residual is stuck at the floor, near $10^{-1000}$, exactly where truncating the
reference put it. They are true to every digit the test can see. The impostor,
one denominator off from Machin, agrees to only four decimals and then leaves a
residual of about $7 \times 10^{-5}$. That gap is the proof it is false.
</details>

## What you just proved

You decided the truth of four formulas without a single line of algebra, purely
by computation. The three genuine identities (Machin's own, Euler's two-term, and
Gauss's three-term) collapse the gap to pi below anything you can measure at 1000
digits. The impostor, which differs from Machin only in a `239` softened to a
`238`, cannot hide: it leaves a residual near $7 \times 10^{-5}$ while the true
formulas leave nothing a 1000-digit test can find, a difference of hundreds of
orders of magnitude.

Two honest cautions. First, agreement to 1000 digits is overwhelming evidence but
not a proof of an exact identity; a formula could in principle match to a
thousand digits and diverge at the ten-thousandth. The clean way to settle a
Machin-like formula for good is the tangent addition rule on the arguments, which
turns the whole question into integer arithmetic. Computation points the
flashlight; algebra nails the door shut. Second, a false identity can still be a
fine approximation: the impostor gives pi to four decimals, which would have
pleased an engineer in 1700. Good enough and true are different claims, and this
forge tells them apart.

---

Continue: [Challenge 20: The 292 Surprise](20-the-292-surprise.md).

[The challenge ladder](README.md) · [The formula collection](../atlas/03-formulas.md) ·
[Repository home](../README.md)
