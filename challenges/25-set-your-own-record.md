<!--
  Name: 25-set-your-own-record.md
  Purpose: The capstone: set a personal pi record and document it reproducibly.
  Description: The reader picks one record, digits computed, digits memorized, or
    deepest verified challenge, and writes a report anyone could reproduce:
    environment, method, timing, and a BBP spot check for computed digits. The
    solution describes what a good report contains rather than handing over answers.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 25: Set Your Own Record

Tier: Master · Time: as long as your record takes

Twenty-four challenges have handed you tasks with answers waiting behind a fold.
This one does not. The last rung is yours to build. You will set a record that is
personal, honest, and reproducible, and you will write it up so well that a
stranger with your file and a computer could confirm every word. A record nobody
can check is a story. A record anyone can check is science. Write the second kind.

## The task

Pick one record. Not the world's, yours.

- **Digits computed.** How many decimals of π can you compute and verify on your
  own machine? A million from [Challenge 21](21-the-million-club.md) is a fine
  floor. Ten million is a real afternoon. Push until your patience or your memory
  runs out, whichever comes first.
- **Digits memorized.** How many decimals can you recite cold, no screen, no
  notes? The piem from [Challenge 01](01-first-ten.md) got you ten. This is the
  human record book, and it is won one stubborn evening at a time.
- **Deepest verified challenge.** How far up this ladder did you climb with every
  answer confirmed by your own code, not just read? That counts, and it is worth
  documenting.

Then write the report. Whatever the record, it must let someone else reproduce or
verify the claim without asking you a single question. That is the whole
challenge: not the number, the report.

## You have solved it when

- [ ] You have a single, specific claim: a number and what it counts.
- [ ] You have a report that states the environment, the method, and the timing,
      precisely enough to reproduce.
- [ ] For a computed record, you have a BBP spot check: at least one digit deep in
      your result, confirmed by the independent formula, so the claim does not rest
      on one program agreeing with itself.

<details>
<summary>What a good record report looks like</summary>

There is no hidden answer here, because the answer is yours. What follows is the
shape of a report worth trusting. Judge your own against it.

**A claim in one line.** "I computed and verified 5,000,000 decimals of π." Or "I
recited 250 decimals from memory, timed, on the first attempt." Specific, falsifiable,
no hedging. A record that needs a paragraph to state is not a record yet.

**The environment.** What machine, what operating system, what language and
version. "Python 3.14 on Windows 11, a 2026 laptop, 16 GB of memory." Digits do
not depend on hardware, but timings are meaningless without it, and reproducibility
starts with someone being able to stand where you stood.

**The method, by name and source.** Which algorithm, which implementation. "Chudnovsky
with binary splitting, from `algorithms/python/chudnovsky.py`, raising
`set_int_max_str_digits`." For a memory record, the method is your mnemonic scheme
and how you drilled it. Name it so it can be repeated, not admired.

**The timing.** Wall-clock, and where it went. A computed record should break the
run down the way [Challenge 21](21-the-million-club.md) did: how long the series
took, how long the final square root and division took. A memory record should say
how long the recitation ran and how long you studied. Time turns a boast into a
measurement.

**The verification, and this is the spine of the whole thing.** For a computed
record, one program agreeing with itself proves nothing; a bug produces the same
wrong digits twice. You need a second, independent witness. Two exist in this
repository. Recompute with the unrelated Gauss-Legendre method in
[`scripts/verify_digits.py`](../scripts/verify_digits.py), which shares no code and
no formula with Chudnovsky, and confirm they agree to the last digit. That is the
standard real record runs use.

Then add the cheap, devastating cross-check: a **BBP spot check**. The
Bailey-Borwein-Plouffe formula in
[`algorithms/python/bbp.py`](../algorithms/python/bbp.py) can hand you a single
hexadecimal digit deep in the expansion without computing any digit before it, by
a completely different route. Convert a slice of your result to hexadecimal at some
deep position and confirm BBP produces the same digits. If a third method, sharing
nothing with the first two, agrees at a position it reached independently, the odds
of a shared bug collapse to nothing.

A concrete example you can run right now, checked against
`data/pi-1000000.txt`: in hexadecimal π begins `3.243F6A8885...`, so BBP at
position 0 returns `243F6A88`. Deeper, BBP returns `49F1C0` starting at position
1,000, `35EA16` at position 100,000, and `6FFFA4` at position 250,000, and every
one of those matches the hexadecimal read straight off the verified decimal file.
That is the move: pick a position no one would guess, extract by BBP, and show it
lands where your own digits say it should.

**Honesty about the limits.** A good report says what it did not prove. A million
verified digits does not make π normal (see
[Challenge 23](23-blocks-at-scale.md)). A fast run on your laptop is not a world
record; the machine ladder is at hundreds of trillions. Stating the ceiling you
did not reach is what separates a record report from a brag.

Write it, save it, and if you want it seen, the repository takes contributions.
That is the last digit of this whole thing: not a number you memorized, but a claim
you made that anyone can check.

</details>

You have reached the top of the ladder. Related reading: [Records](../atlas/06-records.md),
the two record books, machine and mind, and how anyone checks a claim of trillions.
