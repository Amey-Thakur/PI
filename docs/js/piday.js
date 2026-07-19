/*
 * Name: piday.js
 * Purpose: Count down to the next pi holiday.
 * Description: Pi has two days a year: March 14 (3.14) and July 22 (22/7,
 *   Pi Approximation Day). Whichever comes next gets a quiet line in the
 *   hero, and on the day itself the line celebrates instead of counting.
 *   A holiday is the one part of pi that changes daily, so it earns the
 *   only date lookup on the page.
 * Usage: Loaded by docs/index.html; fills #pi-day in the hero.
 * Tech Stack: Plain JavaScript
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-18
 */

(function () {
  "use strict";

  var el = document.getElementById("pi-day");
  if (!el) return;

  var DAY_MS = 86400000;
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  /* Next occurrence of month/day, counting today as zero days away. */
  function next(month, day) {
    var when = new Date(today.getFullYear(), month, day);
    if (when < today) when = new Date(today.getFullYear() + 1, month, day);
    return when;
  }

  var candidates = [
    { name: "π Day", date: next(2, 14) },
    { name: "Pi Approximation Day (22/7)", date: next(6, 22) }
  ].sort(function (a, b) { return a.date - b.date; });

  var soonest = candidates[0];
  var days = Math.round((soonest.date - today) / DAY_MS);

  if (days === 0) {
    el.innerHTML = "Happy <b>" + soonest.name + "</b>. You picked the right day to be here.";
  } else {
    el.innerHTML = "Next pi holiday: " + soonest.name + ", <b>" + days + "</b> " +
      (days === 1 ? "day" : "days") + " from today.";
  }
})();
