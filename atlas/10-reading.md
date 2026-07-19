<!--
  Name: 10-reading.md
  Purpose: An annotated guide to the best books, papers, and sites about pi.
  Description: Points the reader at the originals rather than distilling them,
    with one or two honest sentences per entry about who it is really for.
    Books, then the papers that matter, then trustworthy online places, then a
    turn back into this repository to compute pi by hand.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Further reading

Every other chapter of this atlas is a distillation. This one points you at the originals. Below is a short, honest guide to the best books, papers, and sites about pi, each with a line or two about who it is actually for, because the right book for a curious teenager is the wrong one for someone who wants to read Ramanujan's series in the primary source. Start wherever your appetite is, and when you are done reading, the last section sends you back into this repository to compute pi with your own hands.

## Books

**Petr Beckmann, "A History of Pi" (1971).** The opinionated classic. Beckmann tells the story of pi as a running fight between curious minds and the forces that held them back (superstition, war, bureaucracy), and he is not shy about taking sides. Read it for the narrative and the personalities, not as a neutral reference: the mathematics is light and the politics are loud, but few books about a number are this much fun.

**David Blatner, "The Joy of Pi" (1997).** Short, illustrated, and full of trivia and margin notes. This is the book to hand a curious teenager, or a friend who liked the idea of pi but bounced off the equations. It is not deep and does not pretend to be.

**Jorg Arndt and Christoph Haenel, "Pi Unleashed" (2nd edition, 2001).** The algorithmic deep end, with working code. If you want the actual series, the convergence rates, and the binary splitting that record computations lean on, this one book carries it all in a single volume. It assumes you are comfortable reading both mathematics and programs.

**Berggren, Borwein, and Borwein, "Pi: A Source Book" (3rd edition, 2004).** The primary documents themselves. Archimedes, Newton, Ramanujan, and the modern record papers, reprinted in full, including several of the papers listed below. For when you are tired of summaries and want to read the sources. Heavy and expensive, and exactly right for a serious reader.

**Pierre Eymard and Jean-Pierre Lafon, "The Number Pi" (English translation, 2004).** The middle path: a genuine mathematical treatment that still explains itself. If you have first-year university mathematics and want proofs rather than hand-waving (irrationality, the analytic identities, the fast algorithms), start here.

## The papers that matter

You do not need all of these, but each one is a turning point, and most are short enough to read in an afternoon. Where a paper connects to earlier chapters, the link is noted.

**Bailey, Borwein, and Plouffe (1997), "On the Rapid Computation of Various Polylogarithmic Constants."** The BBP formula, which extracts a hexadecimal digit of pi without computing any of the digits before it. Surprising, brief, and readable if you know a little calculus. See [The digits themselves](05-digits.md) for what it does.

**Salamin (1976) and Brent (1976).** Two authors, the same year, the same idea reached independently: use the arithmetic-geometric mean to roughly double the number of correct digits at every step. Together they turned pi computation from a linear grind into a quadratic sprint. Read them next to [How pi gets computed](04-algorithms.md).

**Chudnovsky and Chudnovsky (1989), "The Computation of Classical Constants."** The series behind every world record since 2009, with each term buying about 14 fresh digits. Dense and Ramanujan-flavored, but the payoff formula is quoted everywhere for good reason.

**Bailey and Crandall (2001), "On the Random Character of Fundamental Constant Expansions."** Builds a bridge from the BBP formula to the question of whether pi is normal, reducing a statement about randomness to a concrete conjecture about a simple dynamical map. This is the honest state of the normality question, the territory of [What nobody knows](07-open-problems.md).

**Rabinowitz and Wagon (1995), "A Spigot Algorithm for the Digits of Pi."** A method that drips out the digits of pi one at a time using only integer arithmetic, with no giant final division. Charming, teachable, and the basis for those famous few-line programs. This repository has a runnable spigot in [`algorithms/`](../algorithms/README.md).

## Online places worth trusting

**y-cruncher, by Alexander Yee (numberworld.org).** The program behind essentially every pi record for well over a decade, free to download and run yourself. The site documents each record computation in full: the hardware, the wall-clock time, and the verification. As of mid 2026 this is where new records are announced.

**MacTutor History of Mathematics (mathshistory.st-andrews.ac.uk).** The St Andrews archive keeps a careful chronology of pi and biographies of nearly everyone named in [Four thousand years of history](02-history.md). Well sourced, free, and a good first stop when you want to check a historical claim.

**OEIS A000796 (oeis.org/A000796).** The Online Encyclopedia of Integer Sequences entry for the decimal digits of pi, with references, expansions in other bases, and links to related sequences. The canonical machine-readable home of the digits.

**3Blue1Brown (Grant Sanderson).** Two videos in particular earn their reputation: the colliding blocks that tap out the digits of pi one collision at a time, and the geometric answer to the Basel problem that shows why pi turns up in the sum of reciprocal squares. This is the best visual intuition anywhere for why pi appears where no circle is in sight.

**Numberphile.** A long playlist of pi videos featuring working mathematicians, ranging from light history to real depth. Good company for a wandering evening.

**Matt Parker (Stand-up Maths).** His annual Pi Day videos compute pi by deliberately absurd physical means (throwing darts, colliding objects, weighing shapes), and they are honest about the error bars. Funny, and quietly a fine lesson in Monte Carlo estimation.

## From reading to doing

Everything above is someone else's account of pi. The fastest way to understand the number is to compute it yourself, and this repository is built for exactly that.

[`algorithms/`](../algorithms/README.md) holds twenty two runnable implementations, from Archimedes' polygons to the Chudnovsky series above, one algorithm per file and each finishing in seconds. [`challenges/`](../challenges/README.md) turns the same material into twenty five graded problems, from memorizing ten digits to computing a million and verifying them against this repository's own data. Read a paper here, then open the matching file there and watch it run. That loop, read then run, is the whole point of this project.

## Sources

Books:

- Petr Beckmann, *A History of Pi*, Golem Press, 1971.
- David Blatner, *The Joy of Pi*, Walker and Company, 1997.
- Jorg Arndt and Christoph Haenel, *Pi Unleashed*, 2nd edition, Springer, 2001.
- Lennart Berggren, Jonathan Borwein, and Peter Borwein, *Pi: A Source Book*, 3rd edition, Springer, 2004.
- Pierre Eymard and Jean-Pierre Lafon, *The Number Pi*, American Mathematical Society, 2004.

Papers:

- David H. Bailey, Peter B. Borwein, and Simon Plouffe, "On the Rapid Computation of Various Polylogarithmic Constants," *Mathematics of Computation* 66, no. 218 (1997), 903 to 913.
- Eugene Salamin, "Computation of Pi Using Arithmetic-Geometric Mean," *Mathematics of Computation* 30, no. 135 (1976), 565 to 570.
- Richard P. Brent, "Fast Multiple-Precision Evaluation of Elementary Functions," *Journal of the ACM* 23, no. 2 (1976), 242 to 251.
- David V. Chudnovsky and Gregory V. Chudnovsky, "The Computation of Classical Constants," *Proceedings of the National Academy of Sciences* 86, no. 21 (1989), 8178 to 8182.
- David H. Bailey and Richard E. Crandall, "On the Random Character of Fundamental Constant Expansions," *Experimental Mathematics* 10, no. 2 (2001), 175 to 190.
- Stanley Rabinowitz and Stan Wagon, "A Spigot Algorithm for the Digits of Pi," *American Mathematical Monthly* 102, no. 3 (1995), 195 to 203.

Online (all stable as of mid 2026):

- Alexander J. Yee, *y-cruncher: A Multi-Threaded Pi Program*. http://www.numberworld.org/y-cruncher/
- MacTutor History of Mathematics Archive, University of St Andrews, "A history of Pi." https://mathshistory.st-andrews.ac.uk/HistTopics/Pi_through_the_ages/
- OEIS Foundation, sequence A000796, "Decimal expansion of Pi." https://oeis.org/A000796
- 3Blue1Brown (Grant Sanderson), pi videos. https://www.3blue1brown.com/
- Numberphile, pi video playlist. https://www.youtube.com/user/numberphile
- Stand-up Maths (Matt Parker), Pi Day videos. https://www.youtube.com/user/standupmaths

---

Previous: [Pi in culture](09-culture.md) ·
Next: [Atlas index](README.md) ·
[Repository home](../README.md)
