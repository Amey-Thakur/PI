<!--
  Name: 01-what-is-pi.md
  Purpose: The front door of the atlas: what pi is and why it keeps appearing.
  Description: Defines pi from the circle, connects it to area and to radians,
    explains irrational and transcendental in plain language, gives the tau
    debate a fair hearing, and shows pi turning up where no circle is in sight.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# What is pi

Pi is one number, $\pi = 3.1415926535897932384626433832795\ldots$, and it starts life as a simple ratio about circles. By the end of this chapter you will know exactly what that ratio is, why it never changes from one circle to the next, why the same number decides the area of a disk and the meaning of an angle, what it means that pi is irrational and transcendental (and how that killed a 2,000 year old geometry problem), and why pi keeps showing up in places that have nothing to do with circles at all.

## The ratio every circle shares

Take any circle. Measure the distance around it, the circumference $C$. Measure the distance straight across through the center, the diameter $d$. Divide one by the other. You always get the same number:

$$\pi = \frac{C}{d}$$

The word "always" is the surprising part, so it is worth seeing why it holds. All circles are the same shape at different sizes. Scale a circle up by a factor of 2 and both its circumference and its diameter double; scale it by any factor $k$ and both grow by $k$. Since the top and bottom of the fraction $C/d$ change by the same factor, the ratio itself does not move. A coin, a dinner plate, and the equator of the Earth all report the identical value. That fixed value is pi.

Because the radius $r$ is half the diameter, the same fact is often written

$$C = 2\pi r$$

which is the form you will meet most often from here on.

## The symbol and the name

The letter is Greek, the first letter of *periphereia*, meaning periphery or circumference. The Welsh mathematician William Jones was the first to use $\pi$ for this ratio, in a textbook in 1706. It was Leonhard Euler, the most influential mathematician of the century, who adopted the symbol from the 1730s onward and made it standard through his widely read works. Before that, writers spelled the ratio out in Latin phrases. The compact symbol we take for granted is barely 300 years old, far younger than the number it names.

## From the edge to the inside

Pi measures the boundary of a circle, but it also measures the region inside. The area of a disk of radius $r$ is

$$A = \pi r^2$$

Here is the intuition in one picture. Slice the disk into many thin wedges, like a pie, then lay the wedges down alternately point up and point down. They interlock into a shape that gets closer and closer to a rectangle as the slices get thinner. The rectangle's height is $r$, and its width is half the circumference, $\pi r$. Multiply height by width and you get $\pi r^2$. The same constant that governs the rim also governs the fill, which is the first hint that pi is more than a fact about string wrapped around a hoop.

## Radians: measuring angles in pi

Degrees are a human invention. Splitting a full turn into 360 parts is a choice inherited from Babylonian astronomy, convenient but arbitrary. Mathematicians prefer a unit the circle defines by itself: the radian.

Walk along the rim of a circle of radius $r$ until the distance you have walked equals $r$. The angle you have swept out is one radian. Since the whole rim has length $2\pi r$, a full turn is exactly $2\pi$ radians, a half turn is $\pi$, and a right angle is $\pi/2$. The arc length $s$ for an angle $\theta$ measured this way is just

$$s = r\,\theta$$

with no conversion factor cluttering the formula. That clean relationship is why calculus, physics, and every serious use of trigonometry measure angles in radians, and it is why pi is stamped onto angles that have no obvious circle attached to them. When you read "the phase is $\pi$" or "rotate by $\pi/3$," pi is doing the work of a protractor.

## Irrational: the digits never settle

A rational number is a ratio of two whole numbers, like $\tfrac{22}{7}$ or $\tfrac{355}{113}$. Rational numbers have decimal expansions that either stop or fall into a repeating block forever. Pi does neither. Its digits run on without end and without any repeating pattern, so no fraction of whole numbers, however large, equals it exactly. The famous $\tfrac{22}{7}$ is a decent approximation and nothing more; it misses in the third decimal place.

This was suspected for centuries and finally proved by Johann Heinrich Lambert in 1761. Lambert showed that if you feed a nonzero rational angle into the tangent function you cannot get a rational answer, and since $\tan(\pi/4) = 1$ is rational, $\pi/4$ (and therefore pi) cannot be. Irrationality settled one question for good: the exact value of pi will never be written down as a finite decimal or a neat fraction. Every printed value, including the million digits in this repository, is a truncation.

## Transcendental: why the compass gave up

Irrational is only half of pi's stubbornness. Some irrational numbers, like $\sqrt{2}$, are still "algebraic": they are solutions of polynomial equations with whole number coefficients ($x^2 - 2 = 0$ in that case). A transcendental number is one that solves no such equation, of any degree, ever. It sits beyond the reach of ordinary algebra.

Ferdinand von Lindemann proved in 1882 that pi is transcendental. That single result ended one of the oldest challenges in mathematics: squaring the circle. The problem, posed by the ancient Greeks, asked for a construction using only an unmarked straightedge and a compass that produces a square with the same area as a given circle. Every length such tools can build is algebraic in a specific way, so building a square of area $\pi r^2$ would require constructing $\sqrt{\pi}$, which would make pi algebraic. Lindemann showed pi is not algebraic. The construction is therefore impossible, not merely hard. After 2,000 years of attempts, the answer turned out to be no, and "squaring the circle" survives today as an idiom for a hopeless task.

## Tau: one fair paragraph

Some people argue we chose the wrong constant. Their case: the circle's defining feature is its radius, not its diameter, and the radius is what shows up in $C = 2\pi r$. So the factor $2\pi$ appears constantly (a full turn, one period of a sine wave, the Gaussian bell), and they propose naming it $\tau = 2\pi \approx 6.283$, which makes a full turn exactly $\tau$ radians and a quarter turn $\tau/4$, arguably easier to teach. The counterargument is that pi is not going anywhere: it is embedded in centuries of literature, and some formulas are actually cleaner with pi (the area $\pi r^2$ among them, and Euler's identity below). Both sides agree on all the mathematics; the disagreement is purely about which constant deserves top billing. It is a genuine and friendly debate about convention, not correctness, and pi has the incumbency.

## Pi with no circle in sight

If pi were only about circles it would be a minor character. What makes it central is how often it appears when no circle is anywhere in the problem. Three examples, stated here and explained in [Pi in the physical world](08-pi-in-science.md):

The Gaussian integral, the total area under the bell curve of statistics:

$$\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}$$

The Basel problem, the sum of the reciprocals of the square numbers, solved by Euler in 1735:

$$\sum_{n=1}^{\infty} \frac{1}{n^2} = 1 + \frac{1}{4} + \frac{1}{9} + \frac{1}{16} + \cdots = \frac{\pi^2}{6}$$

And Euler's identity, which ties together five of the most important numbers in mathematics in a single line:

$$e^{i\pi} + 1 = 0$$

None of these started as a question about circles. Pi arrives anyway, uninvited, which is the strongest sign that it is a deep feature of mathematics rather than a quirk of geometry. Why it shows up in each case is the subject of chapter 08.

## How many digits anyone actually needs

The endless digits are a mathematical fact, not a practical need. For real work, a handful is plenty.

NASA's Jet Propulsion Laboratory, which navigates spacecraft across billions of kilometers, uses pi truncated to 15 decimal places: $3.141592653589793$. At that precision, a calculation spanning the width of the solar system lands correct to a fraction of the size of a molecule. Going further changes almost nothing you could measure.

To make the point vivid: somewhere around 37 to 40 digits of pi is enough to compute the circumference of a circle the size of the entire observable universe and be off by no more than the width of a single hydrogen atom. Every digit past that (and people have now computed trillions of them, see [Records](06-records.md)) is pursued for sport, for testing computer hardware, and for the pure mathematics of the digits themselves, never because an engineer ran short.

## Sources

- Petr Beckmann, *A History of Pi*, St. Martin's Press, 1971. Readable history of the constant and the people who chased it.
- Jorg Arndt and Christoph Haenel, *Pi Unleashed*, 2nd edition, Springer, 2001. Definitions, proofs, and computation in one volume.
- J. H. Lambert, "Memoire sur quelques proprietes remarquables des quantites transcendantes circulaires et logarithmiques," Histoire de l'Academie de Berlin, 1768. The original irrationality proof.
- F. Lindemann, "Uber die Zahl pi," *Mathematische Annalen* 20 (1882), 213 to 225. The transcendence proof that ended circle squaring.
- Marc Rayman, "How Many Decimals of Pi Do We Really Need?", NASA/JPL Edu, 2016. Source of the 15 digit and observable universe figures. https://www.jpl.nasa.gov/edu/news/2016/3/16/how-many-decimals-of-pi-do-we-really-need/
- Bob Palais, "Pi Is Wrong!", *The Mathematical Intelligencer* 23, no. 3 (2001), 7 to 8; and Michael Hartl, *The Tau Manifesto*, https://tauday.com/. The two sides of the tau debate.

---

[Atlas index](README.md) · Next: [Four thousand years of history](02-history.md) · [Repository home](../README.md)
