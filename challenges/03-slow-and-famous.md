<!--
  Name: 03-slow-and-famous.md
  Purpose: Feel how slowly the Leibniz series converges by summing ten terms.
  Description: The reader adds the first ten terms of the Madhava-Leibniz series
    by hand or calculator, sees the result barely resemble pi, then estimates
    how many terms six correct figures would take. All numbers were checked by
    summing the series in Python.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 03: Slow and Famous

Tier: Novice · Time: about 20 minutes

The most beautiful formula for π is also one of the most useless. It is a
simple alternating sum of fractions, discovered in Kerala around 1400 and again
by Leibniz in the 1670s, and it does converge to π. It just does so at a pace
that would test a saint. You are about to feel exactly how slow.

## The task

The Madhava-Leibniz series says

```
pi / 4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - 1/11 + ...
```

Add up the first ten terms (the ones shown, ending at 1/19), then multiply your
total by 4 to get an estimate of π. Do it by hand or on a calculator, but write
each running total so you can watch it stagger toward the answer.

Then answer the real question: if ten terms get you this far, roughly how many
terms would you need for six correct figures, meaning 3.14159? Make a guess
before you open the solution.

## You have solved it when

- [ ] You have a single number, four times the ten-term sum.
- [ ] You can say how many correct decimals it actually has (it is not many).
- [ ] You have written down your estimate for reaching 3.14159, as an order of
      magnitude.

<details>
<summary>Hint</summary>

The error of an alternating series like this is never larger than the first
term you left out. After ten terms the next term is 1/21, so your estimate of
π/4 is off by roughly that, and π itself by about four times that. To shrink
the error to the size that six figures needs, ask how big the leftover term
1/(2N) has to become, then solve for N. The answer is uncomfortably large.

</details>

<details>
<summary>Solution</summary>

The ten-term sum, term by term:

```
1 - 1/3 + 1/5 - 1/7 + 1/9 - 1/11 + 1/13 - 1/15 + 1/17 - 1/19
```

That sum is 0.7604599..., and four times it is

```
4 * 0.7604599... = 3.0418396...
```

After ten terms of the most famous series for π, you have 3.0. Not one decimal
is correct yet. The estimate is still swinging above and below π by more than a
tenth.

Now the count. The error in π after N terms is about 2/N. Six figures means the
error must drop below roughly 5 in the sixth place, about 5 x 10^-6. Setting
2/N = 5 x 10^-6 gives N of about 400,000, so on the order of half a million
terms. Summed in Python to confirm: 500,000 terms give 3.141590..., which is
finally 3.14159 and no further. Half a million additions for six figures. The
Chudnovsky series in this repository gets more than a dozen new correct digits
from a single term, which is why nobody computes π this way and everybody loves
that this way exists.

</details>

Continue: [Challenge 04: A Hundred Darts](04-hundred-darts.md). Related
reading: [The formula collection](../atlas/03-formulas.md).
