/*
  Name: monte_carlo.js
  Purpose: Estimate pi by throwing a million reproducible random darts at a quarter circle.
  Description: Points dropped uniformly in the unit square land inside the quarter
    circle with probability pi/4, so four times the hit ratio estimates pi. A tiny
    mulberry32 generator supplies the randomness from a fixed seed, so every run
    throws the same darts and reports the same estimate. The method converges slowly:
    it is here to show the idea, not to win an accuracy contest.
  Usage: node monte_carlo.js
  Tech Stack: JavaScript (Node.js 22, standard library only)
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
*/

'use strict';

const DARTS = 1_000_000;
const SEED = 0x1a2b3c4d;                // fixed so the run is reproducible

// mulberry32: a compact, seedable 32-bit generator returning floats in [0, 1).
function mulberry32(seed) {
  let a = seed >>> 0;

  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(SEED);

let inside = 0;
for (let i = 0; i < DARTS; i++) {
  const x = rand();
  const y = rand();

  // Compare squared distance to keep the inner loop free of a square root.
  if (x * x + y * y <= 1) inside++;
}

const estimate = (4 * inside) / DARTS;
const error = Math.abs(Math.PI - estimate);

console.log('Monte Carlo estimate of pi');
console.log('');
console.log(`seed           0x${SEED.toString(16)}`);
console.log(`darts          ${DARTS.toLocaleString('en-US')}`);
console.log(`inside circle  ${inside.toLocaleString('en-US')}`);
console.log('');
console.log(`estimate       ${estimate}`);
console.log(`reference      ${Math.PI}`);
console.log(`error          ${error.toExponential(6)}`);
