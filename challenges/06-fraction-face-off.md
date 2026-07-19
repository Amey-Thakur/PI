<!--
  Name: 06-fraction-face-off.md
  Purpose: Compare 22/7 and 355/113 against true pi and count correct digits.
  Description: The reader divides two famous fractions out by hand, lines them up
    against pi, and finds that 355/113 is far better than its small size
    suggests. The digit counts and the continued fraction were confirmed in
    Python.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 06: Fraction Face-Off

Tier: Novice · Time: about 25 minutes

Before decimals, people carried π as a fraction. Two of them became famous:
22/7, the one every schoolbook still quotes, and 355/113, a fraction so good it
was found in fifth century China and not beaten for a thousand years. They look
like siblings. One is far, far smarter than the other.

## The task

Divide out both fractions and compare each against the true value

```
pi = 3.14159265358979...
```

For each fraction, count how many decimal places match π before the first
disagreement. Then answer the interesting question: 355/113 uses numbers barely
larger than 22/7, so why is it so much more accurate?

## You have solved it when

- [ ] You have the decimal expansion of 22/7 and of 355/113, several places
      each.
- [ ] You can state how many decimals of each agree with π.
- [ ] You have a reason, even a rough one, for why 355/113 does so well.

<details>
<summary>Hint</summary>

Carry each division out to at least seven decimal places, then lay the three
numbers in a column and read down until a digit breaks ranks. One fraction
parts ways with π almost immediately. The other stays locked to it far longer
than three digits over three digits has any right to.

</details>

<details>
<summary>Solution</summary>

Line them up:

```
22/7    = 3.1428571...
355/113 = 3.1415929...
pi      = 3.1415926...
```

22/7 agrees with π on 3.14, then breaks at the third decimal (2 against 1). Two
correct decimal places.

355/113 agrees on 3.141592, then breaks at the seventh decimal (9 against 6).
Six correct decimal places, from a fraction you could write on your hand.

Why the gap? The secret is continued fractions, the sequence of best possible
rational approximations to a number. For π it begins

```
pi = [3; 7, 15, 1, 292, ...]
```

Each place you stop gives a best in class fraction: stopping early gives 22/7,
going further gives 355/113. The magic is that big number 292. A large value
there means the fraction just before it is unusually accurate, because the next
correction is tiny. 355/113 sits right in front of the 292, so it borrows an
accuracy that its small denominator should never afford. That is why it punches
so far above its weight, and why it took a thousand years to beat.

</details>

Continue: [Challenge 07: Birthday Hunt](07-birthday-hunt.md). Related reading:
[Four thousand years of history](../atlas/02-history.md).
