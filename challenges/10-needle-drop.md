<!--
  Name: 10-needle-drop.md
  Purpose: Estimate pi by dropping simulated needles on a lined floor.
  Description: Buffon's 1777 experiment as code: needle length equal to line
    spacing, one hundred thousand drops, and pi emerges from pure chance. The
    printed run comes from the exact seeded program in the solution, so every
    number here reproduces to the digit.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 10: The Needle Drop

Tier: Apprentice · Time: about 40 minutes

Georges-Louis Leclerc, Comte de Buffon, asked what chance a dropped needle has
of crossing a line on a plank floor. The answer, for a needle as long as the
planks are wide, is 2/π. Which means a floor and enough patience is a π
computer. You have something better than patience: a loop.

## The task

Simulate 100,000 needle drops with needle length equal to line spacing. For
each drop, pick a random distance from the needle's center to the nearest line
and a random angle. Count crossings, then estimate π as
2 × drops / crossings. Use a seeded random generator so your run reproduces.

## You have solved it when

- [ ] Your estimate lands within a few hundredths of π.
- [ ] Running twice with the same seed prints the same number.
- [ ] You can state why the crossing probability is 2/π (or where to find out).

<details>
<summary>Hint</summary>

Drop the needle's center a distance d from the nearest line, uniform in
[0, 1/2] for spacing 1, and give it an angle θ uniform in [0, π). The needle
of length 1 crosses when d ≤ (1/2) sin θ. Integrate that condition over all
d and θ and the π in the answer is exactly the π you are hunting.

</details>

<details>
<summary>Solution</summary>

A self-contained version with its own tiny seeded generator, so the output is
identical on every machine:

```python
import math

seed = 31415
def rnd():
    global seed
    seed = (seed * 1103515245 + 12345) % 2**31
    return seed / 2**31

drops, crossings = 100000, 0
for _ in range(drops):
    center = rnd() * 0.5
    theta = rnd() * math.pi
    if center <= 0.5 * math.sin(theta):
        crossings += 1

print(crossings)                  # 63840
print(2 * drops / crossings)      # 3.1328320802005014
```

This run crosses 63,840 times in 100,000 drops and estimates π as 3.1328,
off by about 0.009. That is the honest face of Monte Carlo: a hundred
thousand samples buy roughly two digits, and every further digit costs a
hundred times more. The purpose-built version with the same conclusion lives
at [buffon.py](../algorithms/python/buffon.py), and the live floor you can
watch is the Buffon lab on
[the site](https://amey-thakur.github.io/PI/#labs).

Using math.pi and sin inside a hunt for π is fair here: the angle needs π
only to be uniform, and the rejection trick that avoids it entirely is a
lovely extra credit (sample a random point in a square, keep it if it lands
in the unit circle, and its angle is uniform without ever naming π).

</details>

Continue: [Challenge 11: The Wallis Crawl](11-wallis-crawl.md). Related
reading: [Pi in the physical world](../atlas/08-pi-in-science.md).
