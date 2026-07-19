<!--
  Name: 02-around-the-circle.md
  Purpose: Practice the two circle formulas by hand on three real objects.
  Description: The reader computes circumference and area for a coaster, a pizza,
    and a Ferris wheel using C = 2*pi*r and A = pi*r^2, then checks against
    sealed answers. Every number was computed with pi = 3.14159265 before
    publishing.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 02: Around the Circle

Tier: Novice · Time: about 20 minutes

π earns its keep in exactly two formulas you will use for the rest of your
life: the distance around a circle and the area inside it. Once these are in
your hands, every round thing in the world has a number attached. This is where
π stops being trivia and starts being a tool.

## The task

For each of the three circles below, compute the circumference and the area by
hand. Use π = 3.14159 and the two formulas

```
C = 2 * pi * r        A = pi * r^2
```

where r is the radius. Watch the units: a length stays a length, an area picks
up a square.

| Circle | Given | Find |
|---|---|---|
| A coaster | radius 5 cm | C and A |
| A pizza | diameter 30 cm | C and A |
| A Ferris wheel | radius 20 m | C and A |

The pizza gives you its diameter, not its radius. Halve it first.

## You have solved it when

- [ ] You have six numbers: a circumference and an area for each circle.
- [ ] Every area carries a squared unit (cm^2 or m^2) and every circumference a
      plain one (cm or m).
- [ ] Your numbers match the sealed answers to the rounding shown.

<details>
<summary>Hint</summary>

The only trap is the pizza. Diameter 30 cm means radius 15 cm, so put 15 into
both formulas, not 30. For the area, square the radius first, then multiply by
π. Squaring 15 gives 225, and 225 times π is where the pizza's area comes from.

</details>

<details>
<summary>Solution</summary>

Coaster, r = 5 cm:

```
C = 2 * 3.14159 * 5   = 31.4159 cm
A = 3.14159 * 5 * 5   = 78.5398 cm^2
```

Pizza, diameter 30 cm, so r = 15 cm:

```
C = 2 * 3.14159 * 15  = 94.2478 cm
A = 3.14159 * 15 * 15 = 706.8583 cm^2
```

Ferris wheel, r = 20 m:

```
C = 2 * 3.14159 * 20  = 125.6637 m
A = 3.14159 * 20 * 20 = 1256.6371 m^2
```

Notice the pattern hiding in the coaster: its circumference 31.4159 is just
10π, and its area 78.5398 is 25π. Whenever the radius is a round number the
answers are π times a round number, which is a quick way to sanity check your
arithmetic before you trust it.

</details>

Continue: [Challenge 03: Slow and Famous](03-slow-and-famous.md). Related
reading: [What is pi](../atlas/01-what-is-pi.md).
