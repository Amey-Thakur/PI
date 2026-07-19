<!--
  Name: 03-formulas.md
  Purpose: A curated catalog of the important formulas for pi, grouped by idea.
  Description: Ten families of formulas, from circle geometry to Chudnovsky and
    BBP, each with a short story and the exact expression. Formulas that have a
    runnable implementation in this repository link straight to it. Every
    expression here was checked numerically before publishing.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# The formula collection

This is a catalog you can scan. The formulas for &pi; are grouped by the idea
behind them, not by date, so you can see the family resemblances: the series
that trade speed for simplicity, the products built from a single repeated
step, the modern engines that win by doubling their own output. Each group
opens with one paragraph on why its formulas work, then lists the formulas
themselves. Wherever this repository has runnable code for a formula, the line
links straight to it. Nothing below is decorative. Every expression was tested
against a known value of &pi; before it went in.

## The circle and its solids

These are where &pi; comes from. They are not ways to compute &pi;; they are
definitions wearing the clothes of measurement, because each one already has
&pi; standing inside it. A circle of radius $r$ has circumference and area

$$C = 2\pi r = \pi d$$

$$A = \pi r^2$$

and a sphere of radius $r$ has volume and surface area

$$V = \frac{4}{3}\pi r^3 \qquad\qquad A = 4\pi r^2.$$

To turn $A = \pi r^2$ into an actual number you have to compute &pi; some other
way. Squeezing it out of the circle by trapping that area between polygons is
Archimedes' idea, and that story belongs to the [next chapter](04-algorithms.md).

## Infinite series

Here is where &pi; becomes computable from nothing but arithmetic. Add and
divide, forever, and the running total drifts toward &pi;. The catch is speed.
The plainest series are the slowest, and the history of &pi; is largely the
hunt for series that converge before you die of old age.

The Madhava-Leibniz series is the classic, found in Kerala around 1400 and
again by Leibniz in the 1670s ([`leibniz.py`](../algorithms/python/leibniz.py)):

$$\frac{\pi}{4} = 1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \cdots
= \sum_{k=0}^{\infty} \frac{(-1)^k}{2k+1}.$$

It is beautiful and nearly useless for computing. The error after $N$ terms is
about $1/(2N)$, so ten correct digits would need on the order of ten billion
terms.

Nilakantha's series (from the Tantrasangraha, 1501) keeps the alternating idea
but converges far faster, because each denominator is a product of three
consecutive integers ([`nilakantha.py`](../algorithms/python/nilakantha.py)):

$$\pi = 3 + \frac{4}{2\cdot 3\cdot 4} - \frac{4}{4\cdot 5\cdot 6}
+ \frac{4}{6\cdot 7\cdot 8} - \cdots
= 3 + \sum_{k=1}^{\infty} \frac{(-1)^{k+1}\,4}{2k\,(2k+1)(2k+2)}.$$

The Basel problem is the famous one Euler cracked in 1734, connecting &pi; to
the sum of reciprocal squares ([`euler_basel.py`](../algorithms/python/euler_basel.py)):

$$\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}.$$

Its error shrinks like $1/N$, slower even than Leibniz, so nobody computes &pi;
with it. It is here because the identity itself is one of the loveliest facts in
mathematics: square the circle constant, and you get six times a sum over the
whole number line.

## Infinite products

Same goal, different machine. Instead of adding terms you multiply factors, and
each factor nudges a running product toward its limit. Two of these are
landmarks in the history of analysis.

Viete's formula, published in 1593, was the first time anyone wrote &pi; as an
exact infinite process. It is nothing but the half-angle identity applied over
and over, which is why every factor is a nested square root
([`viete.py`](../algorithms/python/viete.py)):

$$\frac{2}{\pi} = \frac{\sqrt{2}}{2}\cdot\frac{\sqrt{2+\sqrt{2}}}{2}
\cdot\frac{\sqrt{2+\sqrt{2+\sqrt{2}}}}{2}\cdots$$

Wallis found his product in 1655 using only ratios of even and odd numbers, no
roots at all ([`wallis.py`](../algorithms/python/wallis.py)):

$$\frac{\pi}{2} = \prod_{n=1}^{\infty} \frac{2n}{2n-1}\cdot\frac{2n}{2n+1}
= \frac{2}{1}\cdot\frac{2}{3}\cdot\frac{4}{3}\cdot\frac{4}{5}
\cdot\frac{6}{5}\cdot\frac{6}{7}\cdots$$

Both converge slowly. Their value is historical and conceptual, not
computational.

## The arctangent family

This family ruled &pi; computation for two hundred years, and the reason is a
single idea about convergence. Start from the Gregory series for the arctangent:

$$\arctan x = x - \frac{x^3}{3} + \frac{x^5}{5} - \frac{x^7}{7} + \cdots
\qquad (|x| \le 1).$$

Set $x = 1$ and you get $\pi/4$, which is just Leibniz again, painfully slow
because $x = 1$ makes every term nearly as big as the last. But term $k$ scales
like $x^{2k+1}$, so a small $x$ makes the terms collapse fast. That is the whole
trick: rewrite $\pi/4$ as a combination of arctangents of small numbers.

Machin did exactly this in 1706
([`machin.py`](../algorithms/python/machin.py)):

$$\frac{\pi}{4} = 4\arctan\frac{1}{5} - \arctan\frac{1}{239}.$$

With $x = 1/5$ each term is about $1/25$ of the one before it, worth roughly 1.4
decimal digits per term. With $x = 1/239$ the terms fall about 4.7 digits at a
time. Formulas of this shape held every record until the 1980s. William Shanks
spent years on one to reach 707 digits in 1873, of which 527 turned out to be
correct.

## Integrals

&pi; also falls out of areas under curves, and two integrals matter most. The
first ties the arctangent family back to geometry, since the area under
$1/(1+x^2)$ from $0$ to $1$ is exactly $\arctan 1$:

$$\int_0^1 \frac{dx}{1+x^2} = \frac{\pi}{4},
\qquad\qquad \int_{-\infty}^{\infty} \frac{dx}{1+x^2} = \pi.$$

The second is the Gaussian integral, the reason &pi; appears in probability and
the bell curve even though no circle is anywhere in sight:

$$\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}.$$

Neither is a practical way to compute digits. They are here because they are two
of the deepest places &pi; shows up unannounced.

## Continued fractions

Write &pi; as a nested stack of fractions and something strange happens. The
simple continued fraction, the one with all numerators equal to $1$, has no
known pattern in its terms:

$$\pi = 3 + \cfrac{1}{7 + \cfrac{1}{15 + \cfrac{1}{1 + \cfrac{1}{292 + \cdots}}}}
\qquad = \; [3;\, 7,\, 15,\, 1,\, 292,\, 1,\, 1,\, 1,\, 2,\, 1,\, \ldots].$$

Nobody has found a rule for that sequence, and it is thought there is none. The
unusually large $292$ is a small gift: stopping just before it gives $355/113$,
which matches &pi; to six decimals and was known in China by the fifth century.

Force the numerators to follow a rule and the pattern comes back. Brouncker
found the first such form in 1655:

$$\frac{4}{\pi} = 1 + \cfrac{1^2}{2 + \cfrac{3^2}{2 + \cfrac{5^2}{2
+ \cfrac{7^2}{2 + \cdots}}}}$$

and a close cousin puts the odd squares over a constant $6$:

$$\pi = 3 + \cfrac{1^2}{6 + \cfrac{3^2}{6 + \cfrac{5^2}{6 + \cdots}}}.$$

These are elegant to look at and slow to use, exactly the opposite of the simple
form, whose terms are unpredictable but whose convergence is superb.

## The heavy artillery

Modern records are set by a small number of extraordinary formulas. They look
forbidding, but the payoff is that every term buys a fixed block of correct
digits, so the work grows almost linearly with the digit count.

Ramanujan published this one in 1914, and each term adds about eight correct
digits ([`ramanujan.py`](../algorithms/python/ramanujan.py)):

$$\frac{1}{\pi} = \frac{2\sqrt{2}}{9801}
\sum_{k=0}^{\infty} \frac{(4k)!\,(1103 + 26390k)}{(k!)^4\,396^{4k}}.$$

The Chudnovsky brothers sharpened the same modular ideas in 1988 into the
formula that holds the record today. Each term is worth just over fourteen
digits ([`chudnovsky.py`](../algorithms/python/chudnovsky.py)):

$$\pi = \frac{426880\,\sqrt{10005}}
{\displaystyle\sum_{k=0}^{\infty}
\frac{(6k)!\,(13591409 + 545140134\,k)}{(3k)!\,(k!)^3\,(-640320)^{3k}}}.$$

As of mid 2026, every world-record computation of &pi; has used the Chudnovsky
series, paired with binary splitting to keep the arithmetic fast.

The Gauss-Legendre iteration, also called Brent-Salamin after its 1975 to 1976
rediscovery, is a different animal. It is not a series but a loop built on the
arithmetic-geometric mean. Start with

$$a_0 = 1, \qquad b_0 = \frac{1}{\sqrt{2}}, \qquad t_0 = \frac{1}{4},
\qquad p_0 = 1,$$

then repeat

$$a_{n+1} = \frac{a_n + b_n}{2}, \quad b_{n+1} = \sqrt{a_n b_n}, \quad
t_{n+1} = t_n - p_n\,(a_n - a_{n+1})^2, \quad p_{n+1} = 2p_n,$$

and read off the estimate

$$\pi \approx \frac{(a_{n+1} + b_{n+1})^2}{4\,t_{n+1}}.$$

This converges quadratically: each pass roughly doubles the number of correct
digits ([`gauss_legendre.py`](../algorithms/python/gauss_legendre.py)). In
practice iteration 3 gives 19 correct digits, iteration 4 gives 41, and
iteration 5 gives 84. A few dozen passes reach into the billions.

## Extracting a single digit: BBP

The last formula does something that sounds impossible. The Bailey-Borwein-Plouffe
formula, found in 1995, lets you compute the $n$th hexadecimal digit of &pi;
directly, without computing any of the digits before it, in modest memory
([`bbp.py`](../algorithms/python/bbp.py)):

$$\pi = \sum_{k=0}^{\infty} \frac{1}{16^k}
\left(\frac{4}{8k+1} - \frac{2}{8k+4} - \frac{1}{8k+5} - \frac{1}{8k+6}\right).$$

The $16^k$ out front is the key. To get the digit at hex position $n$, you
multiply through by $16^n$, and the parts of the sum below the digit you want
collapse under modular exponentiation while the parts above it fall off as a
tail. You never build the whole number. This is how people have checked
quadrillionth-place binary digits of &pi; on ordinary hardware. It works in base
sixteen and base two, not base ten, so it tells you a hex digit far out without
telling you the decimal one.

## Sources

- Lennart Berggren, Jonathan Borwein, and Peter Borwein, "Pi: A Source Book",
  3rd edition, Springer, 2004. Reprints the original papers of Viete, Wallis,
  Machin, Ramanujan, and the Chudnovskys.
- Jonathan Borwein and Peter Borwein, "Pi and the AGM", Wiley, 1987. The
  definitive account of the arithmetic-geometric mean method.
- Jorg Arndt and Christoph Haenel, "Pi Unleashed", 2nd edition, Springer, 2001.
  A modern survey of formulas and algorithms with worked convergence rates.
- Petr Beckmann, "A History of Pi", St. Martin's Press, 1971. The historical
  arc from Archimedes through the arctangent era.
- David H. Bailey, Peter B. Borwein, and Simon Plouffe, "On the Rapid
  Computation of Various Polylogarithmic Constants", Mathematics of Computation
  66 (1997), pages 903 to 913. The BBP formula and digit extraction.
- Eugene Salamin, "Computation of Pi Using Arithmetic-Geometric Mean",
  Mathematics of Computation 30 (1976), pages 565 to 570.
- David V. Chudnovsky and Gregory V. Chudnovsky, "The Computation of Classical
  Constants", Proceedings of the National Academy of Sciences 86 (1989), pages
  8178 to 8182.
- Eric W. Weisstein, "Pi Formulas", MathWorld,
  https://mathworld.wolfram.com/PiFormulas.html
- NIST Digital Library of Mathematical Functions, https://dlmf.nist.gov/ , for
  the arctangent series and the constants in the modern formulas.

---

Previous: [Four thousand years of history](02-history.md) &middot;
Next: [How pi gets computed](04-algorithms.md) &middot;
[Back to the repository home](../README.md)
