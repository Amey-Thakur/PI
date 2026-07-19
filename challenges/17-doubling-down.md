<!--
  Name: 17-doubling-down.md
  Purpose: Expert challenge to watch Gauss-Legendre double its correct digits each step.
  Description: Asks the player to run the arithmetic-geometric mean iteration, score
    it against the repo's verified digits, and show the count of correct digits
    roughly doubling per iteration up past 1000. Closes with why quadratic
    convergence still loses the record books to Chudnovsky.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 17: Doubling Down

> Tier: Expert. Each turn of the crank should double the digits you already have.

Every method in this repository so far adds digits at a steady rate: a fixed
sliver per polygon doubling, a few digits per arctangent term. Gauss-Legendre
breaks that pattern. It roughly doubles the number of correct digits at every
single iteration. Three correct, then eight, then nineteen, then forty one, and
a handful of steps later you are past a thousand. Your task is to build it and
watch the doubling happen against digits you can trust.

## The task

Run the Gauss-Legendre (arithmetic-geometric mean) iteration and produce a table
that shows, after each iteration, how many leading digits are correct, scored
against the verified digits in this repository.

1. Implement the iteration with a high-precision decimal type.

2. After each step, compare your estimate to the reference in
   [`data/pi-1000000.txt`](../data/pi-1000000.txt) and count the leading digits
   that match.

3. Print a table of `iteration`, `correct digits`, and the ratio to the previous
   row. The ratio should hover around 2. Carry it past 1000 correct digits.

## Rules

- Standard library only. Python's `decimal` module is the natural engine.
- Set the working precision a comfortable margin above your target so the last
  useful row is not clipped by rounding. If you aim for 1000 digits, run the
  arithmetic near 1600.
- Score honestly against the repository file, not against your own last
  iteration. Grading an estimate by a slightly-less-converged estimate inflates
  the count.

## The iteration

Start with $a_0 = 1$, $b_0 = 1/\sqrt 2$, $t_0 = 1/4$, $p_0 = 1$, and repeat:

$$a_{n+1} = \frac{a_n + b_n}{2}, \qquad b_{n+1} = \sqrt{a_n b_n}, \qquad
t_{n+1} = t_n - p_n (a_n - a_{n+1})^2, \qquad p_{n+1} = 2 p_n$$

Then the estimate is $\pi \approx \dfrac{(a_{n+1} + b_{n+1})^2}{4\,t_{n+1}}$.

<details>
<summary>Hint 1: where the doubling comes from</summary>

The arithmetic mean and the geometric mean of two close numbers converge toward
each other quadratically: the gap after a step is about the square of the gap
before it. Squaring an error of size $10^{-d}$ gives $10^{-2d}$, which is the
statement that the count of correct digits doubles. Nothing else in the loop
matters to the rate; the `t` and `p` bookkeeping only turns the converged mean
into pi.
</details>

<details>
<summary>Hint 2: counting matching digits</summary>

Strip the decimal point from both your estimate and the reference string, then
walk the two character by character and stop at the first mismatch. Read the
reference straight from the repository file: it is the character `3` followed by
a million decimals, so `"3." + decimals[:1500]` is a clean yardstick to 1500
places.
</details>

<details>
<summary>Full solution and the table</summary>

```python
# Name: gl_doubling.py
# Purpose: Show Gauss-Legendre doubling its correct digits, scored on repo data.
# Description: Runs the AGM iteration in Decimal, and after each step counts the
#   leading digits that agree with the verified million-digit reference file, so
#   the roughly-times-two growth is visible in a table. Run from the repo root.
# Usage: py gl_doubling.py
# Tech Stack: Python 3, standard library only (decimal).
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

from decimal import Decimal, getcontext


def reference_pi(n_decimals):
    with open("data/pi-1000000.txt") as f:
        digits = "".join(ch for ch in f.read() if ch.isdigit())
    return "3." + digits[1:1 + n_decimals]


def matching_digits(approx_str, reference_str):
    a = approx_str.replace(".", "")
    b = reference_str.replace(".", "")
    count = 0
    for x, y in zip(a, b):
        if x != y:
            break
        count += 1
    return count


def gauss_legendre(iterations):
    a = Decimal(1)
    b = Decimal(1) / Decimal(2).sqrt()
    t = Decimal(1) / Decimal(4)
    p = Decimal(1)
    for _ in range(iterations):
        a_next = (a + b) / 2
        b = (a * b).sqrt()
        t -= p * (a - a_next) ** 2
        a = a_next
        p *= 2
        yield (a + b) ** 2 / (4 * t)


getcontext().prec = 1600
ref = reference_pi(1500)

print("iter | correct digits | ratio to previous")
previous = 0
for i, est in enumerate(gauss_legendre(9), start=1):
    good = matching_digits(str(est), ref)
    ratio = "-" if previous == 0 else f"{good / previous:.2f}x"
    print(f"{i:4d} | {good:14d} | {ratio}")
    previous = good
```

Running it prints:

```
iter | correct digits | ratio to previous
   1 |              3 | -
   2 |              8 | 2.67x
   3 |             19 | 2.38x
   4 |             41 | 2.16x
   5 |             84 | 2.05x
   6 |            171 | 2.04x
   7 |            345 | 2.02x
   8 |            694 | 2.01x
   9 |           1392 | 2.01x
```

Nine iterations, and correct digits ran 3, 8, 19, 41, 84, 171, 345, 694, 1392.
The ratio settles onto 2.0 once the iteration is warmed up. Keep going and the
same rule holds: about 20 iterations reach a million digits, about 34 reach ten
billion. Doubling is brutally effective.
</details>

## What you just proved

You watched quadratic convergence with your own eyes. Each iteration squares the
error, which is the same as doubling the correct digits, and a handful of steps
takes you further than the entire arctangent era managed by hand. This method,
turned into a pi algorithm by Salamin and Brent in 1976, carried the world
record through the 1980s.

So here is the puzzle. If Gauss-Legendre doubles its digits every step, why does
every record since 1989 belong to Chudnovsky, which only adds a flat 14 or so
digits per term? Doubling should crush a fixed rate.

The answer is what each step costs, not how much it earns. Every Gauss-Legendre
iteration touches the entire number at full precision and pays for a fresh
full-precision square root. To reach a trillion digits you rewrite a
trillion-digit number twenty times over and take twenty enormous square roots,
and moving that much memory, again and again, is where the real time goes.
Chudnovsky with binary splitting (see [Challenge 21](README.md) and the
[algorithms chapter](../atlas/04-algorithms.md)) avoids all of it: the big
multiplications stay balanced in size, exactly where fast multiplication is
quickest, and only one big division and one big square root happen at the very
end. Both methods land in the same complexity class, but Chudnovsky wins on the
constant, on tidy memory access, on clean checkpoints, and on parallelism. The
crank that doubles is elegant. The crank that streams balanced multiplications is
the one that holds the record.

---

Continue: [Challenge 18: The Fairness Trial](18-the-fairness-trial.md).

[The challenge ladder](README.md) · [How pi gets computed](../atlas/04-algorithms.md) ·
[Repository home](../README.md)
