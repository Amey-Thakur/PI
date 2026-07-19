<!--
  Name: 08-pi-in-science.md
  Purpose: Why pi appears throughout physics and engineering when no circle is in sight.
  Description: The honest reason is symmetry and Gaussians. Works through the
    normal distribution, Fourier analysis, four physical laws, the JPL rule for
    how many digits steer a spacecraft, and three oddballs where pi hides in
    plain sight. Each formula is followed by one paragraph on why pi is there.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Pi in the physical world

Pi is defined by a circle, yet it turns up in statistics, in radio, in quantum mechanics, and even in the shape of rivers, none of which contains a circle you can point to. This chapter gives the honest reason. Pi shows up whenever a problem hides a rotation or a round symmetry, and it shows up wherever a bell curve is involved, because the bell curve is built out of pi. Below are the actual formulas, and for each one, the single idea that explains why pi had to be there.

## The bell curve is built on pi

The normal distribution, the bell curve behind measurement error, exam scores, and thermal noise, has this formula:

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\; e^{-(x-\mu)^2 / (2\sigma^2)}$$

The $\sqrt{2\pi}$ out front is a normalizing factor. A probability distribution must enclose a total area of exactly 1, and the bare bell shape $e^{-x^2/2}$ does not; you have to divide by its area to fix that. That area is the famous Gaussian integral, and it comes out to a root of pi:

$$\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}$$

The two line trick that produces the pi is worth seeing. Call the integral $I$. Then $I^2$ is a double integral of $e^{-(x^2+y^2)}$ over the whole plane. Switch to polar coordinates, where $x^2+y^2 = r^2$ and the area element $dx\,dy$ becomes $r\,dr\,d\theta$:

$$I^2 = \int_0^{2\pi}\!\!\int_0^{\infty} e^{-r^2}\, r\,dr\,d\theta = 2\pi \cdot \tfrac{1}{2} = \pi, \qquad I = \sqrt{\pi}$$

Why is pi there? Because $e^{-(x^2+y^2)}$ depends only on the distance from the origin, so it is perfectly round. The moment you use that roundness, you sweep the angle $\theta$ through a full turn, and a full turn is $2\pi$. There is no circle in the data. The symmetry of the bell surface is what carries pi into every Gaussian in science.

## Fourier analysis: every signal is a sum of circles

Signal processing rests on one idea: any sound, image, or radio wave can be written as a sum of pure oscillations. The pure oscillation of frequency $f$ is a point going around the unit circle in the complex plane,

$$e^{2\pi i f t} = \cos(2\pi f t) + i\sin(2\pi f t)$$

which completes exactly one full loop each time $t$ advances by one period $1/f$. Fourier analysis breaks a signal into these rotating pieces, one for each frequency, and the Fast Fourier Transform does it quickly enough to run in real time.

Why pi? Because a full cycle is a full turn, and a full turn is $2\pi$ radians. Frequency counts cycles per second, but the exponential needs an angle, and the exchange rate between them is $2\pi$. Every term in every Fourier sum carries that factor. This is not an abstraction you can ignore. Your phone runs the Fast Fourier Transform constantly: decoding LTE and 5G, compressing photos and video, cancelling background noise on calls. Across a day of ordinary use that adds up into the trillions of multiplications, each one carrying a factor of $2\pi$, and not one of them is about a circle you would draw.

## Pi in the laws of physics

Four of the most quoted formulas in physics have a pi sitting in them, and in each case the pi is telling you something honest about the geometry underneath.

**Heisenberg's uncertainty principle.** Position and momentum cannot both be pinned down; their uncertainties obey

$$\Delta x \, \Delta p \ge \frac{\hbar}{2}, \qquad \hbar = \frac{h}{2\pi}$$

The reduced Planck constant $\hbar$ is just Planck's constant $h$ divided by $2\pi$. It exists because quantum waves are described most naturally by angular frequency (radians per second) rather than by cycles per second, and converting Planck's per cycle constant into per radian bookkeeping costs exactly one factor of $2\pi$. The pi here is the same cycles to radians exchange rate from Fourier analysis, wearing a physicist's hat.

**Einstein's field equations.** General relativity ties the curvature of spacetime to the energy and momentum inside it:

$$G_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}$$

**Coulomb's law.** The electric force between two charges falls off with distance as

$$F = \frac{1}{4\pi\varepsilon_0}\frac{q_1 q_2}{r^2}$$

Both of these carry a pi for the same reason. They describe something spreading out from a source into three dimensional space: gravity from mass and energy, electric influence from charge. Field lines leaving a point spread evenly over a sphere, and a sphere of radius $r$ has surface area $4\pi r^2$, so the effect thins out as $1/(4\pi r^2)$. That $4\pi$, the surface area of a unit sphere, is stamped straight into Coulomb's constant. Einstein's $8\pi$ is the same spherical spreading combined with a factor of two from the way curvature responds to energy and momentum. Pi is in these constants because we live in three dimensions and influence radiates over round surfaces.

**The simple pendulum.** For small swings, the period of a pendulum of length $L$ under gravity $g$ is

$$T = 2\pi\sqrt{\frac{L}{g}}$$

A swinging weight traces an arc, not a full circle, so where does pi come from? A small oscillation is uniform circular motion seen edge on. Track a point moving steadily around a circle and watch only its shadow on a wall: the shadow moves back and forth exactly like a pendulum bob or a mass on a spring. One full swing there and back matches one full trip around the hidden circle, and one full trip is $2\pi$ radians. The circle is not in the room, it is in the mathematics of the motion, and $2\pi$ is how long one lap takes.

## Why fifteen decimals steer a spacecraft

Pi's endless digits are a mathematical fact, not an engineering need. The reason is error budgeting. Any real calculation multiplies pi by measured quantities that already carry uncertainty, and a truncation error in pi only matters if it is larger than those. It almost never is.

Marc Rayman of NASA's Jet Propulsion Laboratory made this concrete. Take Voyager 1, then roughly 12.5 billion miles from home, and compute the circumference of a circle that size. Using pi to 15 decimals instead of its true value changes the answer by about half an inch. The spacecraft's own position is uncertain by far more than a hand's width, so the extra digits would steer nothing. Fifteen decimals, $3.141592653589793$, is what JPL uses, and it is already overkill for everything closer to home. To size a circle as big as the observable universe to within the width of a single hydrogen atom takes only about 37 to 40 digits. Every digit past that is pursued for other reasons, never because an engineer ran short. See [Records](06-records.md) for how far past that people have gone.

## Three places pi has no business being

Some appearances of pi are less a law than a delight. Here are three where the circle is so well hidden that finding it is half the fun.

### Buffon's needle

Rule a floor with parallel lines a distance $d$ apart and drop a needle of length $\ell$, with $\ell \le d$. The probability that the needle lands crossing a line is

$$P = \frac{2\ell}{\pi d}$$

which means you can estimate pi by throwing needles and counting crossings:

$$\pi \approx \frac{2\ell \cdot (\text{throws})}{d \cdot (\text{crossings})}$$

Why pi, from random throws with no circle anywhere? Because whether a needle crosses a line depends on the angle it makes with the lines, and to get the probability you average over every possible angle. Averaging over all orientations is an integral over that angle, and integrating over a turn's worth of angle is exactly where pi enters. Georges-Louis Leclerc, Comte de Buffon, posed this in 1777, and the [repository's site](../README.md) runs it live in the Buffon's Needle lab.

### The sinuosity of rivers

A river's sinuosity is its winding channel length divided by the straight line distance between its endpoints. In a 1996 paper in Science, Hans-Henrik Stolum argued from a self-organization model of meandering, erosion cutting into the outside of each bend, silt building up on the inside, loops occasionally pinching off, that the average sinuosity of rivers should hover near pi.

Read this as a model result, not a law of nature. It is a statistical central tendency across many rivers over long times, not a value any single river must take; real measured sinuosities range from near 1 for straight channels to well above 3, and later authors have found the pi figure hard to reproduce and easy to dispute. The intuition inside the model is that a fully developed meander loop is close to a half circle, whose arc is pi times its straight diameter, so even here a ghost of a circle is doing the work. It is a lovely idea worth stating honestly rather than a constant you can rely on.

### Colliding blocks

Put a small block between a wall and a large block sliding in from the right, on a frictionless line, with every collision perfectly elastic. Count the total number of collisions, block against block and block against wall. If the large block is $100^N$ times heavier than the small one, the count is the first $N+1$ digits of pi:

| Mass ratio | Collisions |
|---|---|
| 1 | 3 |
| 100 | 31 |
| 10,000 | 314 |
| $100^N$ | first $N+1$ digits of $\pi$ |

Why pi? Elastic collisions conserve kinetic energy, and in rescaled velocity coordinates each collision is a reflection that steps a point by a fixed angle around a circle set by that conserved energy. Counting collisions turns into counting how many times that fixed step fits before the motion is spent, which is asking how many times a small angle fits into pi. With the mass ratio $100^N$ the step angle is about $10^{-N}$ radians, and $\pi$ divided by $10^{-N}$ reads off the digits. Gregory Galperin proved this in 2003. It is pure theory, a party trick of dynamics rather than something you would build, and one of the most surprising hiding places pi has.

## Sources

- George B. Arfken and Hans J. Weber, *Mathematical Methods for Physicists*, 6th edition, Elsevier, 2005. The Gaussian integral and the polar coordinates evaluation.
- Ronald N. Bracewell, *The Fourier Transform and Its Applications*, 3rd edition, McGraw-Hill, 2000. Why $e^{2\pi i f t}$ is the building block of signals.
- J. W. Cooley and J. W. Tukey, "An Algorithm for the Machine Calculation of Complex Fourier Series," *Mathematics of Computation* 19 (1965), 297 to 301. The Fast Fourier Transform your phone runs.
- David J. Griffiths, *Introduction to Electrodynamics*, 4th edition, Cambridge University Press, 2017. Coulomb's law and the $4\pi$ from spherical spreading.
- David J. Griffiths, *Introduction to Quantum Mechanics*, 3rd edition, Cambridge University Press, 2018. The uncertainty principle and the definition $\hbar = h/2\pi$.
- Charles W. Misner, Kip S. Thorne, and John A. Wheeler, *Gravitation*, W. H. Freeman, 1973. Einstein's field equations and the origin of the $8\pi$.
- Marc Rayman, "How Many Decimals of Pi Do We Really Need?", NASA/JPL Edu, 2016. Source of the Voyager 1.5 inch figure and the 15 digit rule. https://www.jpl.nasa.gov/edu/news/2016/3/16/how-many-decimals-of-pi-do-we-really-need/
- Georges-Louis Leclerc, Comte de Buffon, "Essai d'arithmetique morale," 1777. The original needle problem.
- Hans-Henrik Stolum, "River Meandering as a Self-Organization Process," *Science* 271 (1996), 1710 to 1713. The sinuosity toward pi model result, with the caveats it deserves.
- Gregory Galperin, "Playing Pool With Pi (The Number Pi From a Billiard Point of View)," *Regular and Chaotic Dynamics* 8, no. 4 (2003), 375 to 394. The colliding blocks theorem.

---

[Atlas index](README.md) · Previous: [What nobody knows](07-open-problems.md) · Next: [Pi in culture](09-culture.md) · [Repository home](../README.md)
