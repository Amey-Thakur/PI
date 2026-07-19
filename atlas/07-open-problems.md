<!--
  Name: 07-open-problems.md
  Purpose: The honest ledger of what is still unproven about pi.
  Description: Separates what is known from what is only believed: normality,
    the irrationality measure, the arithmetic of pi with e, the continued
    fraction, and the Bailey-Crandall bridge from digit extraction to
    randomness. Every bound is dated and cited; nothing is dressed up as
    settled that is not. The digit census is checked against this repo's data.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# What nobody knows

Almost everything you can measure about pi behaves exactly as a random number
should. Almost nothing about that has been proved. This chapter is the open
ledger: the questions that have resisted every attack, stated precisely enough
that you can see the gap between what the digits do and what we can show they
must do. You will get the real bounds, dated, and a clear line between "known"
and "believed." The short version is that pi looks perfectly random and nobody
can prove it is not hiding a pattern.

## Are the digits random?

Line up the decimal digits of pi and count them. In the first million
decimals, each of the ten digits appears close to 100,000 times: the counts run
from 99,548 (for 6) to 100,359 (for 5), and a chi-square test gives 5.509,
comfortably under the 16.919 threshold for chance at the 95 percent level. (You
can recount them yourself from `../data/pi-1000000.txt`; the tally lives in
`../data/digit-frequency.json`.) Push the count to trillions of digits and the
picture does not change. The digits pass every statistical test anyone has
thrown at them.

That is evidence, not proof. The property we want is called **normality**, and
it comes in grades.

- **Simple normality** in base 10 means each digit 0 through 9 appears with
  limiting frequency exactly $1/10$.
- **Normality** in base 10 is stronger: every block of $k$ digits appears with
  frequency $1/10^k$. So "14" shows up a hundredth of the time, "159" a
  thousandth, and so on, for every block length at once.
- **Absolute normality** means normal in every base $b \ge 2$ simultaneously.

Here is the honest state of things. Emile Borel proved in 1909 that *almost
every* real number is absolutely normal: the exceptions form a set of measure
zero. Pi is expected to sit with the overwhelming majority. But for pi
specifically, in base 10 or base 2 or any base at all, **normality has never
been proved**. Neither has simple normality. We cannot even prove the weakest
possible version of the claim: that every digit appears infinitely often in
base 10. As far as anyone has shown, the digit 7 could stop appearing after
some unthinkably distant position, and no theorem rules it out.

The same blank sits under every other famous constant. Pi, $e$, $\sqrt{2}$, and
$\ln 2$ are all believed normal and none is proved normal in any base. A proof
for pi would not just settle pi. It would be the first time anyone pinned down
the digit statistics of a naturally occurring constant, and the method would
almost certainly reach much further.

## How close can a fraction get?

Pi is irrational, so no fraction equals it. But some fractions come startlingly
close for their size: $355/113$ matches pi to six decimals. The question is how
close a fraction can get relative to how large its denominator is, and the
answer is captured by one number, the **irrationality measure** $\mu(\pi)$.

Formally, $\mu(x)$ is the smallest exponent $\mu$ such that

$$\left| x - \frac{p}{q} \right| < \frac{1}{q^{\mu}}$$

has only finitely many rational solutions $p/q$. A larger measure means better
rational approximations exist, so the number is "closer to being a fraction."
For every irrational algebraic number the measure is exactly 2 (Klaus Roth
proved this in 1955, and it won him a Fields Medal), and almost every real
number has measure 2 as well. Liouville numbers, built to be approximable, sit
at the other extreme with measure infinity.

Pi is believed to have measure 2, like a typical number. Nobody has proved it.
What has been proved is a shrinking ceiling:

- Kurt Mahler (1953) gave the first explicit bound.
- Masayoshi Hata (1993) brought it down to about 8.02.
- Vladimir Salikhov (2008) proved $\mu(\pi) \le 7.606308\ldots$, roughly 7.61.
- Doron Zeilberger and Wadim Zudilin (2020) sharpened Salikhov's own integral
  to prove $\mu(\pi) \le 7.103205334137\ldots$, about 7.10.

As of mid 2026 the Zeilberger-Zudilin bound of about 7.10 is the best known.
The conjecture says the true value is 2. Between 2 and 7.10 lies open country:
we can prove pi is not *too* well approximated by fractions, but the gap
between the proven ceiling and the conjectured floor is enormous, and closing
it would take a genuinely new idea.

## Pi and e in the same sentence

Two constants dominate mathematics, pi and $e$, and the moment you combine them
the ground gives way. Consider these four numbers:

$$\pi + e, \qquad \pi \cdot e, \qquad \pi / e, \qquad \pi^{e}.$$

Not one of them is known to be irrational. It is entirely possible, as far as
proof goes, that $\pi + e$ is a tidy fraction, though no mathematician believes
it. This is a good measure of how young this subject is: we cannot rule out the
simplest possible surprise.

One thing *can* be said. At least one of $\pi + e$ and $\pi \cdot e$ must be
transcendental. The argument is short and worth seeing. Suppose both were
algebraic. Then pi and $e$ would be the two roots of

$$t^2 - (\pi + e)\,t + (\pi \cdot e) = 0,$$

a quadratic whose coefficients are algebraic. Roots of such a polynomial are
themselves algebraic, so pi and $e$ would both be algebraic. But both are known
to be transcendental. The contradiction means the sum and the product cannot
both be algebraic, so at least one is transcendental. We just cannot say which.

Contrast that with $e^{\pi}$, which sits on the *known* side of the line.
Aleksandr Gelfond proved it transcendental in 1929, and it also falls out of the
Gelfond-Schneider theorem that he and Theodor Schneider completed in 1934. The
trick is to read $e^{\pi}$ as $(-1)^{-i}$ using $e^{i\pi} = -1$, then apply that
theorem, which says $a^{b}$ is transcendental whenever $a$ is algebraic (not 0
or 1) and $b$ is algebraic and irrational. So $e^{\pi} \approx 23.1407$ is provably
transcendental, while its near-twin $\pi^{e}$ is a total mystery. The line
between known and unknown here is thin and strange.

## The continued fraction, and its one loud term

Write pi not in decimals but as a continued fraction, a staircase of divisions:

$$\pi = 3 + \cfrac{1}{7 + \cfrac{1}{15 + \cfrac{1}{1 + \cfrac{1}{292 + \cdots}}}}$$

The list of whole numbers on the staircase is

$$[3;\ 7,\ 15,\ 1,\ 292,\ 1,\ 1,\ 1,\ 2,\ 1,\ 3,\ 1,\ 14,\ 2,\ 1,\ \ldots].$$

Two things stand out. First, there is no pattern. The decimal digits of pi have
no known pattern, and the continued fraction has none either. (Compare $e$,
whose continued fraction marches in a clean rhythm $[2; 1, 2, 1, 1, 4, 1, 1, 6,
\ldots]$. Pi gets no such gift.) Second, that **292** arrives early and it is
large. A large term means the fraction you get by stopping just before it is
unusually accurate. Stop before the 292 and you get exactly $355/113$, which is
why that little fraction nails pi to six places. The accuracy is not luck; it is
the 292 showing its hand.

The open question is about the size of those terms in the long run. For almost
every real number the terms are unbounded and follow a precise statistical law
(the Gauss-Kuzmin distribution), and pi is expected to behave like a typical
number in every respect. But whether the terms of pi's continued fraction are
**bounded or unbounded is unknown**. Nobody has proved they grow without limit,
and nobody has proved they stay under a ceiling. Billions of computed terms
look exactly like the random model predicts, which is, once again, evidence and
not proof.

## The bridge from digit extraction to randomness

For decades normality looked untouchable, with no line of attack at all. Then
in 2001 David Bailey and Richard Crandall found a bridge from a computational
trick to the deep question, and it runs through chaos.

The trick is the Bailey-Borwein-Plouffe (BBP) formula from 1995, which extracts
a single hexadecimal digit of pi far out in the expansion without computing any
of the digits before it. Bailey and Crandall noticed that the same formula
defines a simple dynamical system: a map on the interval $[0, 1)$ that doubles
and shifts and folds a starting point over and over, the way a chaotic system
stretches and folds its state.

Their result ties the two together. They showed that pi is normal in base 16
(and so in base 2) **if** the sequence of points produced by this specific map
is equidistributed, spread evenly across the interval with no clustering. That
"if" is itself an unproven conjecture, which they called Hypothesis A. So the
problem did not vanish. It moved. Instead of asking whether pi's digits are
random, we can now ask whether a certain chaotic orbit fills the interval
evenly, and the two questions are the same question. That is not a proof of
normality. It is the first real handle anyone has found on it, and it reframes a
statement about digits as a statement about a dynamical system, where more tools
exist.

## The story of the century

Keep the stakes straight. Because pi is proved irrational, its digits provably
never fall into a repeating cycle, so a periodic pattern is not merely unseen,
it is impossible. Normality is different. Nothing forbids pi from being
non-normal; we simply expect it is not, and cannot prove it either way.

So imagine a verified deviation from randomness: a rigorous proof that some
digit appears less than a tenth of the time in the limit, or that some block
never appears past a certain point, or that the continued fraction terms stay
bounded after all. Any one of these would overturn the universal expectation
that pi behaves like a random number, and it would do so for the most examined
constant in mathematics. It would be the mathematical story of the century, and
it would rewrite what we think we understand about where digits come from.

The far more likely outcome is the opposite: that someone finally proves pi is
normal, and the digits turn out to be exactly as featureless as they look. Until
then the ledger stays open. Pi keeps passing every test and refusing every
proof, which is precisely why it stays interesting.

## Sources

- Emile Borel, "Les probabilites denombrables et leurs applications
  arithmetiques," Rendiconti del Circolo Matematico di Palermo 27 (1909). The
  origin of normality and the theorem that almost every real number is normal.
- David H. Bailey and Richard E. Crandall, "On the Random Character of
  Fundamental Constant Expansions," Experimental Mathematics 10 (2001), 175-190.
  The link between the BBP formula, chaotic maps, and normality (Hypothesis A).
- Vladimir Kh. Salikhov, "On the irrationality measure of pi," Russian
  Mathematical Surveys 63 (2008), 570-572. The 7.606308 bound.
- Doron Zeilberger and Wadim Zudilin, "The irrationality measure of pi is at
  most 7.103205334137...," Moscow Journal of Combinatorics and Number Theory 9
  (2020), 407-419. Preprint arXiv:1912.06345. The current best bound.
- Klaus F. Roth, "Rational approximations to algebraic numbers," Mathematika 2
  (1955), 1-20. Algebraic irrationals have irrationality measure 2.
- Steven R. Finch, "Mathematical Constants," Cambridge University Press, 2003.
  Careful survey of what is known and unknown about pi, e, and their combinations.
- Jonathan Borwein and Peter Borwein, "Pi and the AGM," Wiley, 1987. Continued
  fractions, transcendence, and the analytic background.
- Eric W. Weisstein, "Irrationality Measure," MathWorld:
  https://mathworld.wolfram.com/IrrationalityMeasure.html (a running table of
  the known bounds for pi).

---

Previous: [Records](06-records.md) ·
Next: [Pi in the physical world](08-pi-in-science.md) ·
Back to [the atlas](../README.md)
