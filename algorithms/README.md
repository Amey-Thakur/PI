<!--
  Name: README.md
  Purpose: The index of every pi algorithm implemented in this repository.
  Description: One table from Archimedes to Chudnovsky: what each method is,
    when it mattered, how fast it earns digits, and where its code lives in
    each language. Every file runs on a fresh install of its language and is
    re-executed by CI on every push.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# The Algorithms

Twenty two working programs, one algorithm per file, standard library only.
Each prints something worth reading: bounds tightening, digits doubling, or
chance converging. The columns link every implementation; a blank cell means
that pairing is not implemented, deliberately, to keep every file worth
reading rather than filling a grid.

| Algorithm | Year | How it earns digits | Python | JavaScript | Rust |
|---|---|---|---|---|---|
| Archimedes' polygons | c. 250 BCE | error quarters with each doubling of sides | [py](python/archimedes.py) | | |
| Viete's product | 1593 | error quarters with each factor | [py](python/viete.py) | | |
| Wallis product | 1655 | error shrinks like 1/n, the scenic route | [py](python/wallis.py) | | |
| Madhava-Leibniz series | c. 1400 / 1674 | error shrinks like 1/n, the famous crawl | [py](python/leibniz.py) | [js](javascript/leibniz.js) | [rs](rust/leibniz.rs) |
| Nilakantha series | c. 1500 | error shrinks like 1/n³ | [py](python/nilakantha.py) | | |
| Euler's Basel route | 1734 | error shrinks like 1/n, via the squares | [py](python/euler_basel.py) | | |
| Machin's identity | 1706 | about 1.4 digits per term | [py](python/machin.py) | [js](javascript/machin.js) | |
| Ramanujan's series | 1914 | about 8 digits per term | [py](python/ramanujan.py) | | |
| Chudnovsky, binary splitting | 1988 | about 14 digits per term, every modern record | [py](python/chudnovsky.py) | [js](javascript/chudnovsky.js) | |
| Gauss-Legendre AGM | 1976 | correct digits double every pass | [py](python/gauss_legendre.py) | | |
| Rabinowitz-Wagon spigot | 1995 | streams digits one by one, bounded memory | [py](python/spigot.py) | [js](javascript/spigot.js) | [rs](rust/spigot.rs) |
| Bailey-Borwein-Plouffe | 1995 | any hex digit, without its predecessors | [py](python/bbp.py) | | |
| Monte Carlo darts | 1940s | error shrinks like 1/√n, charm not speed | [py](python/monte_carlo.py) | [js](javascript/monte_carlo.js) | [rs](rust/monte_carlo.rs) |
| Buffon's needle | 1777 | error shrinks like 1/√n, the original | [py](python/buffon.py) | | |

## How to run

Every file is self-contained. From the repository root:

```
py   algorithms/python/chudnovsky.py
node algorithms/javascript/machin.js
rustc -O algorithms/rust/spigot.rs -o spigot && ./spigot
```

On Linux and macOS, `python3` replaces `py`; on Windows the Rust binary is
`spigot.exe`.

## Where to start

Run [spigot.py](python/spigot.py) first: digits of π appearing one at a time,
in order, from integer arithmetic, feels like a magic trick. Then
[monte_carlo.py](python/monte_carlo.py) for the opposite mood, π assembling
itself out of chance. Save [chudnovsky.py](python/chudnovsky.py) for last and
watch a thousand digits arrive in a blink; it is the same series, at heart,
that computed the 314 trillion digit record.

The mathematics behind every row is in
[How pi gets computed](../atlas/04-algorithms.md).

[Repository home](../README.md)
