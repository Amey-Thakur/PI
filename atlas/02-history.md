<!--
  Name: 02-history.md
  Purpose: The narrative history of computing pi, from clay tablets to 314 trillion digits.
  Description: Tells the chase in five eras (rope and clay, polygons, infinite
    series, proof, machines), keeping every date and figure in exact agreement
    with docs/data/milestones.json so the atlas and the interactive timeline
    never disagree. Facts are stated plainly; the one live record is dated.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Four thousand years of history

Pi has been chased longer than almost any other number. This chapter walks
the whole chase in order: the rope-and-clay guesses of Babylon and Egypt, the
polygon squeeze that Archimedes invented and China perfected, the infinite
series that turned a hard geometry problem into arithmetic, the two proofs
that finally said what pi is and is not, and the machines that took the count
from thousands of digits to hundreds of trillions. Every date and value here
matches the timeline that drives the site. By the end you will know not just
how many digits we have, but why each jump was possible.

## Rope and clay

The oldest estimates come from people who needed circles for real work:
fields, granaries, wheels, altars. They did not care about proof. They cared
about a number good enough to build with.

A Babylonian clay tablet from somewhere between 1900 and 1600 BCE treats pi as
$25/8 = 3.125$. That is the earliest written estimate we know of, off the true
value by about five parts in a thousand. Good enough to lay out a grain store.

In Egypt around 1550 BCE, the scribe Ahmes copied out what we now call the
Rhind papyrus. One problem finds the area of a circle by squaring eight-ninths
of its diameter. Work that backward and it treats pi as

$$\left(\tfrac{16}{9}\right)^2 = \tfrac{256}{81} \approx 3.1605.$$

That is a hair high, but notice what it is not: it is not a fraction someone
measured. It is a rule, a recipe you can hand to the next scribe. The chase
had started before anyone thought to ask how accurate the answer really was.

## The polygon age

The first person to trap pi instead of guess it was Archimedes of Syracuse,
around 250 BCE. His idea still feels modern. A circle sits between two regular
polygons: one drawn inside it, one drawn around it. The inside polygon has a
smaller perimeter than the circle, the outside one a larger perimeter. Add
sides and both perimeters close in on the circle from opposite directions.

Archimedes worked his way up to 96-sided polygons, all by hand, with square
roots he had to approximate as fractions. He came out with

$$3\tfrac{10}{71} < \pi < 3\tfrac{1}{7},$$

that is, roughly $3.1408 < \pi < 3.1429$. This is the first rigorous result
about pi in history. It does not just give a number, it gives a guarantee: the
true value cannot be outside these walls. Every polygon method for the next
1,800 years is a variation on this one squeeze.

Others sharpened the tools. Around 150 CE, Ptolemy used $377/120 \approx
3.1416$ in the Almagest, his handbook of astronomy. In China in 263 CE, Liu
Hui built a polygon algorithm with built-in error control, so he knew how
wrong each step could be, and reached 3.1416 as well.

Then came the high-water mark of the whole era. Around 480 CE, Zu Chongzhi
pinned pi between 3.1415926 and 3.1415927, seven correct decimals, likely
using polygons of tens of thousands of sides. He also handed down the fraction

$$\pi \approx \tfrac{355}{113} = 3.14159292\ldots,$$

correct to six decimal places and beautifully easy to remember (the odd
numbers 1, 1, 3, 3, 5, 5 in a small pattern). No one on Earth would compute pi
more accurately for over 900 years. In India in 499 CE, Aryabhata gave 3.1416
and, tellingly, called it "approaching," a quiet hint that the exact value was
something you could walk toward but never reach.

The polygon age closed in Samarkand. In 1424, Jamshid al-Kashi computed 2 pi
to nine sexagesimal (base-60) places, which works out to 16 correct decimal
digits. He wanted an angle table so accurate that a circle the size of the
known universe would be off by less than the width of a horse's hair. His
record stood for nearly two centuries. In Europe, Ludolph van Ceulen spent
much of his life pushing polygons to 35 digits by 1610, a feat later carved on
his tombstone. Polygons had been squeezed about as far as human patience
allowed.

## The age of infinite series

Polygons hit a wall: to get one more digit you roughly double the number of
sides, and the arithmetic explodes. The escape was to stop doing geometry and
start adding up infinitely many simple terms.

The first person to reach pi this way worked in Kerala, in southern India,
around 1400. Madhava of Sangamagrama discovered the series for the arctangent
function, the same tool Europe would not have for another 250 years, and used
it to compute about 11 correct digits. His school knew that

$$\frac{\pi}{4} = 1 - \frac13 + \frac15 - \frac17 + \cdots$$

and, cleverly, they knew this exact form converges painfully slowly, so they
used faster variants with correction terms. This is one of the great "invented
early, lost to distance" moments in mathematics.

In Europe the breakthrough came as a formula, not a computation. In 1593
Francois Viete wrote pi as an infinite product of nested square roots:

$$\frac{2}{\pi} = \frac{\sqrt{2}}{2}\cdot\frac{\sqrt{2+\sqrt{2}}}{2}\cdot\frac{\sqrt{2+\sqrt{2+\sqrt{2}}}}{2}\cdots$$

It is the first time pi is written as an exact, closed expression rather than a
bound. In 1655 John Wallis found another exact form, this time built from
whole numbers alone and arrived at before calculus existed:

$$\frac{\pi}{2} = \frac{2}{1}\cdot\frac{2}{3}\cdot\frac{4}{3}\cdot\frac{4}{5}\cdot\frac{6}{5}\cdot\frac{6}{7}\cdots$$

Then calculus arrived and the arctangent series reached Europe independently:
James Gregory found it in 1671, Gottfried Leibniz the pi/4 case in 1674. (Isaac
Newton had already used series to grind out 15 digits around 1666, then wrote
that he was ashamed to admit how many figures he had carried, having nothing
better to do at the time.) The Gregory-Leibniz series is lovely and nearly
useless for computing: it needs hundreds of terms for two decimals.

John Machin fixed that in 1706. He split the arctangent into two much
faster-converging pieces:

$$\frac{\pi}{4} = 4\arctan\frac{1}{5} - \arctan\frac{1}{239}.$$

With it he computed 100 digits, and Machin-like formulas stayed the method of
record for the next two centuries. The same year, in Wales, William Jones
printed the Greek letter pi for this ratio for the first time, in his Synopsis
Palmariorum Matheseos. The symbol only became universal after Leonhard Euler
adopted it in his 1748 Introductio; when Euler used a notation, the world
followed.

## The age of proof

By the 1700s we could compute pi to any number of digits we had patience for.
The deeper questions were still open: is pi a fraction in disguise? Can you
build it with straightedge and compass? Two proofs, a century apart, answered
both, and one legislature nearly answered wrong.

In 1761, Johann Heinrich Lambert proved that pi is irrational. It cannot be
written as any ratio of whole numbers, which means its decimal expansion never
ends and never falls into a repeating cycle. The digits go on forever without
a pattern of that kind. This is why chasing more digits is not a wild goose
chase: there is always a genuinely new digit out there.

Then a cautionary tale. In 1873, the English amateur William Shanks published
707 digits of pi, the labor of years done entirely by hand. It was celebrated
as a monument. It was also wrong from digit 528 onward: only 527 of his 707
digits were correct. The error sat unnoticed for 71 years until D. F. Ferguson,
recomputing pi with a mechanical calculator in 1944 and 1945, found the
discrepancy. Shanks had spent a chunk of his life computing digits that no one
would use and no one would check for two generations.

In 1882, Ferdinand von Lindemann proved something stronger than irrationality:
pi is transcendental. It is not the root of any polynomial with whole-number
coefficients. This one result closed a problem that had been open for over
2,000 years. Squaring the circle, constructing a square with the same area as
a given circle using only straightedge and compass, requires building the
length pi, and a transcendental number cannot be built that way. The ancient
puzzle was not hard. It was impossible, and now that was proven.

Not everyone got the memo. In 1897, the Indiana General Assembly took up House
Bill 246, based on the circle-squaring claims of an amateur named Edwin
Goodwin. The bill's tangled wording implied several different and all incorrect
values of pi (readings as far off as 3.2 and even 4). It passed the House
unanimously. It was quietly killed in the Senate only because Clarence Waldo, a
Purdue mathematics professor, happened to be at the statehouse on other
business and coached the senators before the vote. A wrong value of pi came
within a committee of becoming state law.

## The machine age

Everything changes when the human computer is replaced by an electronic one.
The two limits that had always bounded pi, human speed and human error, both
fall away at once.

In 1949 the ENIAC computed 2,037 digits in about 70 hours, the first time a
machine took over the task. Progress from there tracked the machines
themselves. In 1961, Daniel Shanks (no relation to William) and John Wrench
reached 100,265 digits on an IBM 7090, the first six-figure count. In 1973,
Jean Guilloud and Martine Bouyer passed one million digits on a CDC 7600.

Faster hardware was only half the story. The other half was a better formula,
and it came from two sources decades apart. In 1914, working largely alone in
India, Srinivasa Ramanujan published series for pi that gained about 8 correct
digits per term, so strange and so far ahead of their time that it took the
rest of the century to fully understand them. In 1988, David and Gregory
Chudnovsky built on his approach and published the series that underlies every
record since, worth about 14 new digits per term:

$$\frac{1}{\pi} = 12 \sum_{k=0}^{\infty} \frac{(-1)^k (6k)!\,(545140134k + 13591409)}{(3k)!\,(k!)^3\,640320^{3k+3/2}}.$$

In 1995 came a result that felt impossible: the Bailey-Borwein-Plouffe
formula, which extracts any hexadecimal digit of pi without computing the ones
before it.

$$\pi = \sum_{k=0}^{\infty} \frac{1}{16^k}\left(\frac{4}{8k+1} - \frac{2}{8k+4} - \frac{1}{8k+5} - \frac{1}{8k+6}\right).$$

From there the count runs like a scoreboard. Yasumasa Kanada reached 1.24
trillion digits on a Hitachi supercomputer in 2002. In 2009 Fabrice Bellard
computed 2.7 trillion on a single desktop PC, beating supercomputers on cost.
In 2010 Shigeru Kondo and Alexander Yee did 5 trillion at home using Yee's
program y-cruncher, the software that has held every record since. Google's
Emma Haruka Iwao moved the work into the cloud: 31.4 trillion digits in 2019,
announced on Pi Day, then 100 trillion in 2022, the first fifteen-figure
count.

The most recent runs are essentially storage and endurance tests. In 2024,
StorageReview reached 105 trillion digits in March and 202 trillion in June. In
May 2025, Kioxia and Linus Media Group computed 300 trillion digits, verified
as a Guinness World Record. In November 2025, StorageReview and Micron pushed
to 314 trillion digits on a single server over 110 days, which stands as the
record as of mid 2026.

It is worth keeping the scale honest. NASA steers spacecraft across the solar
system with about 15 digits. Roughly 37 digits would size the observable
universe to within the width of a hydrogen atom. Everything past that is sport,
hardware benchmarking, and pure mathematics, which is a perfectly good reason
to keep going.

## Sources

- Petr Beckmann, "A History of Pi," St. Martin's Press, 1971. The standard
  popular history, opinionated and readable.
- Lennart Berggren, Jonathan Borwein, and Peter Borwein, "Pi: A Source Book,"
  3rd edition, Springer, 2004. Reprints the original papers, from the Rhind
  papyrus through the Chudnovsky and BBP work.
- The MacTutor History of Mathematics Archive, University of St Andrews:
  https://mathshistory.st-andrews.ac.uk/ (biographies and the article "A
  history of Pi").
- David H. Bailey, Peter Borwein, and Simon Plouffe, "On the Rapid Computation
  of Various Polylogarithmic Constants," Mathematics of Computation 66 (1997),
  the BBP formula paper.
- Alexander Yee, y-cruncher records and methodology:
  http://www.numberworld.org/y-cruncher/
- Kioxia press release on the 300 trillion digit record, May 2025:
  https://www.kioxia.com/
- StorageReview coverage of the 202 trillion (2024) and 314 trillion (2025)
  records: https://www.storagereview.com/

---

Previous: [What is pi](01-what-is-pi.md) ·
Next: [The formula collection](03-formulas.md) ·
Back to [the atlas](../README.md)
