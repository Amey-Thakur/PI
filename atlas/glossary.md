<!--
  Name: glossary.md
  Purpose: Every term this repository uses, defined in plain language.
  Description: The atlas explains ideas in flow; this page defines them cold,
    one alphabet, no prerequisites. Each entry is one to three sentences and
    points to the chapter that treats it properly. If a term appears anywhere
    in this repository and is not ordinary English, it belongs here.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Glossary

Every technical term used across the atlas, the algorithms, the challenges,
and the site, in one alphabet. Entries are deliberately short; the linked
chapters carry the full story.

## A

**AGM (arithmetic-geometric mean).** Take two numbers, replace them with
their average and the square root of their product, repeat. The pair rushes
together at astonishing speed, and the Gauss-Legendre method rides that rush
to double its correct digits every round. See
[How pi gets computed](04-algorithms.md).

**Arctangent.** The inverse of the tangent: arctan x is the angle whose
tangent is x. Since arctan 1 = π/4, any fast way to compute arctangents is a
fast way to compute π. See [The formula collection](03-formulas.md).

## B

**Basel problem.** The 1734 puzzle Euler cracked: the sum
1 + 1/4 + 1/9 + 1/16 + ⋯ equals π²/6. First hard evidence that π lives far
from circles. See [The formula collection](03-formulas.md).

**BBP formula (Bailey-Borwein-Plouffe, 1995).** A series that hands you the
hexadecimal digit of π at any position without computing the digits before
it. The tool record verifications rest on. See
[How pi gets computed](04-algorithms.md).

**Binary splitting.** A way to sum a factorial-heavy series by recursively
halving the range and combining halves, keeping every multiplication between
numbers of similar size. Turns million-digit series summation from hopeless
to routine. See [How pi gets computed](04-algorithms.md).

**Buffon's needle.** Drop a needle on a floor of parallel lines; for a
needle as long as the line spacing, it crosses a line with probability 2/π.
Posed by Buffon in the 1700s, it is the ancestor of every Monte Carlo
method. See [Pi in the physical world](08-pi-in-science.md).

## C

**Chi-square test.** A statistical measure of the gap between observed
counts and the counts a fair process would produce. This repository uses it
to test whether the digits 0 to 9 appear evenly. See
[The digits themselves](05-digits.md).

**Chudnovsky series.** The 1988 formula that gains about 14 digits per term.
Paired with binary splitting, it has produced every computation record of
the modern era, and this repository's own digits. See
[How pi gets computed](04-algorithms.md).

**Circumference.** The distance around a circle. Divide it by the diameter
and π is what you get, for every circle there is. See
[What is pi](01-what-is-pi.md).

**Continued fraction.** A way of writing a number as a whole part plus one
over another whole part plus one over another, and so on. For π the terms
begin [3; 7, 15, 1, 292, ...] with no known pattern. Cutting the fraction
early yields the best possible approximations, including 355/113. See
[What nobody knows](07-open-problems.md).

**Convergent.** What you get by truncating a continued fraction: a fraction
that approximates the number better than any other with a denominator its
size. 22/7 and 355/113 are convergents of π. See
[What nobody knows](07-open-problems.md).

**Convergence.** How quickly an infinite process closes in on its target.
The difference between a series that needs two million terms for six digits
(Leibniz) and one that needs 79 (Nilakantha). See
[How pi gets computed](04-algorithms.md).

## D

**Diameter.** The distance across a circle through its center: twice the
radius, and the denominator in the definition of π.

**Digit extraction.** Computing a digit deep inside a number without
computing its predecessors. Believed impossible until the BBP formula did it
for π in base 16. See [How pi gets computed](04-algorithms.md).

## E

**e.** The base of natural logarithms, 2.71828..., the other celebrity
constant. Joined to π by Euler's identity; whether π + e is irrational is
still unknown. See [What nobody knows](07-open-problems.md).

**Euler's identity.** The equation e^(iπ) + 1 = 0, tying together five
fundamental constants in one line. See
[The formula collection](03-formulas.md).

## F

**Feynman point.** The run of six 9s starting at decimal position 762,
named for a story about Richard Feynman that is charming and unsourced. See
[The digits themselves](05-digits.md).

**Floating point.** How computers usually store real numbers: a fixed
budget of about 16 significant decimal digits. Fine for engineering,
useless for digit hunting, which is why serious π computation uses integer
arithmetic instead.

## G

**Gauss-Legendre algorithm.** The 1976 method (Salamin and Brent,
independently) built on the AGM: each iteration doubles the number of
correct digits. See [How pi gets computed](04-algorithms.md).

## H

**Hexadecimal.** Base 16, written with digits 0 through F. The natural
habitat of the BBP formula, and the base in which π begins 3.243F6A88.
Those digits, read as a color, give this project its blue.

## I

**Irrational number.** A number that is not a ratio of whole numbers, so
its decimal expansion never ends and never repeats. Lambert proved π
irrational in 1761. See [What is pi](01-what-is-pi.md).

**Irrationality measure.** A score for how well a number can be
approximated by fractions. Rational numbers score 1, almost all irrationals
score 2, and π is proved to sit somewhere at or below about 7.03. See
[What nobody knows](07-open-problems.md).

## L

**Leibniz series (Madhava-Leibniz).** π/4 = 1 − 1/3 + 1/5 − 1/7 + ⋯. Found
in Kerala around 1400 and again in Europe in the 1670s: the most famous
formula for π and among the slowest. See
[The formula collection](03-formulas.md).

## M

**Machin-like formula.** Any identity building π/4 from several arctangents
of small fractions, after John Machin's 1706 original. Small arguments make
the series converge fast; these formulas held the record for two centuries.
See [How pi gets computed](04-algorithms.md).

**Method of loci.** The ancient memory technique of placing images along a
familiar route and walking it during recall. The backbone of every large
digit recitation. See [Records](06-records.md).

**Monte Carlo method.** Estimating a quantity by random sampling, as in
throwing darts at a square to measure a circle. Error shrinks like one over
the square root of the sample count: honest, visual, and slow. See
[How pi gets computed](04-algorithms.md).

## N

**Nilakantha series.** π = 3 + 4/(2·3·4) − 4/(4·5·6) + ⋯, from the Kerala
school around 1500. Looks like a cousin of the Leibniz series, converges
enormously faster. See [The formula collection](03-formulas.md).

**Normal number.** A number in whose digits every block of every length
appears with exactly the frequency chance would give it, in every base. Pi
is believed normal; nobody has proved it in any base. See
[What nobody knows](07-open-problems.md).

## P

**Piem.** A poem or sentence whose word lengths spell digits of π: "How I
wish I could calculate pi" gives 3.141592. The craft is called piphilology.
See [Pi in culture](09-culture.md).

**Polygon method.** Trapping a circle between polygons drawn inside and
outside it, then doubling the sides to squeeze the bounds. Archimedes'
invention, and the world's method of choice for eighteen centuries. See
[How pi gets computed](04-algorithms.md).

## R

**Radian.** The natural unit of angle: one radian is the angle whose arc
equals the radius, and a full turn is 2π radians. The reason π floods
trigonometry and physics. See [What is pi](01-what-is-pi.md).

**Ramanujan series.** The 1914 formulas that gain about 8 digits per term,
decades ahead of their time and the direct ancestor of the Chudnovsky
series. See [The formula collection](03-formulas.md).

**Random walk.** A path built from random steps. Mapping digits to
directions turns π into one, and its statistics match true randomness step
for step. See [The digits themselves](05-digits.md).

## S

**Self-locating digit.** A digit string that appears at the decimal
position equal to its own value. A rare and pleasing accident of indexing.
See [The digits themselves](05-digits.md).

**Sexagesimal.** Base 60, the number system of Babylonian mathematics and
the reason al-Kashi's 1424 record was stated in sixtieths. See
[Four thousand years of history](02-history.md).

**Spigot algorithm.** An algorithm that drips digits out one at a time,
in order, using only modest whole-number arithmetic, rather than producing
them all at once at the end. Rabinowitz and Wagon published the classic π
spigot in 1995. See [How pi gets computed](04-algorithms.md).

**Squaring the circle.** The ancient challenge of building a square with a
circle's area using only compass and straightedge. Lindemann's 1882 proof
that π is transcendental showed it can never be done. See
[What is pi](01-what-is-pi.md).

## T

**Tau (τ).** The proposal to give 2π its own symbol, on the argument that
the circle constant should measure a full turn. A lively naming debate; the
mathematics is unchanged either way. See [What is pi](01-what-is-pi.md).

**Transcendental number.** A number that is not the root of any polynomial
with whole-number coefficients: beyond algebra's reach entirely. Lindemann
proved π transcendental in 1882. See [What is pi](01-what-is-pi.md).

## Y

**y-cruncher.** Alexander Yee's constant-computing program, the instrument
behind every π record since 2010. Computing π at scale doubles as one of
the harshest stress tests a storage system can face. See
[Records](06-records.md).

## Z

**Zeta function.** The function ζ(s) = 1 + 1/2^s + 1/3^s + ⋯ that connects
whole numbers, primes, and π: ζ(2) = π²/6 is the Basel problem in modern
dress. See [The formula collection](03-formulas.md).

Back to [the atlas](README.md) · [Repository home](../README.md)
