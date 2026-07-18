/*
 * Name: quest.js
 * Purpose: The badge system that turns the page into a game.
 * Description: Eight badges, each awarded by one lab. Progress lives in
 *   localStorage under a single key so it survives visits without any
 *   account or server, which is the only kind of gamification a static page
 *   should have. Labs call PiQuest.award() and never touch storage or the
 *   badge DOM themselves.
 * Tech Stack: Plain JavaScript
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-18
 */

(function () {
  "use strict";

  var BADGES = [
    { id: "memory10", glyph: "\u{1F9E0}", name: "First Digits", how: "Recall 10 decimals in the Digit Trainer" },
    { id: "memory25", glyph: "\u{1F3C5}", name: "Memory of Pi", how: "Recall 25 decimals in the Digit Trainer" },
    { id: "hunter", glyph: "\u{1F50D}", name: "Digit Hunter", how: "Find any number inside the first million decimals" },
    { id: "estimator", glyph: "\u{1F3AF}", name: "Estimator", how: "Throw 10,000 Monte Carlo darts" },
    { id: "dropper", glyph: "\u{1FAA1}", name: "Needle Dropper", how: "Drop 1,000 needles on Buffon's floor" },
    { id: "wanderer", glyph: "\u{1F9ED}", name: "Wanderer", how: "Walk 5,000 digit steps" },
    { id: "composer", glyph: "\u{1F3B5}", name: "Composer", how: "Listen to 32 notes of the pi melody" },
    { id: "historian", glyph: "\u{1F4DC}", name: "Historian", how: "Answer all five history questions correctly" }
  ];

  var KEY = "pi-quest";
  var strip = document.getElementById("badge-strip");
  var counter = document.getElementById("quest-count");
  var toast = document.getElementById("toast");
  var toastTimer = null;

  function earned() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (_) { return {}; }
  }

  function render() {
    var have = earned();
    var count = 0;

    strip.innerHTML = "";
    BADGES.forEach(function (badge) {
      var got = !!have[badge.id];
      if (got) count += 1;

      var el = document.createElement("div");
      el.className = "badge" + (got ? " earned" : "");
      el.innerHTML =
        '<div class="glyph">' + badge.glyph + "</div>" +
        "<div><b>" + badge.name + "</b><span>" + badge.how + "</span></div>";
      strip.appendChild(el);
    });

    counter.textContent = count === BADGES.length
      ? "8 of 8. The quest is complete. You know π better than most of humanity."
      : count + " of " + BADGES.length + " badges earned.";
  }

  function announce(badge) {
    toast.textContent = badge.glyph + " Badge earned: " + badge.name;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3400);
  }

  window.PiQuest = {
    /* Award once; repeat calls after the first are silently ignored. */
    award: function (id) {
      var have = earned();
      if (have[id]) return;

      var badge = BADGES.find(function (b) { return b.id === id; });
      if (!badge) return;

      have[id] = Date.now();
      try { localStorage.setItem(KEY, JSON.stringify(have)); } catch (_) {}
      render();
      announce(badge);
    },

    has: function (id) { return !!earned()[id]; }
  };

  render();
})();
