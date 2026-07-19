<!--
  Name: SECURITY.md
  Purpose: What counts as a security issue here and how to report one.
  Description: The repository ships a static site with no accounts, no
    server, and no dependencies, so the attack surface is small but not
    zero. This page draws the line between a security report and an
    ordinary bug, and gives the private reporting route.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Security

This repository is a static website, plain text data, and standalone
programs with no dependencies. It ships no server, collects nothing, and
executes nothing on your machine that you do not run yourself. Still, some
issues are worth reporting privately.

## What counts as a security issue

- **A flaw in the site** under `docs/`: script injection, a way to make the
  page load anything from a third party, or anything that breaks its
  promise of zero external requests.
- **A flaw in the scripts or workflows** (`scripts/`,
  `.github/workflows/`) that could be abused through a pull request.
- **A data integrity failure.** The digits in `data/` are dual-verified; a
  reproducible mismatch between them and an independent computation is
  treated with the same urgency as a vulnerability.

Ordinary bugs, typos, and content corrections are not security issues. Open
a regular issue or pull request for those.

## Reporting

Report privately, not in a public issue:

- Open a draft advisory under the repository's **Security** tab
  (**Report a vulnerability**), or
- Email **ameythakur20@gmail.com**.

Include what you found, where, and how to reproduce it. Expect an
acknowledgment within a few days. Fixes ship as soon as they are ready, and
credit goes to reporters who want it.
