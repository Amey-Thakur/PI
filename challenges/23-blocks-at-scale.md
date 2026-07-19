<!--
  Name: 23-blocks-at-scale.md
  Purpose: Test digit pairs and triples across a million decimals with chi-square.
  Description: The reader counts all 100 pairs and 1000 triples in the million
    decimals, runs chi-square at the correct degrees of freedom, and writes an
    honest account of what a passing test can and cannot mean. Every count,
    statistic, and critical value here comes from a real run on data/pi-1000000.txt.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 23: Blocks at Scale

Tier: Master · Time: about 90 minutes

Single digits are the easy test, and π sails through it. The real question about
a "random" number is deeper: not just whether each digit is even, but whether the
pairs are even, and the triples, and the blocks past that. A number can have
perfectly balanced digits and still be deeply non-random in its pairs. This
challenge pushes the test up two levels, and then asks you to be honest about what
even a perfect result proves. The answer is: less than you want.

## The task

Read the million decimals from
[`data/pi-1000000.txt`](../data/pi-1000000.txt) and count blocks, not digits.

First the 100 possible pairs, 00 through 99. Then the 1000 possible triples, 000
through 999. Use non-overlapping blocks: chop the digit stream into adjacent
groups so each observation is independent, which is what the chi-square test
assumes. A million digits gives 500,000 pairs and 333,333 triples.

For each level, run a chi-square goodness-of-fit test against a flat expectation:
every pair equally likely at 1 in 100, every triple at 1 in 1000. Get the degrees
of freedom right, because that is the whole game. Then compare your statistic to
the critical value and say whether π stays inside the band.

Then write the hard paragraph: what this result can never prove, no matter how
clean it looks.

## You have solved it when

- [ ] You have counts for all 100 pairs and all 1000 triples, summing to 500,000
      and 333,333.
- [ ] You have a chi-square statistic and the matching degrees of freedom for
      each level, 99 for pairs and 999 for triples, and you can explain why it is
      the number of categories minus one.
- [ ] You have written down, in plain words, why passing these tests is not a
      proof that π is normal.

<details>
<summary>Hint</summary>

Degrees of freedom trips everyone. For 100 pair categories the value is 99, not
100 and not 98. The rule: number of categories minus one, because once you know
99 of the 100 category counts, the last is fixed by the total. There is no extra
subtraction here, because the expected frequency is set in advance at 1 in 100,
not estimated from the data.

The expected count per triple is 333,333 divided by 1000, about 333. That is
comfortably above 5, so chi-square is valid; if you ever push to blocks so long
that expected counts fall near zero, the test breaks and you need a different one.

For the critical value at 999 degrees of freedom, a good rule of thumb is that a
chi-square statistic clusters around its degrees of freedom, so a triple result
near 1000 is exactly what pure randomness looks like.

</details>

<details>
<summary>Solution</summary>

Here are the real numbers from the million decimals, non-overlapping blocks:

| Level | Blocks | Categories | df | Chi-square | 95% critical | Verdict |
|---|---|---|---|---|---|---|
| Singles | 1,000,000 | 10 | 9 | 5.51 | 16.92 | inside |
| Pairs | 500,000 | 100 | 99 | 105.83 | 123.23 | inside |
| Triples | 333,333 | 1000 | 999 | 998.09 | 1073.64 | inside |

All three sit calmly inside their 95% bands. The triple result is almost too good
to be true as a picture of randomness: a chi-square of 998.09 against 999 degrees
of freedom is the statistic landing right on its own mean, which is exactly where
honest noise lands on average. The rarest triple, 166, shows up 266 times; the
commonest, 714, shows up 393 times; expected is 333. That spread is ordinary
sampling scatter, not a fingerprint. For pairs, the rarest is 79 at 4,847 and the
commonest is 94 at 5,207, against an expectation of 5,000. Nothing stands out.

So π passes at three levels. Now the hard paragraph, and it is the point of the
whole challenge.

**This proves nothing about normality.** Not "almost proves" or "strongly
suggests a proof exists." Nothing. Here is why, in three pieces.

First, normality is a statement about the infinite tail, and every test you can
run touches only a finite front. Normality in base 10 means every block of length
k appears with limiting frequency exactly 10 to the minus k, as the number of
digits goes to infinity. A million digits is a front porch on an endless street.
The digits could be flawlessly balanced for the first trillion and then, at some
unimaginable depth, tilt forever. No finite test can see past its own last digit.

Second, passing a test is the wrong kind of evidence. A chi-square test can reject
uniformity when it fails; it can never accept it when it passes. A pass means only
"not caught," and "not caught" is consistent with genuine normality and equally
consistent with a rule too subtle to trip this particular test. Absence of a
detected pattern is not presence of proven randomness.

Third, and this is the sting: normality has never been proved for π in any base.
Not base 10, not base 2, not the weakest form of it. We cannot even prove that the
digit 7 appears infinitely often. Every statistic in the table above is consistent
with π being normal, and every one is equally consistent with it hiding a
structure no one has found. The numbers are beautiful and they are mute. That gap,
between overwhelming evidence and total absence of proof, is one of the oldest
open problems about π, and staring at a passing chi-square is the best way to feel
how wide it is.

Checked against `data/pi-1000000.txt`: all counts, statistics, and critical
values from a real run. See [What nobody knows](../atlas/07-open-problems.md) for
the proof status in full.

</details>

Continue: [Challenge 24: Pi from the Primes](24-pi-from-the-primes.md). Related
reading: [What nobody knows](../atlas/07-open-problems.md).
