<!--
  Name: 06-records.md
  Purpose: The record book for pi: the machines that compute it and the minds that memorize it.
  Description: Traces the computation record from ENIAC in 1949 to 314 trillion
    digits in 2025, explains why storage and cloud companies chase these runs,
    shows how a record is verified with a BBP spot check, and tells the two
    human memory stories. Records age, so it points to the live sources.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Records

There are two record books for pi, and they measure different things. One tracks machines: how many digits a computer can grind out, a number that has climbed from a couple thousand to hundreds of trillions in a single human lifetime. The other tracks minds: how many digits a person can recite from memory, a far smaller number won with far more effort. This chapter walks both ladders, explains why serious companies spend months of hardware time on a number nobody needs past the fortieth digit, shows how anyone can check that a trillion-digit claim is real, and ends with the two people who hold the memory records. Every figure here is marked as of mid 2026, because records like these do not stay put.

## Machines: the computation record

The modern era starts in 1949, when the ENIAC computed 2,037 digits in about 70 hours. Every rung since has been a mix of better algorithms, faster machines, and, lately, bigger storage arrays. The ladder below lists the headline records. It is not every step (there were more rungs between 2010 and 2019, for instance), but it is the shape of the climb.

| Year | Who | Digits | Machine and notes |
|---|---|---|---|
| 1949 | ENIAC team, USA | 2,037 | First computer computation, about 70 hours |
| 1961 | Daniel Shanks and John Wrench | 100,265 | IBM 7090 |
| 1973 | Jean Guilloud and Martine Bouyer, France | 1,001,250 | CDC 7600, first past one million |
| 2002 | Yasumasa Kanada, Japan | 1.24 trillion | Hitachi supercomputer |
| 2009 | Fabrice Bellard, France | 2.7 trillion | A single desktop PC |
| 2010 | Shigeru Kondo and Alexander Yee | 5 trillion | Desktop machine, first y-cruncher record |
| 2019 | Emma Haruka Iwao, Google | 31.4 trillion | Google Cloud, announced on Pi Day |
| 2022 | Emma Haruka Iwao, Google | 100 trillion | Google Cloud |
| 2024 | StorageReview | 105, then 202 trillion | Two records, March and June |
| May 2025 | Kioxia and Linus Media Group | 300 trillion | Verified as a Guinness World Record |
| Nov 2025 | StorageReview and Micron | 314 trillion | One Dell server, about 110 days |

Two things change as you read down the table. The counts stop being written out in full, because past a trillion the exact figure stops mattering and the order of magnitude is the whole story. And the names stop being universities and start being companies that sell storage and memory. That shift is the key to why these runs happen at all.

## Why anyone computes trillions of digits

Nobody needs the trillionth digit of pi. About 40 digits would size the observable universe to the width of a hydrogen atom, and NASA steers spacecraft with 15 (see [What is pi](01-what-is-pi.md)). So the point of a record run is not the answer. The point is the run itself.

A multi-trillion-digit computation is one of the harshest stress tests a computer can face. The working data is far too large to fit in memory, so it spills onto disk, and the machine spends months shuttling enormous amounts of data between memory and storage without a single error. That makes the calculation a near-perfect benchmark of exactly the things storage and memory companies sell: sustained read and write speed across many drives, memory bandwidth, and the ability to run flat out for weeks without a crash or a flipped bit. A run that finishes and verifies is a public proof that the hardware held.

That is why the recent record holders are StorageReview, Kioxia, and Micron rather than physics departments. It is also why almost all of them run the same program: y-cruncher, written by Alexander Yee. y-cruncher has been the standard instrument for pi records since 2010. It implements the fast series and the disk-based arithmetic, and, just as important, it verifies its own output. When a company announces a new record, it is really announcing that its hardware survived a known, repeatable, brutally demanding test.

## How a record gets verified

A claim of trillions of correct digits is worthless unless someone can check it, and you plainly cannot check it by hand. Verification rests on two independent ideas.

The first is redundancy. A record run computes pi twice, using two different formulas whose only thing in common is the answer. The main pass uses a fast Chudnovsky-type series; a second pass uses an unrelated series. Because a bug or a hardware fault would corrupt the two computations in different ways, agreement to the last digit is strong evidence that both are right. This is the same two-engine standard the [million digits](05-digits.md) in this repository are held to, scaled up by a factor of a hundred million.

The second is a spot check that needs almost no work. In 1995, Bailey, Borwein, and Plouffe found a formula that computes a chosen hexadecimal digit of pi without computing any of the digits before it:

$$\pi = \sum_{k=0}^{\infty} \frac{1}{16^k}\left(\frac{4}{8k+1} - \frac{2}{8k+4} - \frac{1}{8k+5} - \frac{1}{8k+6}\right)$$

This is the BBP formula, and it is the auditor's tool. After a record run finishes, you pick a position near the very end, use BBP to compute the digits there directly, and confirm they match what the full computation produced. If the last digits are right, the whole run almost certainly is, because an error anywhere earlier would have thrown the ending off. When a record is submitted to Guinness, as the 300 trillion digit run was in May 2025, this kind of independent check is part of the evidence.

## The current record

As of mid 2026, the record is 314 trillion digits, set by StorageReview together with Micron and announced on November 18, 2025. What is striking is the modesty of the hardware: a single Dell server with two AMD EPYC processors, running y-cruncher for roughly 110 days. No supercomputer, no cloud cluster, just one well-provisioned box left to run for a third of a year.

It edged past the previous record of 300 trillion digits, set in May 2025 by Kioxia with Linus Media Group and verified as a Guinness World Record. That in turn had surpassed the two records StorageReview set in 2024, at 105 trillion in March and 202 trillion in June, and before them Google Cloud's 100 trillion digits, computed by Emma Haruka Iwao's team in 2022. The trend is clear: the frontier now moves every year or so, and it moves because a storage vendor wanted to prove a point about its drives.

## Minds: the memory record

The human record is a different kind of feat, because a person cannot spill to disk. Every digit has to be held in a mind and pulled back in order, under pressure, without a slip.

The Guinness World Record belongs to Rajveer Meena of India, who on March 21, 2015, recited 70,000 decimal places of pi at VIT University in Vellore. He did it blindfolded, and it took nearly ten hours (about 9 hours and 27 minutes) with witnesses and officials confirming each digit against a printed sheet. As of mid 2026 that record stands.

A larger number is often quoted. In 2006, Akira Haraguchi of Japan recited 100,000 decimal places over a session reported to run more than sixteen hours. His achievement was widely covered and is genuinely remarkable, but it was never ratified by Guinness, which applies strict evidence rules about independent witnessing and documentation. So the two feats sit in different categories: Haraguchi's is the larger reported number, and Meena's is the official record.

## How the memorizers do it

Nobody memorizes pi as raw digits. The trick, used by every record holder, is to turn numbers into something the mind grips more naturally: pictures and places.

First comes a fixed code that converts small groups of digits into vivid images. In systems like the Major method, each digit maps to a consonant sound, so a chunk of digits becomes a word, and the word becomes a picture. More elaborate schemes assign every two- or three-digit group its own person, action, or object, so a long run of numbers turns into a cast of characters doing memorable things. Then those images are placed along a memorized route through a familiar building, a technique called the method of loci, or memory palace, which the orators of the ancient world already used to hold long speeches. To recall the digits, the memorizer walks the route in imagination, reads off the images in each room, and decodes them back into numbers. A featureless string becomes a story with a setting, and stories are what human memory is built to keep.

## Records age

Everything in this chapter is a snapshot. The computation record in particular is likely to be broken again before you read this, quietly, by another storage company with a server to spare. Treat the numbers here as true as of mid 2026 and check the live sources for the current truth: Alexander Yee's y-cruncher records page tracks every pi computation record and how it was verified, and Guinness World Records is the authority for the memory record. The two ladders will keep climbing. The reasons they climb, benchmarking on one side and the shape of human memory on the other, are what actually last.

## Sources

- Alexander J. Yee, "y-cruncher: A Multi-Threaded Pi Program," records page. The live, maintained list of computation records and their verification. http://www.numberworld.org/y-cruncher/
- David H. Bailey, Peter B. Borwein, and Simon Plouffe, "On the Rapid Computation of Various Polylogarithmic Constants," *Mathematics of Computation* 66, no. 218 (1997), 903 to 913. The BBP formula used for spot checks.
- George W. Reitwiesner, "An ENIAC Determination of pi and e to more than 2000 Decimal Places," *Mathematical Tables and Other Aids to Computation* 4 (1950), 11 to 15. The 1949 computation.
- Daniel Shanks and John W. Wrench, Jr., "Calculation of pi to 100,000 Decimals," *Mathematics of Computation* 16 (1962), 76 to 99. The 1961 record.
- Jorg Arndt and Christoph Haenel, *Pi Unleashed*, 2nd edition, Springer, 2001. History of the computation records through the modern era.
- StorageReview Lab, "Setting a New Pi Calculation World Record: 314 Trillion Digits," November 2025. The current record announcement. https://www.storagereview.com/
- Google Cloud, "Calculating 100 trillion digits of pi on Google Cloud," 2022. Emma Haruka Iwao's team on the method and hardware. https://cloud.google.com/blog/products/compute/calculating-100-trillion-digits-of-pi-on-google-cloud
- Guinness World Records, "Most pi places memorised" (Rajveer Meena, 2015). The authority for the memory record. https://www.guinnessworldrecords.com/

---

[Atlas index](README.md) · Previous: [The digits themselves](05-digits.md) · Next: [What nobody knows](07-open-problems.md) · [Repository home](../README.md)
