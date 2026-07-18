/*
 * Name: trainer.js
 * Purpose: The Digit Trainer lab: recite pi from memory, one digit at a time.
 * Description: Runs against the first thousand decimals. The player types digits
 *   on the keypad or the number row; correct digits build a green trail, wrong
 *   ones cost a life, and three misses end the run. Streak, lives, and a stored
 *   best keep score, and reaching 10 or 25 correct earns a quest badge.
 * Usage: Loaded by index.html after digits.js and quest.js; fills #lab-trainer.
 * Tech Stack: Plain JavaScript
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-18
 */

(function () {
  "use strict";

  var body = document.querySelector("#lab-trainer .lab-body");
  if (!body) return;

  var digits = window.PiDigits.first1000;
  var BEST_KEY = "pi-trainer-best";
  var LIVES = 3;
  var CAP = 1000;

  var pos = 0;
  var streak = 0;
  var lives = LIVES;
  var running = false;

  body.innerHTML =
    '<div class="lab-controls">' +
      '<button type="button" class="btn btn-primary" id="tr-start">Start</button>' +
      '<button type="button" class="btn" id="tr-study">Study</button>' +
      '<span class="lab-stat">Streak <b id="tr-streak">0</b></span>' +
      '<span class="lab-stat">Lives <b id="tr-lives">3</b></span>' +
      '<span class="lab-stat">Best <b id="tr-best">0</b></span>' +
    '</div>' +
    '<div class="study-grid" id="tr-grid" hidden></div>' +
    '<div class="trainer-trail" id="tr-trail"></div>' +
    '<p class="lab-note" id="tr-verdict"></p>' +
    '<div class="keypad" id="tr-keypad"></div>';

  var startBtn = body.querySelector("#tr-start");
  var studyBtn = body.querySelector("#tr-study");
  var grid = body.querySelector("#tr-grid");
  var trail = body.querySelector("#tr-trail");
  var verdict = body.querySelector("#tr-verdict");
  var keypad = body.querySelector("#tr-keypad");
  var elStreak = body.querySelector("#tr-streak");
  var elLives = body.querySelector("#tr-lives");
  var elBest = body.querySelector("#tr-best");

  function readBest() {
    try { return parseInt(localStorage.getItem(BEST_KEY), 10) || 0; }
    catch (_) { return 0; }
  }

  elBest.textContent = readBest();

  // Build the ten-key pad once; each key feeds the same handler as the keyboard.
  for (var d = 0; d < 10; d++) {
    var key = document.createElement("button");
    key.type = "button";
    key.className = "btn";
    key.textContent = String(d);
    key.setAttribute("data-d", String(d));
    keypad.appendChild(key);
  }

  keypad.addEventListener("click", function (e) {
    var key = e.target.closest(".btn");
    if (key) enter(key.getAttribute("data-d"));
  });

  function refresh() {
    elStreak.textContent = streak;
    elLives.textContent = lives;
  }

  function span(cls, text) {
    var s = document.createElement("span");
    s.className = cls;
    s.textContent = text;
    trail.appendChild(s);
  }

  // Study view: the first hundred decimals in bites of five, each bite
  // labeled with where it starts. Chunking is how every record holder
  // actually memorizes; the grid teaches the technique by its shape.
  function buildStudy() {
    for (var i = 0; i < 100; i += 5) {
      var cell = document.createElement("span");
      var at = document.createElement("b");
      at.textContent = String(i + 1) + " ";
      cell.appendChild(at);
      cell.appendChild(document.createTextNode(digits.slice(i, i + 5)));
      grid.appendChild(cell);
    }
  }

  function setStudy(open) {
    grid.hidden = !open;
    studyBtn.textContent = open ? "Hide" : "Study";
  }

  buildStudy();
  studyBtn.addEventListener("click", function () {
    if (running) return;
    setStudy(grid.hidden);
  });

  function start() {
    pos = 0;
    streak = 0;
    lives = LIVES;
    running = true;
    trail.innerHTML = "";
    verdict.textContent = "";
    startBtn.disabled = true;
    setStudy(false);
    refresh();
  }

  function enter(typed) {
    if (!running) return;

    // A correct digit paints the trail green and advances one place along pi.
    if (typed === digits.charAt(pos)) {
      span("hit", typed);
      pos += 1;
      streak += 1;

      if (streak === 10) window.PiQuest.award("memory10");
      if (streak === 25) window.PiQuest.award("memory25");

      refresh();
      if (pos >= CAP) finish(true);
    } else {
      span("miss", typed);
      lives -= 1;
      refresh();
      if (lives <= 0) finish(false);
    }
  }

  function verdictFor(n) {
    if (n >= 25) return "Impressive: " + n + " decimals recalled. That is memory-athlete territory.";
    if (n >= 10) return n + " decimals from memory. Most people stall at three. Keep going.";
    return "You reached " + n + ". The first ten are the hardest, so try again.";
  }

  function finish(won) {
    running = false;
    startBtn.disabled = false;
    startBtn.textContent = "Try again";

    if (streak > readBest()) {
      try { localStorage.setItem(BEST_KEY, String(streak)); } catch (_) {}
      elBest.textContent = streak;
    }

    if (won) {
      verdict.textContent = "All 1000 decimals, no misses. You walked the whole trail.";
      return;
    }

    // The digits after the stumble double as a hint for the next attempt.
    verdict.textContent = verdictFor(streak) + " Next three were " + digits.slice(pos, pos + 3) + ".";
  }

  // Physical number keys play too, but only during a run and never while the
  // focus sits in a text field elsewhere on the page.
  window.addEventListener("keydown", function (e) {
    if (!running) return;

    var tag = e.target && e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (e.key >= "0" && e.key <= "9") {
      enter(e.key);
      e.preventDefault();
    }
  });

  startBtn.addEventListener("click", start);
})();
