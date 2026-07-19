<!--
  Name: 04-algorithms.md
  Purpose: Explain the families of algorithms that turn the definition of pi into digits.
  Description: The engineering chapter of the atlas. For each method family it
    gives the plain idea, the convergence rate, the cost in time and memory,
    and the era it won records. Ends with how records are verified and how this
    repository produced and checked its own million digits.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# How pi gets computed

This chapter is about method, not history: how you actually turn a definition
of pi into digits, and why some ways win. Each family gets the same four
questions. What is the idea in plain words? How fast does it close in, its
convergence? What does it cost in time and memory? And when did it hold the
record? We finish with how records are checked, a table you can scan, and how
this repository made and verified its own million digits.

## Polygon doubling: trapping the circle

Archimedes (around 250 BCE) had no series and no decimals. He had geometry.
Draw a regular polygon inside a circle and another outside it. The circle's
circumference is longer than the inner perimeter and shorter than the outer
one, so pi is trapped between two numbers you can compute. Double the number of
sides and the trap tightens. Starting from a hexagon and doubling four times to
a 96-gon, he proved $\frac{223}{71} < \pi < \frac{22}{7}$, that is
$3.1408 < \pi < 3.1429$. Good to two decimals, by hand, with square roots done
in fractions.

The engine is a pair of means. If $a_n$ and $b_n$ are the outer and inner
perimeters of a $2^n$-gon, then $a_{n+1}$ is their harmonic mean and $b_{n+1}$
is the geometric mean of $a_{n+1}$ and $b_n$. Each doubling costs one square
root.

Convergence is slow and steady. The error shrinks like $1/N^2$ in the number of
sides $N$, so doubling the sides divides the error by four, worth about
$\log_{10} 4 \approx 0.6$ decimal digits per doubling. That is the "linear-ish"
gain: a fixed sliver of a digit every step. Ludolph van Ceulen spent much of his
life on it and reached 35 decimals by 1610 using a polygon with $2^{62}$ sides.
The digits were carved on his tombstone, and in Germany pi was long called the
Ludolphine number. Polygons held the record for roughly eighteen centuries, then
lost it the moment calculus arrived.

Implementation: [Python](../algorithms/python/archimedes.py)

## Arctangent series and the Machin identities

Calculus gave pi as an infinite sum. The Gregory-Leibniz series,
$\arctan x = x - \frac{x^3}{3} + \frac{x^5}{5} - \cdots$, equals $\frac{\pi}{4}$
at $x = 1$. Beautiful, and useless for computing: at $x = 1$ each term barely
shrinks, and you need about $10^d$ terms for $d$ digits.

John Machin's fix in 1706 was to feed arctangent small arguments instead, where
the powers of $x$ collapse fast:

$$\frac{\pi}{4} = 4\arctan\frac{1}{5} - \arctan\frac{1}{239}$$

Now every term of $\arctan\frac{1}{5}$ is about 25 times smaller than the last,
adding roughly 1.4 digits per term, and $\arctan\frac{1}{239}$ adds about 4.7.
Convergence is still linear, a fixed number of digits per term, but the constant
is friendly and the arithmetic is plain. Machin computed 100 digits. Dozens of
similar "Machin-like" identities followed, and this family was the workhorse for
more than 250 years. William Shanks ground out 707 digits by hand in 1873
(correct to 527, an error found only in 1946). ENIAC produced 2037 digits in
1949 in about seventy hours, and Shanks and Wrench passed 100,000 digits on an
IBM 7090 in 1961. It stayed the standard until the fast methods of the 1970s.

Implementations: [Python](../algorithms/python/machin.py) ·
[JavaScript](../algorithms/javascript/machin.js)

## Spigot algorithms: digits on tap

A spigot algorithm drips digits out one at a time, in order, using only small
integer arithmetic and no big-number library at all. Rabinowitz and Wagon
published the classic in 1995. It rewrites pi in a mixed-radix form coming from
the series $\pi = 2 + \frac{1}{3}\left(2 + \frac{2}{5}\left(2 + \frac{3}{7}(2 +
\cdots)\right)\right)$, then walks an array of small integers, doing carries,
and lets one decimal digit fall out per pass.

The charm is conceptual, not competitive. Memory is bounded and modest, about
$10d/3$ small entries for $d$ digits, and the whole thing fits in a dozen lines.
The cost is $O(d^2)$, so it never threatened a record. The 1995 version needs
its length fixed in advance; Jeremy Gibbons gave a truly streaming, unbounded
version in 2006 that emits digits forever without knowing when you will stop.
Spigots are how you show a student that digits of pi can be computed with
nothing but integers.

Implementations: [Python](../algorithms/python/spigot.py) ·
[JavaScript](../algorithms/javascript/spigot.js) ·
[Rust](../algorithms/rust/spigot.rs)

## BBP: any hex digit, out of nowhere

In 1995 Bailey, Borwein, and Plouffe found something that felt impossible:

$$\pi = \sum_{k=0}^{\infty} \frac{1}{16^k}\left(\frac{4}{8k+1} -
\frac{2}{8k+4} - \frac{1}{8k+5} - \frac{1}{8k+6}\right)$$

Because the whole thing is scaled by powers of $16$, you can compute the
$n$-th hexadecimal digit of pi without computing any digit before it. To reach
digit $n$, multiply by $16^n$ and keep the fractional part. Each $16^n$ divided
by a small denominator like $8k+1$ becomes a modular exponentiation, which is
cheap, and the tail of the sum shrinks so fast you only add a handful of terms.
The result: a single far-out digit for about $O(n)$ simple operations and only
a few registers of memory.

Base 16 is the point, not a detail. The powers of 16 are what make the modular
arithmetic close cleanly, and no base-10 formula of this kind is known for pi.
BBP does not compute all the digits faster than anyone else; extracting every
digit this way would be $O(d^2)$. Its gift is random access. Bellard found a
variant in 1997 that is roughly 40 percent faster, and Percival's distributed
PiHex project reached the quadrillionth bit in 2000.

Implementation: [Python](../algorithms/python/bbp.py)

## Monte Carlo and Buffon: lovely and hopeless

Some methods estimate pi by chance. Throw random darts at a unit square and
count the fraction landing inside the inscribed quarter circle; that fraction
approaches $\frac{\pi}{4}$. Older still is Buffon's needle (1777): drop a needle
of length $L$ on a floor ruled with lines spaced $d \ge L$ apart, and the chance
it crosses a line is

$$P = \frac{2L}{\pi d}$$

so counting crossings estimates pi. You can do it with a real needle on a real
floor, which is exactly why people love it.

And it is hopeless for precision. The error of any such method shrinks like
$1/\sqrt{n}$ in the number of trials, the plain statement of the central limit
theorem. To buy one more correct decimal, ten times the accuracy, you need one
hundred times the trials. A billion needle drops earns you about four or five
digits and then stalls. Lazzarini claimed 3.1415929 from 3408 tosses in 1901,
which almost certainly means he stopped the instant the count looked good. These
methods teach probability beautifully and have never come within light-years of
a record.

Implementations (Monte Carlo): [Python](../algorithms/python/monte_carlo.py) ·
[JavaScript](../algorithms/javascript/monte_carlo.js) ·
[Rust](../algorithms/rust/monte_carlo.rs)

Implementation (Buffon): [Python](../algorithms/python/buffon.py)

## Gauss-Legendre: digits that double

The first genuinely modern jump came in 1976, when Salamin and Brent
independently turned the arithmetic-geometric mean into a pi algorithm. Start
with $a_0 = 1$, $b_0 = \frac{1}{\sqrt 2}$, $t_0 = \frac14$, $p_0 = 1$, and
iterate:

$$a_{n+1} = \frac{a_n + b_n}{2}, \qquad b_{n+1} = \sqrt{a_n b_n}, \qquad
t_{n+1} = t_n - p_n\,(a_n - a_{n+1})^2, \qquad p_{n+1} = 2 p_n$$

Then $\pi \approx \frac{(a_{n+1} + b_{n+1})^2}{4\,t_{n+1}}$.

The arithmetic and geometric means rush toward each other quadratically, so the
number of correct digits doubles at every step. About 20 iterations reach a
million digits; about 34 reach ten billion. Each iteration costs a full-precision
square root and a few multiplications, so with fast multiplication the total is
$O(M(d)\log d)$. This is the method that carried the record through the 1980s,
in the hands of Tamura, Kanada, and Bailey. Its one weakness is that every
single iteration touches the entire number and pays for a fresh square root.

Implementation: [Python](../algorithms/python/gauss_legendre.py)

## Ramanujan, Chudnovsky, and binary splitting

Ramanujan, around 1914, wrote down series for $\frac{1}{\pi}$ that converge with
startling speed, adding about 8 correct digits per term. Gosper used one to pass
17 million digits in 1985. Then the Chudnovsky brothers sharpened the idea into
the formula that has held every record since 2009:

$$\frac{1}{\pi} = 12 \sum_{k=0}^{\infty} \frac{(-1)^k\,(6k)!\,
(545140134\,k + 13591409)}{(3k)!\,(k!)^3\,640320^{\,3k + 3/2}}$$

Every term contributes about 14.18 decimal digits. The terms are ratios of
enormous integers, though, and adding them left to right would force a
full-precision division per term and mix tiny numbers with huge ones, the worst
case for fast multiplication. The cost would balloon to about $O(d^2)$.

Binary splitting is the trick that saves it, and it is why every record run uses
it. A finite stretch of the series can be written as a single fraction
$T/Q$ with a helper product $P$. Instead of summing term by term, you split the
range in half, compute $(P, Q, T)$ for each half, and combine the two with a
few multiplications. Recurse. Every multiplication now happens between numbers
of similar size, which is exactly where Karatsuba, Toom-Cook, and FFT-based
multiplication are fastest, and only one big division and one big square root
happen at the very end. The whole sum drops to roughly $O(M(d)\log d)$, the same
class as Gauss-Legendre, but with a smaller constant, tidy memory access, clean
checkpoints, and easy parallelism across the split tree. That combination, not
the raw complexity, is why Chudnovsky with binary splitting wins in practice.
The record stood at 314 trillion digits as of mid 2026 (see
[Records](06-records.md)).

Implementations (Chudnovsky): [Python](../algorithms/python/chudnovsky.py) ·
[JavaScript](../algorithms/javascript/chudnovsky.js)

Implementation (Ramanujan): [Python](../algorithms/python/ramanujan.py)

## How records are verified

A trillion-digit number cannot be proofread by eye, so record computations lean
on two independent checks. The first is recomputation: run a second, unrelated
algorithm and demand that all digits agree. Chudnovsky against Gauss-Legendre is
the classic pairing, because they share no constants and no arithmetic. Two
different methods agreeing on a billion digits is overwhelming evidence that both
are right.

The second is a BBP spot check. Because a BBP-type formula can extract a
hexadecimal digit far out in the expansion, on its own, in bounded memory, you
independently compute a digit near the very end of the record and confirm it
matches. It is cheap, it uses none of the machinery that produced the record, and
it catches corruption in the final digits without redoing the whole run. Modern
record software runs both checks as a matter of course.

## How this repository made its digits

The two families above are the two this repository actually uses, one to compute
and one to check.

[`scripts/generate_digits.py`](../scripts/generate_digits.py) is Chudnovsky with
binary splitting on plain Python integers. Its `split(a, b)` function is the
recursion described above: it halves the term range and combines the halves so
every multiplication stays balanced. It computes one master result of
1,000,010 digits, ten guard digits past the largest file so that truncation in
the final division can never reach a published digit, then slices that single
result into the 1,000, 10,000, 100,000, and 1,000,000 digit files. One
computation feeds every file, so the datasets cannot disagree with each other.

[`scripts/verify_digits.py`](../scripts/verify_digits.py) recomputes pi from
scratch with the Gauss-Legendre iteration on Python's `decimal` module, about 20
passes for a million digits. Nothing is shared with the generator: different
formula, different arithmetic engine (big integers versus decimal floats). It
first checks the reference against a 50-digit prefix printed in reference tables
for over a century, which guards against the one bug both methods could share, a
mistake in how files are written rather than how pi is computed. Then it compares
every file digit by digit and reports the first divergence if any. Digits are
published only when both computations agree completely. That is the record
verification standard, shrunk to fit a repository.

You can see the results for yourself in
[`data/pi-1000000.txt`](../data/pi-1000000.txt). The Feynman point, six 9s in a
row, begins at decimal place 762, and the 1,000,000th decimal digit is 1. Both
were confirmed against that file.

## Summary table

| Family | Year | Convergence | Digits per unit work | Best use |
|---|---|---|---|---|
| Polygon doubling | around 250 BCE | linear | about 0.6 digits per side-doubling | teaching, hand computation |
| Arctangent / Machin | 1706 | linear | a few digits per term | the workhorse to the 1970s |
| Spigot | 1995 | exact, one digit at a time | one digit per pass, $O(d^2)$ total | tiny code, no big-number library |
| BBP | 1995 | exact, single digit | one far hex digit for about $O(n)$ | random access, verification |
| Monte Carlo / Buffon | 1777 | statistical, $1/\sqrt{n}$ | one digit per 100x more trials | probability demos, never records |
| Gauss-Legendre (AGM) | 1976 | quadratic | digits double each iteration | records through the 1980s |
| Chudnovsky + binary splitting | 1988 | linear series, near-optimal total | about 14.18 digits per term | every record since 2009 |

## Sources

- Jorg Arndt and Christoph Haenel, *Pi Unleashed*, 2nd edition, Springer, 2001.
- Jonathan Borwein and Peter Borwein, *Pi and the AGM*, Wiley, 1987.
- Eugene Salamin, "Computation of pi Using Arithmetic-Geometric Mean,"
  *Mathematics of Computation* 30 (1976), 565 to 570.
- Richard Brent, "Fast Multiple-Precision Evaluation of Elementary Functions,"
  *Journal of the ACM* 23 (1976), 242 to 251.
- Stanley Rabinowitz and Stan Wagon, "A Spigot Algorithm for the Digits of Pi,"
  *American Mathematical Monthly* 102 (1995), 195 to 203.
- Jeremy Gibbons, "Unbounded Spigot Algorithms for the Digits of Pi,"
  *American Mathematical Monthly* 113 (2006), 318 to 328.
- David Bailey, Peter Borwein, and Simon Plouffe, "On the Rapid Computation of
  Various Polylogarithmic Constants," *Mathematics of Computation* 66 (1997),
  903 to 913.
- David Chudnovsky and Gregory Chudnovsky, "Approximations and Complex
  Multiplication According to Ramanujan," in *Ramanujan Revisited*, Academic
  Press, 1988.
- Xavier Gourdon and Pascal Sebah, "Numbers, Constants and Computation,"
  http://numbers.computation.free.fr/Constants/constants.html
- Alexander Yee, y-cruncher documentation and verification notes,
  http://www.numberworld.org/y-cruncher/

---

[Previous: The formula collection](03-formulas.md) ·
[Next: The digits themselves](05-digits.md) ·
[Repository home](../README.md)
