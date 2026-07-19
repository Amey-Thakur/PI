<!--
  Name: 04-hundred-darts.md
  Purpose: Estimate pi by throwing random darts at a square (Monte Carlo).
  Description: The reader writes a ten line estimator, runs it at 100 and 10000
    darts, and sees the spread shrink as the count grows. The example runs and
    the error scaling were confirmed in Python before publishing.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 04: A Hundred Darts

Tier: Novice · Time: about 30 minutes

Here is a way to find π with no circles measured and no series summed: throw
random darts at a square and count how many land inside a circle. It sounds
like a magic trick. It is really just a ratio of areas, and it is your first
taste of how randomness can compute something exact.

## The task

Picture a 1 by 1 square with a quarter circle of radius 1 drawn inside it,
centered at one corner. A dart at position (x, y) lands inside the quarter
circle when x*x + y*y is at most 1. The quarter circle covers π/4 of the
square, so the fraction of darts that land inside, times 4, estimates π.

Write about ten lines of code in any language that throws n random darts and
returns the estimate. Run it with 100 darts, then with 10,000. Note how the
answer settles down as n grows.

## You have solved it when

- [ ] Your program prints an estimate near 3 for 100 darts.
- [ ] Your program prints an estimate near 3.14 for 10,000 darts.
- [ ] You can explain why 10,000 darts is steadier than 100, even though both
      use the same random throws.

<details>
<summary>Hint</summary>

You need three pieces: a loop that draws x and y each uniformly between 0 and 1,
a test x*x + y*y <= 1 that counts the hits, and a final 4 * hits / n. Run the
whole thing a few times at n = 100 and you will see the answer jump around by a
tenth or so between runs. That jumping is the point of the challenge.

</details>

<details>
<summary>Solution</summary>

Ten lines of Python, standard library only:

```python
import random

def estimate_pi(n):
    inside = 0
    for _ in range(n):
        x, y = random.random(), random.random()
        if x*x + y*y <= 1.0:          # inside the quarter circle
            inside += 1
    return 4 * inside / n

print(estimate_pi(100))
print(estimate_pi(10000))
```

Three runs at 100 darts gave 3.20, 3.16, and 3.12. Three runs at 10,000 gave
3.1416, 3.1496, and 3.126. The small runs scatter by a tenth or more; the large
runs cluster within a few hundredths of π.

The reason is the square root law. The typical error of this method shrinks like
1 over the square root of n, so going from 100 darts to 10,000, a hundred times
as many, only cuts the error by ten. That is why Monte Carlo is a wonderful way
to understand π and a terrible way to compute it precisely: reaching six correct
figures this way would take on the order of a trillion darts.

</details>

Continue: [Challenge 05: Digit Tally](05-digit-tally.md). Related reading:
[How pi gets computed](../atlas/04-algorithms.md).
