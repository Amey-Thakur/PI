/*
  Name: chudnovsky.js
  Purpose: Compute 1000 decimals of pi with the Chudnovsky series and binary splitting.
  Description: The Chudnovsky brothers' series adds about 14 correct digits per term,
    the engine behind modern record computations. Binary splitting keeps every
    quantity an exact integer by combining terms pairwise, so P, Q, and T stay whole
    until one final BigInt division. The first 50 decimals are checked against a
    hardcoded constant, then all 1000 are printed wrapped and labelled.
  Usage: node chudnovsky.js
  Tech Stack: JavaScript (Node.js 22, standard library only)
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
*/

'use strict';

const DIGITS = 1000;
const GUARD = 16;                       // a term's worth of slack for the final division

// 640320^3 / 24, the per-term denominator constant of the binary-splitting recurrence.
const C3_OVER_24 = 10939058860032000n;

// Integer square root by Newton iteration: floor(sqrt(n)) for n >= 0.
function isqrt(n) {
  if (n < 0n) throw new Error('isqrt of a negative number');
  if (n < 2n) return n;

  // Start above the true root so the iteration descends monotonically to it.
  let x = 1n << ((BigInt(n.toString(2).length) + 1n) >> 1n);

  while (true) {
    const y = (x + n / x) >> 1n;
    if (y >= x) return x;
    x = y;
  }
}

// Binary splitting over the half-open interval [a, b), returning [P, Q, T].
function computePQT(a, b) {
  if (b - a === 1n) {
    let P, Q;

    if (a === 0n) {
      P = 1n;
      Q = 1n;
    } else {
      P = (6n * a - 5n) * (2n * a - 1n) * (6n * a - 1n);
      Q = a * a * a * C3_OVER_24;
    }

    let T = P * (13591409n + 545140134n * a);
    if (a & 1n) T = -T;

    return [P, Q, T];
  }

  const m = (a + b) >> 1n;
  const [P1, Q1, T1] = computePQT(a, m);
  const [P2, Q2, T2] = computePQT(m, b);

  return [P1 * P2, Q1 * Q2, T1 * Q2 + P1 * T2];
}

// Each term is worth about 14.18 digits, so one extra term covers the guard places.
const terms = BigInt(Math.ceil((DIGITS + GUARD) / 14) + 1);
const [, Q, T] = computePQT(0n, terms);

const scale = 10n ** BigInt(DIGITS + GUARD);

// pi = 426880 * sqrt(10005) * Q / T. Scale sqrt(10005) up first, then divide once.
const sqrt10005 = isqrt(10005n * scale * scale);
const piScaled = (426880n * sqrt10005 * Q) / T;

const trimmed = piScaled / (10n ** BigInt(GUARD));
const text = trimmed.toString();
const decimals = text.slice(1);

const EXPECTED_50 = '14159265358979323846264338327950288419716939937510';

console.log('Chudnovsky series with binary splitting');
console.log(`terms used: ${terms}`);
console.log('');

if (decimals.slice(0, 50) === EXPECTED_50) {
  console.log('PASS: first 50 decimals match the known value.');
} else {
  console.error('FAIL: first 50 decimals are wrong.');
  console.error(`got      ${decimals.slice(0, 50)}`);
  console.error(`expected ${EXPECTED_50}`);
  process.exit(1);
}

console.log('');
console.log(`${text[0]}.`);

// Fifty decimals per line, grouped in tens, with the position range on the right.
const perLine = 50;
for (let i = 0; i < DIGITS; i += perLine) {
  const chunk = decimals.slice(i, i + perLine);
  const groups = chunk.match(/.{1,10}/g).join(' ');
  console.log(`${groups}    ${i + 1} to ${i + perLine}`);
}
