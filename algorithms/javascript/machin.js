/*
  Name: machin.js
  Purpose: Compute 50 exact decimals of pi with Machin's formula and integer BigInt math.
  Description: Machin's 1706 identity pi = 16*arctan(1/5) - 4*arctan(1/239) converges
    fast because 1/5 and 1/239 are small. Each arctan is summed as a scaled BigInt so
    there is no floating point error, with extra guard digits that are trimmed at the
    end. The result is checked in-file against a hardcoded 50-digit constant.
  Usage: node machin.js
  Tech Stack: JavaScript (Node.js 22, standard library only)
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
*/

'use strict';

const DIGITS = 50;
const GUARD = 10;                       // extra places absorb truncation in the tail
const SCALE = 10n ** BigInt(DIGITS + GUARD);

// arctan(1/x) = 1/x - 1/(3 x^3) + 1/(5 x^5) - ..., returned as floor(SCALE * arctan(1/x)).
// The variable power carries SCALE / x^(2k+1) from one term to the next, so the only
// divisions are integer ones and no term is ever formed in floating point.
function arctanInverse(x) {
  const xSquared = x * x;
  let power = SCALE / x;
  let sum = 0n;
  let k = 0n;
  let sign = 1n;

  while (power !== 0n) {
    sum += sign * (power / (2n * k + 1n));
    sign = -sign;
    power /= xSquared;
    k += 1n;
  }

  return sum;
}

const piScaled = 16n * arctanInverse(5n) - 4n * arctanInverse(239n);

// Drop the guard digits, then split the integer 3 from the fractional part.
const trimmed = piScaled / (10n ** BigInt(GUARD));
const text = trimmed.toString();
const pi = `${text[0]}.${text.slice(1)}`;

const EXPECTED = '3.14159265358979323846264338327950288419716939937510';

console.log("Machin 1706: pi = 16*arctan(1/5) - 4*arctan(1/239)");
console.log('');
console.log(`computed  ${pi}`);
console.log(`expected  ${EXPECTED}`);
console.log('');

if (pi === EXPECTED) {
  console.log(`PASS: all ${DIGITS} decimals match.`);
} else {
  console.error('FAIL: digits do not match.');
  process.exit(1);
}
