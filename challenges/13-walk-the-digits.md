<!--
  Name: 13-walk-the-digits.md
  Purpose: Turn a thousand digits of pi into a walk and read it like a plot.
  Description: Each digit becomes a compass heading and the decimals steer a
    walker across the plane. The reader draws the pi walk, draws a walk on
    freshly random digits beside it, and tries to tell them apart. The net
    displacement figure comes from running the solution code on the repo data.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 13: Walk the Digits

Tier: Apprentice · Time: about 45 minutes

Statistics tables are one way to look at digits. A walk is a better one: let
every digit turn you, take a step, and repeat a thousand times. Structure
would bend the path into loops or drifts. Randomness gives you the wandering
scribble physicists call a random walk. Which one does π draw?

## The task

Map each digit d to a heading of d × 36 degrees, take a unit step per digit,
and trace the first 1,000 decimals of π from
[data/pi-1000.txt](../data/pi-1000.txt) with any plotting tool you like
(turtle graphics count). Then generate 1,000 genuinely random digits and walk
those beside it. Compare the two pictures.

## You have solved it when

- [ ] You have two walk pictures, π and random, drawn the same way.
- [ ] You measured the straight-line distance from start to end of the π walk.
- [ ] You have an honest answer to: can your eye tell which is which?

<details>
<summary>Hint</summary>

Keep running sums: x adds cos(d · 36°), y adds sin(d · 36°). For the
comparison, remember the mathematician's benchmark: a random walk of n unit
steps ends, on average, about √n from where it started. For n = 1000 that is
about 31.6. See where π lands against that.

</details>

<details>
<summary>Solution</summary>

The measurement half, on the repository data:

```python
import math
from pathlib import Path

digits = Path("data/pi-1000.txt").read_text()
digits = digits.replace("3.", "", 1).replace("\n", "")

x = y = 0.0
for ch in digits[:1000]:
    a = int(ch) * 2 * math.pi / 10
    x += math.cos(a)
    y += math.sin(a)

print(round(math.hypot(x, y), 1))     # 29.9
```

The π walk ends 29.9 steps from home, hugging the √1000 ≈ 31.6 that theory
predicts for honest randomness. Your random walk will land at a different
spot but a similar distance, and side by side the two scribbles are
indistinguishable: same aimless loops, same local clusters, no drift. That
indistinguishability is the point, and the reason chapter
[What nobody knows](../atlas/07-open-problems.md) exists: everything looks
random, nothing is proved.

The animated version lives in the Digit Walk lab on
[the site](https://amey-thakur.github.io/PI/#labs), where you can watch the
path draw itself.

</details>

Continue: [Challenge 14: Fifty From Memory](14-fifty-from-memory.md). Related
reading: [The digits themselves](../atlas/05-digits.md).
