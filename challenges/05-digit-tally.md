<!--
  Name: 05-digit-tally.md
  Purpose: Tally how often each digit appears in the first 100 decimals of pi.
  Description: The reader counts the ten digits across the first hundred decimals
    (printed in the file) and finds the leader, then meets the idea that over
    the long run the digits even out. The tally was computed in Python from
    data/pi-1000.txt.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 05: Digit Tally

Tier: Novice · Time: about 25 minutes

Are the digits of π random? Nobody has proved they must be, yet they behave as
if they are, and the first place to look is a simple headcount. In a short
stretch the digits are lumpy and unfair. Take a census of the first hundred and
see who is winning so far.

## The task

Here are the first 100 decimals of π, copied exactly from
[data/pi-1000.txt](../data/pi-1000.txt), grouped ten to a block for counting:

```
1415926535 8979323846 2643383279 5028841971 6939937510
5820974944 5923078164 0628620899 8628034825 3421170679
```

Count how many times each digit 0 through 9 appears. Your ten counts must add
up to exactly 100. Then name the winner: the digit that shows up most.

## You have solved it when

- [ ] You have ten counts, one per digit, summing to 100.
- [ ] You can name the most frequent digit and how many times it appears.
- [ ] You can say roughly what each count would be if the digits were perfectly
      even (the answer is a round number).

<details>
<summary>Hint</summary>

Do not eyeball it. Go through the hundred digits once and make a tally mark next
to each digit as you meet it, or strike out each digit as you count all of one
kind. If the digits were perfectly even, every digit would appear exactly ten
times, so any count far from ten is where the short-run lumpiness lives.

</details>

<details>
<summary>Solution</summary>

The full tally of the first 100 decimals:

| Digit | Count |
|---:|---:|
| 0 | 8 |
| 1 | 8 |
| 2 | 12 |
| 3 | 11 |
| 4 | 10 |
| 5 | 8 |
| 6 | 9 |
| 7 | 8 |
| 8 | 12 |
| 9 | 14 |

The counts sum to 100. The winner is 9, appearing 14 times, well ahead of the
even share of 10. Just behind it, 2 and 8 tie at 12 each.

None of this means 9 is special. A perfectly even split would give every digit
exactly 10, and 14 for one digit in a sample of 100 is ordinary luck, not a
pattern. Widen the window and the lead melts: across the first thousand decimals
1 leads, and by the millionth decimal all ten digits sit within a tenth of a
percent of a perfectly even split. The lumpiness you just measured is real, and
it is exactly what randomness looks like up close.

</details>

Continue: [Challenge 06: Fraction Face-Off](06-fraction-face-off.md). Related
reading: [The digits themselves](../atlas/05-digits.md).
