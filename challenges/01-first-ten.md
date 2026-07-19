<!--
  Name: 01-first-ten.md
  Purpose: The entry challenge: memorize and write the first ten decimals of pi.
  Description: A gentle start that turns ten digits into something you carry for
    life, using one word-length mnemonic so the digits stick without drilling.
    Every digit here is checked against data/pi-1000.txt.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# Challenge 01: The First Ten

Tier: Novice · Time: about 15 minutes

Almost everyone knows 3.14. Almost no one can write ten decimals from memory,
yet ten is the number that steers real spacecraft with room to spare. Learn
these ten and you will have more π in your head than most people you will ever
meet.

## The task

Memorize the first ten decimal digits of π, then write them from memory with
the pencil away from any screen. Learn one trick that makes them stick, so a
week from now they are still there.

## You have solved it when

- [ ] You can write 3. followed by ten digits without looking.
- [ ] You can name the trick you used and explain how it encodes the digits.
- [ ] You can do it again an hour later, cold.

<details>
<summary>Hint</summary>

Do not memorize ten separate digits. Memorize one sentence and count the
letters in each word. This is called a piem: a phrase where each word length
is a digit of π. Short words for small digits, long words for big ones.

Try saying this out loud a few times: "How I wish I could calculate pi."

</details>

<details>
<summary>Solution</summary>

The first ten decimals are

```
3.1415926535
```

The piem that carries them, counting the letters in each word:

```
How  I  wish  I  could  calculate  pi  Eureka  cried  the  great
 3   1   4    1    5        9       2     6      5     3     5
```

"How" has three letters and gives the 3 before the point. Every word after it
gives one decimal, in order, so the sentence spells 3.1415926535. Add one more
word, "inventor" (eight letters), and you reach 3.14159265358, which is eleven
decimals for the price of one more clause.

Why this works: recalling a grammatical sentence is far easier than recalling a
random digit string, because the words constrain each other. Your memory only
has to hold the story, and the arithmetic of letter counting rebuilds the
number on demand.

Checked against [data/pi-1000.txt](../data/pi-1000.txt): the opening decimals
are 1415926535, exactly the counts above.

</details>

Continue: [Challenge 02: Around the Circle](02-around-the-circle.md). Related
reading: [The digits themselves](../atlas/05-digits.md).
