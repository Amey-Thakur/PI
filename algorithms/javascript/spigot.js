/*
  Name: spigot.js
  Purpose: Stream the first 200 decimals of pi with the Rabinowitz-Wagon spigot algorithm.
  Description: A spigot algorithm drips out digits one at a time using only small
    integer arithmetic, no big-number library and no stored value of pi. This is the
    1995 Rabinowitz and Wagon method: an array of remainders in the mixed radix of
    2 + (1/3)(2 + (2/5)(2 + ...)), with a hold-back buffer so a run of nines can carry
    cleanly. Each digit is written as it settles, and the stream is checked in-file.
  Usage: node spigot.js
  Tech Stack: JavaScript (Node.js 22, standard library only)
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
*/

'use strict';

const DECIMALS = 200;                   // digits after the point

// Yields the digits of pi as integers. Column i (1-indexed) holds a remainder in
// base 2i-1; a carry moving left is scaled by i. Column 1 is plain base 10. The
// predigit plus nines buffer hold a value back until the next digit rules out a carry.
function* piDigits(count) {
  const len = Math.floor((10 * count) / 3) + 1;
  const a = new Array(len + 1).fill(2);   // 1-indexed; a[0] stays unused

  let nines = 0;
  let predigit = 0;

  for (let j = 0; j <= count; j++) {
    let q = 0;

    for (let i = len; i >= 2; i--) {
      const x = 10 * a[i] + q * i;
      a[i] = x % (2 * i - 1);
      q = Math.floor(x / (2 * i - 1));
    }

    const x = 10 * a[1] + q;
    a[1] = x % 10;
    q = Math.floor(x / 10);

    if (q === 9) {
      nines += 1;
    } else if (q === 10) {
      // The held nines all roll over to zeros and the predigit ticks up by one.
      yield predigit + 1;
      for (let k = 0; k < nines; k++) yield 0;
      predigit = 0;
      nines = 0;
    } else {
      yield predigit;
      predigit = q;
      for (let k = 0; k < nines; k++) yield 9;
      nines = 0;
    }
  }

  yield predigit;
}

// Ask for a few extra digits, since the last positions of a spigot run can drift,
// then trim to size. The very first yield is an initialization placeholder to drop.
const raw = [];
for (const digit of piDigits(DECIMALS + 10)) {
  raw.push(digit);
}

const clean = raw.slice(1);
const whole = clean[0];
const decimals = clean.slice(1, 1 + DECIMALS).join('');

const EXPECTED =
  '14159265358979323846264338327950288419716939937510' +
  '58209749445923078164062862089986280348253421170679' +
  '82148086513282306647093844609550582231725359408128' +
  '48111745028410270193852110555964462294895493038196';

if (whole !== 3 || decimals !== EXPECTED) {
  console.error('FAIL: spigot output does not match pi.');
  console.error(`got  ${whole}.${decimals}`);
  process.exit(1);
}

// Stream it: the settled leading digit and point, then decimals grouped in tens.
process.stdout.write('Rabinowitz-Wagon spigot, streaming 200 decimals of pi\n\n');
process.stdout.write(`${whole}.`);

for (let i = 0; i < DECIMALS; i++) {
  process.stdout.write(decimals[i]);

  if ((i + 1) % 50 === 0) {
    process.stdout.write('\n  ');
  } else if ((i + 1) % 10 === 0) {
    process.stdout.write(' ');
  }
}

process.stdout.write('\n\nPASS: all 200 decimals match the known value.\n');
