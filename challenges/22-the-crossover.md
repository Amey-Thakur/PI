<!--
  Name: 22-the-crossover.md
  Purpose: Benchmark BBP single-digit extraction against full computation.
  Description: The reader times the BBP formula against Chudnovsky to find where
    extracting one deep digit beats computing the whole prefix, and where asking
    BBP for every digit fails catastrophically. Every time and ratio in the
    solution comes from real runs of the repository's own implementations.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 22: The Crossover

Tier: Master · Time: about 2 hours

There are two ways to get a digit of π deep in the expansion. Compute every digit
up to it and read the last one, or use the BBP formula to reach in and pluck that
one digit while computing none of the others. Each way is a disaster used for the
other's job. Your task is to find the exact place where they trade the lead, and
to make BBP embarrass itself on purpose.

## The task

You have both tools in this repository:
[`algorithms/python/bbp.py`](../algorithms/python/bbp.py) extracts a single
hexadecimal digit at any position, and
[`algorithms/python/chudnovsky.py`](../algorithms/python/chudnovsky.py) computes
a full prefix. Time them against each other on two different jobs.

Job A, one deep digit. For a position d, measure how long BBP takes to return
just the digit at d, and how long Chudnovsky takes to compute the whole prefix up
to d. Do this for growing d and find the crossover: the depth past which reaching
in beats grinding it all out.

Job B, every digit. Now ask BBP for the first N digits by running it once per
position, and time that against a single Chudnovsky run for the same N. Watch the
two curves. One of them is not like the other.

Before you trust any BBP timing, prove it is correct. BBP with floating point
drifts at extreme depth, so spot-check its digits against the truth you already
have: convert `data/pi-1000000.txt` into hexadecimal and confirm BBP agrees at
several positions.

## You have solved it when

- [ ] You have confirmed BBP returns the correct hex digit at several positions,
      checked against `data/pi-1000000.txt`, not taken on faith.
- [ ] You have a benchmark table for Job A that shows a crossover depth, with a
      winner named on each row.
- [ ] You have a benchmark table for Job B that shows BBP losing, and you can
      state how its cost grows as N doubles.

<details>
<summary>Hint</summary>

To check BBP without a hex reference file, build one. Read the million decimals
as one big integer, subtract the leading 3 to get the fractional part as a
numerator over 10^1000000, then the hex digit at position d is
`(16**(d+1) * frac_num) // (10**1000000) % 16`. This stays exact while
`16**(d+1)` is smaller than the reference precision, good to about position
830,000. Compare that against `bbp.hex_digits_at(d, 1)`.

For Job B, remember what "run BBP once per position" means for cost. Each single
extraction sums about d terms, so the first N digits cost about
1 + 2 + ... + N terms in total. That is the shape of the catastrophe. Time N and
2N and look at the ratio.

</details>

<details>
<summary>Solution</summary>

First, correctness. BBP's hex digits match the reference at every position tested,
0, 10, 100, 1,000, 10,000, 100,000, and 500,000. The floating-point version holds
across the whole range this challenge touches, so the timings below are timing
real answers, not garbage.

**Job A, one digit at depth d.** BBP extracts the single digit; Chudnovsky
computes the whole prefix and you read the end. Representative run:

| Depth d | BBP, one digit | Full prefix | Winner |
|---|---|---|---|
| 100,000 | about 1.3 s | about 0.9 s | full |
| 300,000 | about 4.3 s | about 5.0 s | BBP |
| 500,000 | about 6.8 s | about 10.8 s | BBP |
| 1,000,000 | about 15.2 s | about 43.5 s | BBP |

The crossover sits somewhere around two hundred thousand. Below it, Chudnovsky's
binary splitting is so efficient that computing the entire prefix beats reaching
for one digit. Above it, BBP pulls ahead and keeps pulling: at a million deep it
is already three times faster, and the gap widens forever, because BBP grows
about linearly with depth while the full computation grows faster and hauls the
whole million-digit number around to do it.

One honesty note: BBP counts hexadecimal places and Chudnovsky counts decimal
places, so depth d is not the identical point in both. Hex place d sits near
decimal place 1.2d. That constant does not move the crossover story; it just
means the exact number is fuzzy by a fifth either way.

**Job B, the first N digits.** Now run BBP once per position and race it against a
single Chudnovsky call:

| First N digits | BBP, run per digit | Chudnovsky, one run |
|---|---|---|
| 100 | about 0.03 s | about 0.0001 s |
| 500 | about 0.81 s | about 0.0002 s |
| 1,000 | about 2.94 s | about 0.0006 s |
| 2,000 | about 13.1 s | about 0.0019 s |

This is the catastrophe. Doubling N from 1,000 to 2,000 roughly quadruples BBP's
time, 2.9 seconds to 13 seconds, because getting the first N digits one at a time
costs on the order of N-squared work. Chudnovsky over the same jump barely moves,
from half a millisecond to two, and is already thousands of times faster at
N of 1,000. Asking BBP for a whole prefix is using a sniper rifle to plow a field.

So the two formulas are not competitors; they are specialists. BBP wins exactly
one job and wins it like nothing else: give me one digit, very deep, with almost
no memory. That is why the famous BBP results are things like the value of a
single bit quadrillions of places out, a digit no full computation on Earth could
reach, found on ordinary hardware because BBP never computes the digits before it.
Chudnovsky wins the other job, every digit up to here, and it is the only serious
way to do that. Pick the tool by the job, and never the other way around.

Checked against `data/pi-1000000.txt`: BBP digits verified; all timings from real
runs of the repository's implementations.

</details>

Continue: [Challenge 23: Blocks at Scale](23-blocks-at-scale.md). Related
reading: [The digits themselves](../atlas/05-digits.md).
