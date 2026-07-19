<!--
  Name: 24-pi-from-the-primes.md
  Purpose: Compute pi from the primes via Euler's product and a coprime experiment.
  Description: The reader builds pi from the Euler product for zeta(2) using only
    primes, watches it converge slowly, then recovers pi from the probability that
    two random integers are coprime. Every estimate and error in the solution is
    from a real run with a stated seed.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 24: Pi from the Primes

Tier: Master · Time: about 90 minutes

Here is something that should not be true. π is about circles. The primes are
about whole numbers and have nothing to do with roundness. Yet you can build π out
of the primes alone, with no circle in sight, and you can also find it hiding in a
question a child could ask: pick two numbers at random, what are the odds they
share no factor? Both roads lead to the same place, and the reason they do is one
of Euler's finest tricks.

## The task

Two computations, one idea underneath.

First, the Euler product. Euler showed that the sum of 1 over every square,
1 + 1/4 + 1/9 + 1/16 + ..., which equals π squared over 6, can be rewritten as a
product over the primes only:

```
pi^2 / 6 = product over primes p of  1 / (1 - 1/p^2)
```

So π is the square root of 6 times that product. Compute it. Sieve the primes up
to a bound, multiply the factors, take the root, and watch how many primes it
takes to buy each new correct digit. This is the companion to
[`algorithms/python/euler_basel.py`](../algorithms/python/euler_basel.py), which
sums over all integers; here you use primes alone.

Second, the coprime experiment. The probability that two integers picked at random
share no common factor is exactly 6 over π squared. Estimate that probability by
sampling: draw many pairs with a seeded random generator, count how often their
greatest common divisor is 1, and invert to recover π. Use a fixed seed so your
run is reproducible.

## You have solved it when

- [ ] You have a π estimate from the prime product, and you can say roughly how
      many more primes each new correct digit costs.
- [ ] You have a π estimate from coprime sampling, with a stated seed, that lands
      near 3.1416 once the sample is large.
- [ ] You can explain the bridge: why a fact about primes becomes a fact about π.

<details>
<summary>Hint</summary>

For the sieve, a plain boolean array up to a million is plenty and runs in a blink.
The product's factors are all slightly above 1, so multiply in floating point and
do not worry about order.

For the coprime experiment, `math.gcd` is in the standard library and
`random.Random(seed)` gives you a reproducible stream. Draw both integers from a
wide range, say 1 to a million, so the finite-range bias stays tiny. The estimate
of π is `sqrt(6 / p_hat)` where `p_hat` is the fraction of coprime pairs. Expect
Monte Carlo's usual crawl: to add one correct digit you need about a hundred times
the samples, because error shrinks like 1 over the square root of the count.

</details>

<details>
<summary>Solution</summary>

**The Euler product.** Multiplying `1 / (1 - 1/p^2)` over the primes up to a
growing bound:

| Primes up to | How many | π estimate | Error |
|---|---|---|---|
| 10 | 4 | 3.09359217 | 4.8e-02 |
| 100 | 25 | 3.13873720 | 2.9e-03 |
| 1,000 | 168 | 3.14139318 | 2.0e-04 |
| 10,000 | 1,229 | 3.14157724 | 1.5e-05 |
| 100,000 | 9,592 | 3.14159139 | 1.3e-06 |
| 1,000,000 | 78,498 | 3.14159255 | 1.1e-07 |

It crawls. Every tenfold jump in the prime bound buys about one more correct
decimal, and the digits lock in from the left. All 78,498 primes below a million
get you to 3.14159255 against a true 3.14159265, seven figures and no further. Set that against the Chudnovsky series from
[Challenge 21](21-the-million-club.md), where a single term is worth fourteen
digits, and you see why nobody computes π this way. But nobody needed to be told π
comes from circles either, and here it is falling out of the primes.

**The coprime experiment.** Seed 314159, integers drawn from 1 to a million, two
draws per pair:

| Samples | Coprime | p_hat | π estimate | Error |
|---|---|---|---|---|
| 1,000 | 600 | 0.600000 | 3.162278 | 2.1e-02 |
| 10,000 | 6,073 | 0.607300 | 3.143214 | 1.6e-03 |
| 100,000 | 60,838 | 0.608380 | 3.140423 | 1.2e-03 |
| 1,000,000 | 607,973 | 0.607973 | 3.141474 | 1.2e-04 |
| 10,000,000 | 6,079,179 | 0.607918 | 3.141616 | 2.4e-05 |

The target is 6 over π squared, which is 0.607927. Ten million coin-flips of
coprimality land on 3.1416, four figures, and each figure past that would cost
roughly another hundredfold in samples. Slow, but it is π pulled out of a random
number generator asking about common factors.

**The bridge.** Both roads run over the same bridge, and Euler built it. Every
whole number factors into primes exactly one way. Take the factor for a single
prime p and expand it as a geometric series:

```
1 / (1 - 1/p^2) = 1 + 1/p^2 + 1/p^4 + 1/p^6 + ...
```

Now multiply those expansions together across all primes. When you pick one term
from each prime's series and multiply, unique factorization says you land on
1 over n squared for exactly one integer n, and every n is hit exactly once. So
the product over primes equals the sum over all integers, 1 + 1/4 + 1/9 + ...,
which Euler proved is π squared over 6. That is the bridge from primes to π: the
sum over the integers and the product over the primes are the same object, and
that object is tied to π by the Basel problem.

The coprime experiment is the same bridge seen from the other bank. A prime p
divides a random integer with probability 1 over p, so it divides two independent
integers with probability 1 over p squared, and it fails to divide both with
probability `1 - 1/p^2`. Two integers are coprime exactly when no prime divides
both, and treating the primes as independent, that probability is the product of
`1 - 1/p^2` over all primes. But that product is just the reciprocal of the Euler
product above, so it equals 6 over π squared. The odds two numbers share no factor
and the value of π are the same fact wearing different clothes.

Checked with `math` and `random` from the standard library; the coprime figures
reproduce with seed 314159.

</details>

Continue: [Challenge 25: Set Your Own Record](25-set-your-own-record.md). Related
reading: [The formula collection](../atlas/03-formulas.md).
