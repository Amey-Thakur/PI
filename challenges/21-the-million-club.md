<!--
  Name: 21-the-million-club.md
  Purpose: Compute a million decimals of pi with Chudnovsky and verify them all.
  Description: The reader adapts the repository's Chudnovsky binary-splitting code
    to one million decimals, checks every digit against data/pi-1000000.txt, and
    then measures where the run's time actually goes. The timing numbers here
    come from real instrumented runs of algorithms/python/chudnovsky.py.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 21: The Million Club

Tier: Master · Time: about 90 minutes

A million digits used to be a world record. In 1973 it took a mainframe and a
published paper. Now it is a laptop and under a minute, and by the end of this
challenge it will be your laptop. You will compute a million decimals of π,
check that every one of them is correct, and then do the thing most people skip:
find out which part of the computation actually costs the time.

## The task

Take [`algorithms/python/chudnovsky.py`](../algorithms/python/chudnovsky.py) and
run it at one million decimals instead of a thousand. The Chudnovsky series adds
about 14.18 correct digits per term, so a million decimals needs roughly seventy
thousand terms, evaluated with binary splitting so the whole sum costs integer
multiplications and nothing else.

Then verify. Compare your million digits against
[`data/pi-1000000.txt`](../data/pi-1000000.txt) character by character, not
"looks right," but byte for byte. A single wrong digit anywhere means the run is
wrong everywhere after it.

Finally, instrument the run. Put a timer around three stages: the binary
splitting, the big-integer square root, and the final division. Report where the
seconds went. That last part is the real challenge; anyone can call a function.

One practical wall you will hit: Python refuses to turn a million-digit integer
into a string until you raise a safety limit. Add
`sys.set_int_max_str_digits(2_000_000)` near the top or the conversion throws.

## You have solved it when

- [ ] You have a string of one million decimals of π, computed by your own run.
- [ ] Every digit matches `data/pi-1000000.txt`, confirmed by an equality check
      your program prints as a single pass or fail, not by eye.
- [ ] You can say, with numbers, which stage of the computation took the most
      time, and you are not guessing.

<details>
<summary>Hint</summary>

The digit count is the first trap. The file holds the leading 3 and then a
million decimals, so it is 1,000,001 characters of digits. If `pi_digits(n)`
returns n characters counting the leading 3, then a million decimals means
`pi_digits(1_000_001)`, and you compare against the whole file, leading 3
included. Off-by-one here looks like a mismatch at the very last digit.

For the timing, wrap `time.perf_counter()` around exactly three calls: the
`_binary_split(0, terms)`, the `math.isqrt(...)`, and the final `// t` division.
Print each as a fraction of the total. Before you run it, guess which is biggest.
Most people guess wrong.

</details>

<details>
<summary>Solution</summary>

At one million decimals the series uses **70,515 terms**. Running the adapted
code and comparing to the reference file gives a clean pass: all 1,000,001
characters, the 3 and the million decimals, match byte for byte. The tail ends
`...105779458151`, so the millionth decimal is a 1.

Now the part worth the price of admission. Here is a representative instrumented
run on a 2026 laptop under Python 3.14. Absolute seconds drift from run to run
and machine to machine, so read the shares, not the clock:

| Stage | Time | Share |
|---|---|---|
| Binary splitting, all 70,515 terms | about 17 s | about 50% |
| Square root, one million-digit `isqrt` | about 7 s | about 20% |
| Final division | about 9 s | about 30% |
| Total | about 33 s | 100% |

The surprise is what is missing from the top. The seventy thousand terms, the
whole clever series, are only half the run. The other half is two operations
that happen once, after the sum is finished: a single integer square root and a
single division, each on numbers a million digits wide.

Why. Binary splitting is fast because it never touches a million-digit number
until the very end; it multiplies balanced, growing integers and keeps them
balanced. But the answer it hands over is a giant rational, a numerator over a
denominator, each about a million digits long. To read π off it you must do two
things at full width. You compute `sqrt(10005)` to a million places, which is one
`isqrt` on a two-million-digit integer, and you divide the assembled numerator by
the denominator, one division on million-digit integers. Those two full-width
operations are irreducible. You can make the series cheaper with a better split,
but you cannot get the digits out without paying for one square root and one
division at the final precision.

That is the general shape of every record run, scaled down. The series is not the
bottleneck. The endgame is. This is why the people who chase trillions of digits
obsess over fast multiplication and fast division far more than over which series
they use: past a certain size, the formula is a rounding error next to the two
big operations that turn its result into digits you can print.

Checked against `data/pi-1000000.txt`: 1,000,000 decimals, exact.

</details>

Continue: [Challenge 22: The Crossover](22-the-crossover.md). Related reading:
[How pi gets computed](../atlas/04-algorithms.md).
