/*
 * Name: reveal.js
 * Purpose: Ease sections into view as the reader reaches them.
 * Description: Tags the page's cards and headings with a reveal class and
 *   flips them visible the moment they enter the viewport. The hidden state
 *   only exists when the reader welcomes motion (the stylesheet gates it
 *   behind prefers-reduced-motion), so nothing is ever lost without it.
 *   Runs last so every lab has already built its DOM.
 * Usage: Loaded by docs/index.html after all lab modules.
 * Tech Stack: Plain JavaScript
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-18
 */

(function () {
  "use strict";

  if (!("IntersectionObserver" in window)) return;

  var targets = document.querySelectorAll(
    ".section-head, .lab, .stat, .formula, .badge, .quiz-box"
  );

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    /* Fire a little before the element truly arrives, so the ease-in is
       finishing right as the eye lands on it. */
    { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
  );

  targets.forEach(function (el) {
    el.classList.add("reveal");
    observer.observe(el);
  });
})();
