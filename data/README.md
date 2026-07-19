<!--
  Name: README.md
  Purpose: What the digit files are, how they were made, and why to trust them.
  Description: Provenance for every dataset in this folder. The short version:
    one computation generated everything, an unrelated algorithm on a
    different arithmetic engine reproduced every digit, and CI repeats that
    proof on every push that touches the data.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# The Data

Verified decimals of π at four depths, plus the statistics the site draws.
Nothing here was copied from the internet; every file was computed, then
proven, inside this repository.

| File | Contents | Size |
|---|---|---:|
| [pi-1000.txt](pi-1000.txt) | 1,000 decimals | 1 KB |
| [pi-10000.txt](pi-10000.txt) | 10,000 decimals | 10 KB |
| [pi-100000.txt](pi-100000.txt) | 100,000 decimals | 99 KB |
| [pi-1000000.txt](pi-1000000.txt) | 1,000,000 decimals | 987 KB |
| [digit-frequency.json](digit-frequency.json) | Digit counts and chi-square at each depth | 2 KB |

The site keeps its own copies of the two larger digit files and the
statistics under `docs/data/`, alongside `docs/data/milestones.json`, the
curated history timeline the site renders.

## File format

Line one is `3.` on its own. Every following line holds exactly 100 digits,
so positions are computable by eye: line n (counting from the first digit
line) covers decimal places (n-1)·100+1 through n·100. To reconstruct the
plain digit string, drop the first line and every newline.

## Provenance

1. **Generated** by [generate_digits.py](../scripts/generate_digits.py):
   the Chudnovsky series with binary splitting on plain integers, computing
   1,000,010 decimals in under half a minute. The four files are prefixes of
   that single result, so they can never disagree with each other.
2. **Verified** by [verify_digits.py](../scripts/verify_digits.py): the
   Gauss-Legendre iteration, an unrelated algorithm running on Python's
   decimal engine instead of integers, recomputes the full million and
   compares every digit. Publication required both computations to agree
   exactly, the same standard world-record computations use.
3. **Measured** by [digit_stats.py](../scripts/digit_stats.py): digit counts
   and chi-square at each depth, written to
   [digit-frequency.json](digit-frequency.json).

CI repeats steps 2 and 3 on every push that touches data, scripts, or
algorithms, so the files in this folder cannot drift from their proof.

## Regenerate everything

```
py scripts/generate_digits.py
py scripts/verify_digits.py
py scripts/digit_stats.py
```

Same three commands on any platform (`python3` outside Windows). If the
second command prints anything but success, do not use the files.

The story of what these digits mean is in
[The digits themselves](../atlas/05-digits.md).

[Repository home](../README.md)
