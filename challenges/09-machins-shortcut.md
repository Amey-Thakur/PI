<!--
  Name: 09-machins-shortcut.md
  Purpose: Implement Machin's identity and hit the ceiling floats impose.
  Description: The reader builds the formula that held the record for two
    centuries, watches it converge in a handful of terms, and then runs into
    the wall every float user hits: fifteen digits, no more, no matter how
    many terms are added. The wall is the lesson.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 09: Machin's Shortcut

Tier: Apprentice · Time: about 40 minutes

In 1706 John Machin computed 100 digits of π by hand with one clever identity:

$$\frac{\pi}{4} = 4\arctan\frac{1}{5} - \arctan\frac{1}{239}$$

Small arguments make the arctangent series sprint instead of crawl. Your
version will outrun everything from Challenge 08 in a dozen terms, and then
stop dead at a wall Machin never had.

## The task

Implement Machin's identity using the arctangent series
arctan x = x − x³/3 + x⁵/5 − ⋯ with ordinary floating point numbers. Print
the estimate after each term until adding terms stops changing the answer.
Count the correct digits you end up with, and explain why more terms cannot
help.

## You have solved it when

- [ ] Your estimate agrees with π to at least 15 digits.
- [ ] You know after how many terms it stopped improving.
- [ ] You can explain the ceiling in one sentence about how floats store numbers.

<details>
<summary>Hint</summary>

Terms of arctan(1/5) shrink by a factor of 25 each step, so convergence is
never your problem. Precision is. A double holds about 16 significant decimal
digits; everything beyond that is rounded away before you can add it. When
your update becomes smaller than the last digit the float can represent, the
sum freezes.

</details>

<details>
<summary>Solution</summary>

```python
import math

def arctan(x, terms):
    total, power = 0.0, x
    for n in range(terms):
        total += power * (-1) ** n / (2 * n + 1)
        power *= x * x
    return total

pi = 4 * (4 * arctan(1/5, 12) - arctan(1/239, 5))
print(pi)               # 3.141592653589794
print(math.pi)          # 3.141592653589793
```

Twelve terms of arctan(1/5) and five of arctan(1/239) already give
3.141592653589794, which matches π in the first 15 digits and misses in the
sixteenth. Piling on terms changes nothing: a 64 bit float carries about 16
significant decimal digits, and the series update fell below that resolution.

The fix is the one Machin himself used: do not compute with a fixed window of
precision. Work in scaled integers that grow as needed. The repository's
[machin.py](../algorithms/python/machin.py) does exactly that and reaches 50
exact digits with the same identity, and nothing but whole numbers.

</details>

Continue: [Challenge 10: The Needle Drop](10-needle-drop.md). Related reading:
[The formula collection](../atlas/03-formulas.md).
