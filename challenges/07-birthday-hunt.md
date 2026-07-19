<!--
  Name: 07-birthday-hunt.md
  Purpose: Find your birthday inside the digits of pi and understand why it fits.
  Description: The reader searches the million digit dataset for their birthday
    as DDMM and DDMMYY, using the site's Digit Search lab or a short script,
    then learns the plain probability behind the hit. Positions and the
    expected value were confirmed in Python against data/pi-1000000.txt.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 07: Birthday Hunt

Tier: Novice · Time: about 20 minutes

Your birthday is hiding in π. So is everyone's, and so is your phone number, and
that feels spooky until you count the odds, at which point it becomes obvious
and somehow better. Go find yours, then learn why it was never in doubt.

## The task

Write your birthday two ways: DDMM (day then month, four digits) and DDMMYY (add
the two year digits, six digits). Find each string inside the decimals of π and
record the position where it first appears.

Use the Digit Search lab on the
[site](https://amey-thakur.github.io/PI/), which searches a million decimals
instantly, or write a few lines of code against
[data/pi-1000000.txt](../data/pi-1000000.txt). Then guess, before reading on,
around what position a four digit string should first turn up.

## You have solved it when

- [ ] You have found your DDMM and noted its first position.
- [ ] You have searched for your DDMMYY and noted whether it appears in the
      first million decimals at all.
- [ ] You can explain why four digit strings tend to show up early and six digit
      strings often do not.

<details>
<summary>Hint</summary>

A short searcher is all you need. Read the digit file into one long string and
ask for the position of your birthday text:

```python
digits = open("data/pi-1000000.txt").read()
digits = "".join(c for c in digits if c.isdigit())[1:]   # drop the leading 3
print(digits.find("1403") + 1)                           # 1 for human position
```

For the odds: a specific four digit string has one chance in 10,000 of matching
at any given starting spot. That single number tells you about where to expect
the first hit.

</details>

<details>
<summary>Solution</summary>

Two worked examples, both confirmed against the million digit file:

- 1403 (the 14th of March) first appears at decimal position 6,053.
- 0314 first appears at decimal position 3,495.

Now the reasoning. A four digit string matches at any starting position with
probability 1 in 10,000, so on average you wait about 10,000 positions for the
first hit. Checked across all 10,000 possible four digit strings, the average
first appearance lands at position 9,941, right on the mark, and every one of
them shows up somewhere in the first million decimals. That is why your DDMM was
never really in question.

Six digits is a different story. A DDMMYY string has one chance in a million per
position, so its expected first appearance is near position 1,000,000, the very
edge of this dataset. About a third of six digit strings are still missing at
that depth: for instance 140388 does not appear in the first million decimals at
all. Search deeper and it will. Nothing here is mystical. It is only counting,
and π has room for all of it.

</details>

Continue: the Apprentice tier picks up at Challenge 08 in the
[challenges index](README.md). Related reading:
[What nobody knows](../atlas/07-open-problems.md).
