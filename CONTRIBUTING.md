<!--
  Name: CONTRIBUTING.md
  Purpose: The rules that keep this repository worth starring.
  Description: Contributions are welcome, but the bar is explicit. Most
    rejected pull requests fail one of the rules below, so they are short
    and worth two minutes.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Contributing

Thank you for wanting to make the home of π better. Three kinds of
contributions fit here:

1. **Corrections.** A wrong fact, a broken link, a typo. Always welcome,
   no discussion needed.
2. **Algorithm implementations.** A missing algorithm, or an existing one
   in a language not covered yet.
3. **Challenges.** A new rung for the ladder, if it teaches something the
   existing 25 do not.

## The rules

- **One file, one purpose.** No file does two things. Long files get split
  or rejected.
- **Every file carries the header.** Name, Purpose, Description, Usage (for
  code), Tech Stack, License, Author, Date. Copy the shape from any existing
  file.
- **Comments say why, never what.** If a comment restates the next line, it
  goes.
- **No em dashes.** Commas, colons, periods, parentheses.
- **Standard library only.** Every program must run on a fresh install of
  its language. No packages, no internet.
- **Everything verifiable.** Code must print digits that match `data/`.
  Facts must cite a source. Digit position claims must be checked against
  `data/pi-1000000.txt` before they are written down.
- **The site stays self contained.** No CDN, no fonts, no analytics, no
  external requests of any kind.

## Checks before you open a pull request

```
py scripts/generate_digits.py
py scripts/verify_digits.py
py scripts/digit_stats.py
```

All three must pass. If you changed algorithm files, run each changed file
and confirm its output digits against `data/pi-1000.txt`.

## What gets declined

Bulk content dumps, digit files beyond one million places (the repository
stays light), dependencies, decorative rewrites, and anything the rules
above rule out.
