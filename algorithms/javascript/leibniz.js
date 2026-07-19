/*
  Name: leibniz.js
  Purpose: Show how the Leibniz series creeps toward pi, one order of magnitude at a time.
  Description: The Leibniz formula pi/4 = 1 - 1/3 + 1/5 - 1/7 + ... converges, but
    painfully slowly: each extra correct digit costs roughly ten times more terms.
    This file prints a table of partial sums so the slowness is visible, with the
    running estimate and its error against Math.PI at each checkpoint.
  Usage: node leibniz.js
  Tech Stack: JavaScript (Node.js 22, standard library only)
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
*/

'use strict';

// Checkpoints span six orders of magnitude so the ten-times-more-terms-per-digit
// pattern reads straight off the table.
const checkpoints = [10, 100, 1000, 10000, 100000, 1000000];

function leibnizTable(maxTerms) {
  let sum = 0;
  let sign = 1;
  let next = 0;
  const rows = [];

  for (let k = 0; k < maxTerms; k++) {
    sum += sign / (2 * k + 1);
    sign = -sign;

    if (k + 1 === checkpoints[next]) {
      const estimate = 4 * sum;
      rows.push({ terms: checkpoints[next], estimate, error: Math.abs(Math.PI - estimate) });
      next++;
    }
  }

  return rows;
}

const rows = leibnizTable(checkpoints[checkpoints.length - 1]);

console.log('Leibniz series for pi: pi = 4 * (1 - 1/3 + 1/5 - 1/7 + ...)');
console.log('');
console.log('        terms   estimate               error');
console.log('-------------   -------------------    ------------');

for (const row of rows) {
  const terms = String(row.terms).padStart(13);
  const estimate = row.estimate.toFixed(15).padEnd(19);
  const error = row.error.toExponential(6);
  console.log(`${terms}   ${estimate}    ${error}`);
}

console.log('');
console.log(`reference Math.PI = ${Math.PI}`);
