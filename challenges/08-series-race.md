<!--
  Name: 08-series-race.md
  Purpose: Race two series for pi and measure the gap between them.
  Description: The reader implements Leibniz and Nilakantha, runs both to six
    correct decimals, and discovers a factor of twenty five thousand between
    two formulas from the same family. All counts verified by running the
    exact code shown in the solution.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 08: The Series Race

Tier: Apprentice · Time: about 30 minutes

Two series, one number. The Madhava-Leibniz series is the most famous formula
for π and among the slowest ever used. Nilakantha's series, from the same
Kerala school two generations earlier than Europe's versions, looks barely
different and runs absurdly faster. Put them on the same track and time them.

## The task

Implement both series in any language:

- Leibniz: π = 4 (1 − 1/3 + 1/5 − 1/7 + ⋯)
- Nilakantha: π = 3 + 4/(2·3·4) − 4/(4·5·6) + 4/(6·7·8) − ⋯

Run each until its estimate is within 0.0000005 of π, meaning the first six
decimals are 141592. Count the terms each one needed.

## You have solved it when

- [ ] Both implementations converge to 3.141592 and beyond.
- [ ] You have an exact term count for each series.
- [ ] You can say, in one sentence, why one is so much faster.

<details>
<summary>Hint</summary>

The error of an alternating series is about the size of the first term you
drop. Leibniz terms shrink like 1/n. Nilakantha terms shrink like 1/n³.
Ask what n makes each of those smaller than 5 × 10⁻⁷ and you will know the
finish times before you run the race.

</details>

<details>
<summary>Solution</summary>

The race, in Python, with the finish line at an absolute error below 5 × 10⁻⁷:

```python
import math

s, n = 0.0, 0
while True:
    s += (-1) ** n / (2 * n + 1)
    n += 1
    if n > 10 and abs(4 * s - math.pi) < 5e-7:
        break
print("leibniz:", n)          # 2000001

est, k = 3.0, 0
while abs(est - math.pi) >= 5e-7:
    k += 1
    a = 2 * k
    term = 4.0 / (a * (a + 1) * (a + 2))
    est += term if k % 2 == 1 else -term
print("nilakantha:", k)       # 79
```

Leibniz crosses the line after 2,000,001 terms. Nilakantha crosses after 79.
Same target, a gap of about twenty five thousand times, and the only
difference is how fast the terms shrink: 1/n against 1/n³.

The moral scales: the [Chudnovsky series](../algorithms/python/chudnovsky.py)
in this repository shrinks its terms by a factor of about 10¹⁴ per step, which
is why it computes a thousand digits in the time these two spend arguing about
the sixth.

</details>

Continue: [Challenge 09: Machin's Shortcut](09-machins-shortcut.md). Related
reading: [How pi gets computed](../atlas/04-algorithms.md).
