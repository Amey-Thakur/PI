<!--
  Name: 12-the-feynman-point.md
  Purpose: Find the six nines hiding absurdly early in pi.
  Description: The reader writes a scanner for runs of identical digits,
    discovers 999999 at decimal position 762 in the repository's own data,
    and hears the story attached to it told honestly: the Feynman quote is
    folklore, the digits are fact.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 12: The Feynman Point

Tier: Apprentice · Time: about 30 minutes

Somewhere in the first thousand decimals of π, six identical digits sit in a
row. For a supposedly patternless number that is outrageous behavior: the
chance of any fixed six-digit window being one repeated digit is one in a
hundred thousand. Find the run yourself, in this repository's verified data,
before reading how early it shows up.

## The task

Write a program that reads [data/pi-1000000.txt](../data/pi-1000000.txt)
(strip the 3. line and the newlines) and reports the first run of six
identical consecutive digits: which digit, and at what decimal position it
starts.

## You have solved it when

- [ ] Your scanner reports a digit and a 1-based decimal position.
- [ ] You have checked the six digits by eye in [DIGITS.md](../DIGITS.md).
- [ ] You know why the position is surprising, and what it does not prove.

<details>
<summary>Hint</summary>

Slide a window of six characters along the digit string and stop when the set
of characters in the window has size one. Remember that position 1 means the
first digit after the decimal point, so your zero-based string index needs a
plus one before you report it.

</details>

<details>
<summary>Solution</summary>

```python
from pathlib import Path

digits = Path("data/pi-1000000.txt").read_text()
digits = digits.replace("3.", "", 1).replace("\n", "")

for i in range(len(digits) - 5):
    if len(set(digits[i:i + 6])) == 1:
        print(digits[i], "at decimal position", i + 1)
        break
```

```
9 at decimal position 762
```

Six nines, starting at decimal 762. You can see them with your own eyes in
[DIGITS.md](../DIGITS.md), row 751 to 800: ...4999999837... A run this early
is a lovely accident: on average you would wait about a hundred thousand
digits for the first one.

The name comes from a story that Richard Feynman wanted to memorize π to this
point so he could end a recitation with "nine nine nine nine nine nine, and so
on." It is a wonderful line with no reliable source: the earliest tellings
trace to piphilology books, not to Feynman. The digits are verified; the
attribution is folklore, and this repository labels each accordingly.

What it does not prove: nothing about randomness or normality. Streaks are
exactly what honest randomness looks like; see
[What nobody knows](../atlas/07-open-problems.md).

</details>

Continue: [Challenge 13: Walk the Digits](13-walk-the-digits.md). Related
reading: [The digits themselves](../atlas/05-digits.md).
