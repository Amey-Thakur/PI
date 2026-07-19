<!--
  Name: 11-wallis-crawl.md
  Purpose: Measure how slowly the Wallis product earns its digits.
  Description: The reader implements the 1655 product, counts the 1,571 terms
    it needs for three correct decimals, and learns why products of ratios
    near one converge like series with terms near 1/n. Counts verified by
    running the exact code in the solution.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 11: The Wallis Crawl

Tier: Apprentice · Time: about 25 minutes

John Wallis found π hiding in the whole numbers in 1655, before calculus had
a name:

$$\frac{\pi}{2} = \frac{2}{1}\cdot\frac{2}{3}\cdot\frac{4}{3}\cdot\frac{4}{5}\cdot\frac{6}{5}\cdot\frac{6}{7}\cdots$$

It is one of the most beautiful formulas in this repository and one of the
least useful for computing. Today you find out exactly how least useful.

## The task

Implement the product, taking one factor pair (2k/(2k−1)) · (2k/(2k+1)) per
term. Count how many terms it takes for the estimate to stay within 0.0005 of
π, which locks the first three decimals at 141.

## You have solved it when

- [ ] Your product converges from below toward π.
- [ ] You have the exact term count for three correct decimals.
- [ ] You can explain the crawl: what does each factor look like as k grows?

<details>
<summary>Hint</summary>

Write one factor pair as 4k²/(4k² − 1) = 1 + 1/(4k² − 1). Multiplying by a
number that close to one nudges the running product by roughly 1/4k². Summed,
those nudges behave like the tail of a 1/k² series, so the leftover error
after n terms shrinks like 1/n. Three decimals means an error near 10⁻⁴,
which predicts a term count in the low thousands.

</details>

<details>
<summary>Solution</summary>

```python
import math

p, m = 1.0, 0
while True:
    m += 1
    p *= (2 * m) / (2 * m - 1) * (2 * m) / (2 * m + 1)
    if abs(2 * p - math.pi) < 5e-4:
        break
print(m)          # 1571
print(2 * p)      # 3.141092917235066
```

1,571 factor pairs for three decimals. The error after n terms is close to
π/(8n), so each extra decimal costs ten times more terms: about 15,700 for
four decimals, about 157,000 for five. Compare Nilakantha reaching six
decimals in 79 terms in [Challenge 08](08-series-race.md), and you see why
the infinite products are cherished as mathematics and retired as computers.
The working implementation lives at
[wallis.py](../algorithms/python/wallis.py).

</details>

Continue: [Challenge 12: The Feynman Point](12-the-feynman-point.md). Related
reading: [Four thousand years of history](../atlas/02-history.md).
