<!--
  Name: 18-the-fairness-trial.md
  Purpose: Expert challenge to chi-square test the repo's million digits and pairs.
  Description: Asks the player to run a chi-square goodness-of-fit test on the
    single digits and on adjacent digit pairs of the verified million decimals,
    then to read the result honestly: what a pass does and does not prove, and
    what a failure would have meant. Stated statistics are checked against the
    repo's digit-frequency.json and a fresh run.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 18: The Fairness Trial

> Tier: Expert. Put pi's digits on trial for bias, then read the verdict correctly.

People say the digits of pi are random. That is a slippery claim, and this
challenge makes you test a precise, modest version of it: at the depth of a
million decimals, does each digit show up about a tenth of the time, and does
each pair of digits show up about a hundredth of the time? The chi-square test
answers exactly that. The harder part, the part most people get wrong, is saying
what a passing verdict actually means.

## The task

Run a chi-square goodness-of-fit test on
[`data/pi-1000000.txt`](../data/pi-1000000.txt), twice.

1. Per digit. Count how many times each of `0` through `9` appears in the million
   decimals. Expected count is 100,000 each. Compute the chi-square statistic
   with 9 degrees of freedom.

2. Per pair. Count how many times each of the 100 pairs `00` through `99`
   appears among non-overlapping adjacent digits. Expected count is 5,000 each
   over 500,000 pairs. Compute the statistic with 99 degrees of freedom.

3. Compare each statistic to the 95 percent critical value and state pass or
   fail.

4. Then answer in words: what does a pass prove, and what would a fail have
   meant?

## Rules

- Standard library only. `collections.Counter` and `json` are enough.
- Verify your per-digit statistic against the stored value in
  [`data/digit-frequency.json`](../data/digit-frequency.json). If your number and
  the file disagree, one of you has a bug. They must match.
- Use non-overlapping pairs for the pair test, so the 500,000 pairs are
  independent draws. Overlapping pairs share a digit with their neighbor and are
  not independent, which muddies the reference distribution.

<details>
<summary>Hint 1: the statistic</summary>

For observed counts $O_i$ and a single expected count $E$ shared by every bin,

$$\chi^2 = \sum_i \frac{(O_i - E)^2}{E}$$

Degrees of freedom is the number of bins minus one: 9 for the ten digits, 99 for
the hundred pairs. The million-decimal file is the character `3` followed by the
decimals; drop that leading `3` before counting, since it is the integer part,
not a decimal.
</details>

<details>
<summary>Hint 2: the critical values</summary>

The 95 percent critical value for 9 degrees of freedom is 16.919. It is stored
in the repository as `chi_square_95_percent` inside
[`data/digit-frequency.json`](../data/digit-frequency.json). For 99 degrees of
freedom it is 123.225. A statistic below the critical value is a pass: the counts
are as even as you would expect from genuine uniform randomness. A statistic
above it is a fail: the counts are lumpier than chance comfortably allows.
</details>

<details>
<summary>Full solution and the verdict</summary>

```python
# Name: fairness_trial.py
# Purpose: Chi-square the repo's million digits, per digit and per adjacent pair.
# Description: Counts single digits and non-overlapping digit pairs in the
#   verified million decimals, computes the two chi-square statistics, and checks
#   the per-digit value against the number stored in digit-frequency.json.
#   Run from the repository root.
# Usage: py fairness_trial.py
# Tech Stack: Python 3, standard library only (collections, json).
# License: MIT
# Author: Amey Thakur (https://github.com/Amey-Thakur)
# Date: 2026-07-18

import json
from collections import Counter


def load_decimals():
    with open("data/pi-1000000.txt") as f:
        digits = "".join(ch for ch in f.read() if ch.isdigit())
    return digits[1:]  # drop the leading 3, keep the decimals


def chi_square(counts, expected):
    return sum((c - expected) ** 2 / expected for c in counts)


d = load_decimals()

single = Counter(d)
single_counts = [single[str(k)] for k in range(10)]
chi_single = chi_square(single_counts, len(d) / 10)

pairs = Counter(d[i:i + 2] for i in range(0, len(d) - 1, 2))
pair_counts = [pairs[f"{a}{b}"] for a in range(10) for b in range(10)]
chi_pair = chi_square(pair_counts, sum(pair_counts) / 100)

with open("data/digit-frequency.json") as f:
    stored = json.load(f)["depths"]["1000000"]["chi_square"]

print(f"per digit  (9 df):  chi-square = {chi_single:.3f}   critical 16.919")
print(f"per pair  (99 df):  chi-square = {chi_pair:.3f}   critical 123.225")
print(f"stored per-digit value in json: {stored}")
print(f"per-digit matches json: {round(chi_single, 3) == stored}")
```

Running it prints:

```
per digit  (9 df):  chi-square = 5.509   critical 16.919
per pair  (99 df):  chi-square = 105.827   critical 123.225
stored per-digit value in json: 5.509
per-digit matches json: True
```

Both statistics sit below their critical values, so both pass. The per-digit
5.509 has an upper-tail probability near 0.79, and the per-pair 105.827 near
0.30, both squarely in the range you would expect from a fair coin with ten, or a
hundred, faces. The digits and their pairs are as even as randomness predicts.
</details>

## What a pass proves, and what it does not

A pass proves something narrow and real: at this depth, the single digits and the
adjacent pairs are distributed the way a uniform random source would distribute
them. Nothing in the counts stands out as biased. That is a genuine result, and
it is why "is my birthday in pi" almost always ends in yes.

A pass proves nothing about normality. A number is called normal in base 10 when
every finite block of digits, of every length, appears with exactly its fair
limiting frequency, forever. That is a statement about the infinite tail, and no
finite test can reach it. Passing at a million digits, or a trillion, is evidence
consistent with normality and not a proof of it. Whether pi is normal is one of
the great open questions: the digits pass every test thrown at them, yet nobody
has proved they must. See [What nobody knows](../atlas/07-open-problems.md).

And what would a fail have meant? Not that pi is broken. At this scale, on digits
two unrelated algorithms already agree on to the last place, a statistic past the
critical value would almost certainly mean a bug: a truncated file, a
miscount, the leading `3` left in, overlapping pairs counted as if independent.
The first suspect on a failed fairness trial is the trial, not pi. Only after the
test itself is beyond doubt would a real anomaly be worth a second look, and at a
mere million digits that is not where the smart money would be.

---

Continue: [Challenge 19: The Identity Forge](19-identity-forge.md).

[The challenge ladder](README.md) · [The digits themselves](../atlas/05-digits.md) ·
[Repository home](../README.md)
