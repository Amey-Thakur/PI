/*
 * Name: ticker.js
 * Purpose: The stream of digits flowing through the hero.
 * Description: Reveals the decimals a few per tick so the number feels
 *   alive, then holds a sliding window so the line never overflows its
 *   fade mask. Purely decorative, so it respects reduced-motion settings
 *   by rendering a static line instead of animating.
 * Tech Stack: Plain JavaScript
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-18
 */

(function () {
  "use strict";

  var el = document.getElementById("ticker");
  var digits = window.PiDigits.first1000;
  var WINDOW = 96;

  function line(upto) {
    var start = Math.max(0, upto - WINDOW);
    var shown = digits.slice(start, upto);

    /* Keep the "3." only while the stream still shows the true beginning;
       a sliding middle section must not read as "3.81363...". */
    var lead = start === 0 ? "3." : "…";
    return '<span class="lead">' + lead + "</span>" + shown;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.innerHTML = line(WINDOW);
    return;
  }

  var at = 0;
  setInterval(function () {
    at = at >= digits.length ? 1 : at + 1;
    el.innerHTML = line(at);
  }, 90);
})();
