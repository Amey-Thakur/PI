<!--
  Name: CONTRIBUTING.md
  Purpose: What fits in this repository and the bar it has to clear.
  Description: Three kinds of contributions, one merging standard, and the
    checks that prove a change before it ships. Written so a first-time
    contributor knows exactly what to do and a reviewer has nothing to
    argue about.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Contributing

Everything in this repository clears one bar: a curious stranger can pick it
up, use it, and trust it. Contributions are judged against that bar and
nothing else.

Three kinds of contributions fit here:

1. **Corrections.** A wrong fact, a broken link, a typo. Always welcome, no
   discussion needed.
2. **Algorithm implementations.** A missing algorithm, or an existing one in
   a language not covered yet.
3. **Challenges.** A new rung for the ladder, if it teaches something the
   existing 25 do not.

For anything larger, open an issue first so the shape is agreed before the
work begins.

## The bar for merging

- **Verifiable.** Code prints digits that match `data/`. Facts cite a source.
  Any claim about a digit position is checked against `data/pi-1000000.txt`
  before it is written down.
- **Self-contained.** Programs run on a fresh install of their language:
  standard library only, no packages, no network. The site makes no external
  request of any kind.
- **One file, one purpose.** A file that does two things becomes two files.
- **Headed.** Every file opens with the same header block as its neighbors:
  Name, Purpose, Description, Usage (for code), Tech Stack, License, Author,
  Date. Copy the shape from any existing file.
- **In voice.** Read two or three existing files before writing. A new file
  should be indistinguishable from the ones around it in tone, layout, and
  precision.

## Checks before a pull request

```
py scripts/generate_digits.py
py scripts/verify_digits.py
py scripts/digit_stats.py
py scripts/check_links.py
```

All four must pass (`python3` replaces `py` outside Windows). If you changed
an algorithm file, run it and confirm its output against `data/pi-1000.txt`.
CI repeats every one of these checks on push and fails loudly, so passing
locally means passing everywhere.

## What gets declined

Bulk content dumps, digit files beyond one million places (the repository
stays light), dependencies, decorative rewrites of working text, and
anything the bar above rules out.
