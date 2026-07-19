<!--
  Name: 05-digits.md
  Purpose: What the decimal digits of pi look like statistically, grounded in this repo's own million.
  Description: Defines normality precisely, shows the repository's real chi-square table,
    verifies every positional claim against data/pi-1000000.txt, covers the Feynman point
    and self-locating strings, and closes with the BBP formula and what it does and does
    not say about how random the digits are.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# The digits themselves

The decimals of pi look like noise, and that appearance is the whole puzzle of this chapter. You will see the actual digit counts from the million decimals in this repository, tested with chi-square; a precise definition of what "random" is even supposed to mean for a fixed number; the honest limits of what any frequency table can prove; a tour of landmarks in the decimals, including the six 9s of the Feynman point and strings that name their own address; and a formula that can hand you a far-off digit without computing a single one before it. Every position quoted below was checked by searching `data/pi-1000000.txt` directly.

## A census of a million digits

Here is the count of each digit in the first prefixes of pi, taken straight from `data/pi-1000000.txt`. The leading 3 is not counted; these are decimal places only. The bottom rows give the expected count if the ten digits were perfectly even, and the chi-square statistic measuring how far the real counts stray from that.

| Digit | First 1,000 | First 10,000 | First 100,000 | First 1,000,000 |
|---|---|---|---|---|
| 0 | 93 | 968 | 9,999 | 99,959 |
| 1 | 116 | 1,026 | 10,137 | 99,758 |
| 2 | 103 | 1,021 | 9,908 | 100,026 |
| 3 | 102 | 974 | 10,025 | 100,229 |
| 4 | 93 | 1,012 | 9,971 | 100,230 |
| 5 | 97 | 1,046 | 10,026 | 100,359 |
| 6 | 94 | 1,021 | 10,029 | 99,548 |
| 7 | 95 | 970 | 10,025 | 99,800 |
| 8 | 101 | 948 | 9,978 | 99,985 |
| 9 | 106 | 1,014 | 9,902 | 100,106 |
| Expected | 100 | 1,000 | 10,000 | 100,000 |
| Chi-square | 4.740 | 9.318 | 4.093 | 5.509 |

The counts hug the expected value at every depth. No digit is running away, none is starving. To turn that eyeball impression into a number, we use the chi-square test.

## What the chi-square number means

Start from a guess: the ten digits are equally likely, so a block of $N$ digits should hand each digit about $N/10$ appearances. Call the count we actually saw for digit $d$ the observed value $O_d$, and call $N/10$ the expected value $E_d$. The chi-square statistic adds up the squared gaps, each scaled by the expectation:

$$\chi^2 = \sum_{d=0}^{9} \frac{(O_d - E_d)^2}{E_d}$$

A big value means the counts are far from even; a value near zero means they track the expectation almost too well. With ten categories the test has nine degrees of freedom, and for that setting the typical outcome is around 9. The standard cutoff for suspicion is the 95 percent critical value, 16.919: land above it and you would start to doubt that the digits are evenly spread.

Our four values, 4.740, 9.318, 4.093, and 5.509, all sit comfortably below that line and near the middle of the expected range. Pi's digits pass. Worth noting the other tail too: a chi-square glued to zero would be its own alarm, because real uniform noise wobbles and does not match its target perfectly. Pi's counts wobble by exactly the right amount.

## What the table cannot say

Passing the test is reassuring and proves nothing. Here is the gap, stated plainly.

A frequency table describes a finite prefix. The property mathematicians actually care about is a statement about the infinite expansion, and no finite count can pin down an infinite limit. Our million digits could be the well behaved opening of a sequence that goes strange at digit $10^{12}$, and this table would never know. Passing chi-square is necessary for the deep property below, not sufficient for it. A million digits is a rounding error against forever.

To say precisely what the deep property is, we need a definition.

## Normality: the exact meaning of "random"

Pi is not random. It is a single fixed number, and every one of its digits was decided the moment we defined it. So "random" has to mean something narrower and testable. That something is normality.

A number is **simply normal** in base $b$ if each of the $b$ single digits appears in its expansion with limiting frequency exactly $1/b$. In base 10 that means every digit from 0 to 9 shows up one tenth of the time in the long run.

A number is **normal** in base $b$ if the same evenness holds for blocks of every length at once: every two-digit block appears with frequency $1/b^2$, every three-digit block with frequency $1/b^3$, and so on for blocks of all lengths forever. Not just single digits, but every finite pattern, equally often as it deserves.

A number is **absolutely normal** if it is normal in every base $b \geq 2$ at the same time: base 2, base 10, base 16, base 7, all of them.

Now the honest state of affairs. Pi is believed to be absolutely normal. Every experiment ever run, including the table above, is consistent with it. And it has been proved for no base whatsoever. As of mid 2026 nobody has even proved that pi is simply normal in base 10, meaning nobody can prove that the digit 7 keeps showing up one tenth of the time out to infinity. We compute the digits by the trillion and they behave perfectly, and the proof that they must is nowhere. That is the whole reason the frequency table is interesting rather than decisive.

## Landmarks in the decimals

Fixed digits have fixed addresses, and some of those addresses are fun. Every position here was found by searching the million-digit file, counting the first decimal place as position 1.

The digit 0 is a late arrival. The first 31 decimals of pi contain no zero at all; the first 0 lands at **position 32**.

A few strings people like to hunt for:

| String | Why it is fun | First appears at |
|---|---|---|
| 314159 | pi's own opening digits, turning up again inside itself | 176,451 |
| 271828 | the opening digits of $e$, hiding inside pi | 33,789 |
| 12345 | the counting run | 49,702 |
| 999999 | six nines in a row, the Feynman point | 762 |

That last one deserves its own paragraph.

## The Feynman point

Six 9s in a row begin at **position 762** and run through position 767. They are bracketed by a 4 just before and an 8 just after, so the run is exactly six, no more. This early cluster is called the Feynman point, after a remark commonly attributed to the physicist Richard Feynman: that he would like to memorize pi out to those nines so he could recite the digits and finish "...nine, nine, nine, nine, nine, nine, and so on," as a joke that the number had turned rational. The authenticity of the quip is debated, but the digits are real and easy to check in this repository.

What makes it a small surprise is the position. A specific run of six identical digits has about a one in a million chance of starting at any given place, so seeing one by position 762 is earlier than a first guess would suggest. It is luck, not structure, exactly the kind of local clumping that genuine uniform noise produces and that the chi-square test is untroubled by.

## Strings that name their own address

Some strings are self-locating: the string appears in the decimals starting at the very position it spells out. The tiniest example is trivial: position 1 holds the digit 1, so "1" locates itself.

The famous ones are larger and verified here against the million digits:

- The string **16470** appears starting at decimal position 16,470.
- The string **44899** appears starting at decimal position 44,899.

Each one, read as a number, points at the exact spot in pi where it sits. There is nothing mystical in it. With enough digits these coincidences are bound to occur, and they depend entirely on the convention that the first decimal is position 1; shift the counting and different strings become self-locating. They are a good reminder that a striking pattern can be both completely real and completely expected.

## Reaching in without counting: the BBP formula

You might assume that to know the millionth digit of pi you must first compute the 999,999 digits before it. For base 16 that assumption is false. In 1995 David Bailey, Peter Borwein, and Simon Plouffe found this identity (published in 1997):

$$\pi = \sum_{k=0}^{\infty} \frac{1}{16^k}\left(\frac{4}{8k+1} - \frac{2}{8k+4} - \frac{1}{8k+5} - \frac{1}{8k+6}\right)$$

Its magic is not that it converges quickly, though it does. It is that the $16^k$ in the denominator lets you compute a chosen hexadecimal digit of pi directly, skipping every digit before it, using almost no memory. Ask for the ten-trillionth hex digit and you can get it without ever holding the ones ahead of it. The same trick works in base 2. No formula of this kind is known for base 10, which is why our decimal digits still have to be computed in order.

Now the part that matters for this chapter. BBP makes the digits of pi feel less random, not more. A short formula pins down any digit you name. The digits are fully determined, fully computable, and in base 16 even directly addressable. So "random" can only ever mean statistically unpredictable to someone who declines to do the arithmetic. It can never mean genuinely unpredictable, the way a coin flip is.

And yet BBP does not close the mystery. Being able to reach any hex digit cheaply says nothing about whether the digits are evenly spread in the limit; it does not prove pi normal in base 16 or in any base. Bailey and Crandall later tied BBP-style formulas to a conjecture that, if proved, would imply pi is normal in base 2, but that conjecture is still open as of mid 2026. So the two facts sit side by side and both stay true: every digit of pi is exactly determined, and whether those digits are evenly distributed remains unproven. You can find the digit. You still cannot prove it behaves.

Want to poke at a fixed digit yourself? Try the [Digit Search lab](https://amey-thakur.github.io/PI/) on the site and look up any string in the same million decimals used here.

## Sources

- David H. Bailey, Peter B. Borwein, and Simon Plouffe, "On the Rapid Computation of Various Polylogarithmic Constants," *Mathematics of Computation* 66 (1997), 903 to 913. The original BBP digit-extraction formula.
- David H. Bailey and Richard E. Crandall, "On the Random Character of Fundamental Constant Expansions," *Experimental Mathematics* 10, no. 2 (2001), 175 to 190. Links BBP-type formulas to the normality of pi.
- Jonathan Borwein and David Bailey, *Mathematics by Experiment: Plausible Reasoning in the 21st Century*, A K Peters, 2004. Clear treatment of normal numbers and the open status of pi.
- Steven R. Finch, *Mathematical Constants*, Cambridge University Press, 2003. Reference definitions of simple, normal, and absolutely normal numbers.
- Eric W. Weisstein, "Feynman Point" and "Normal Number," MathWorld. Standard statements of both. https://mathworld.wolfram.com/
- This repository's own `data/pi-1000000.txt` and `data/digit-frequency.json`. Every count, chi-square value, and digit position in this chapter was computed from these files.

---

[Atlas index](README.md) · Prev: [How pi gets computed](04-algorithms.md) · Next: [Records](06-records.md) · [Repository home](../README.md)
