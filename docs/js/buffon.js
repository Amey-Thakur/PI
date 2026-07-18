/*
 * Name: buffon.js
 * Purpose: The Buffon's Needle lab: estimate pi by dropping needles on lines.
 * Description: The needle length equals the line spacing, so the crossing
 *   probability is exactly 2/pi and the estimate is 2 * drops / crossings.
 *   Drops animate in small bursts per frame. Only the first 4000 needles are
 *   stored for repainting; the totals behind the estimate stay exact.
 * Usage: Loaded by index.html as a plain script tag, no build step
 * Tech Stack: Plain JavaScript
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-18
 */

(function () {
  "use strict";

  var body = document.querySelector("#lab-buffon .lab-body");
  if (!body) return;

  /* Needle length equals the spacing t: that choice cancels the length
     ratio in Buffon's formula and leaves P(cross) = 2/pi exactly. */
  var SPACING = 52;
  var MAX_KEPT = 4000;
  var CHUNK = 50;

  body.innerHTML =
    '<canvas class="lab-canvas" role="img" aria-label="Needles scattered across a lined floor"></canvas>' +
    '<div class="lab-controls">' +
      '<button type="button" class="btn btn-primary" data-drop="100">Drop 100</button>' +
      '<button type="button" class="btn" data-drop="1000">Drop 1,000</button>' +
      '<button type="button" class="btn" data-reset>Reset</button>' +
    '</div>' +
    '<div class="lab-controls">' +
      '<div class="lab-stat">needles <b>0</b></div>' +
      '<div class="lab-stat">crossings <b>0</b></div>' +
      '<div class="lab-stat">&#x3C0; &#8776; <b>waiting for a crossing</b></div>' +
    '</div>';

  var canvas = body.querySelector("canvas");
  var view = PiCanvas.fit(canvas, 260);
  var stats = body.querySelectorAll(".lab-stat b");

  var needles = [];
  var drops = 0;
  var crossings = 0;
  var pendingDrops = 0;
  var running = false;

  function drawNeedle(n, accent, muted) {
    var ctx = view.ctx;
    ctx.strokeStyle = n.crosses ? accent : muted;
    ctx.beginPath();
    ctx.moveTo(n.x1, n.y1);
    ctx.lineTo(n.x2, n.y2);
    ctx.stroke();
  }

  function dropOne() {
    var angle = Math.random() * Math.PI;
    var cx = Math.random() * view.width;
    var cy = Math.random() * view.height;
    var dx = Math.cos(angle) * SPACING / 2;
    var dy = Math.sin(angle) * SPACING / 2;

    /* The floor lines sit at multiples of SPACING, so a needle crosses one
       exactly when its endpoints land in different strips of the floor. */
    var n = {
      x1: cx - dx, y1: cy - dy,
      x2: cx + dx, y2: cy + dy,
      crosses: Math.floor((cy - dy) / SPACING) !== Math.floor((cy + dy) / SPACING)
    };

    drops += 1;
    if (n.crosses) crossings += 1;
    if (needles.length < MAX_KEPT) needles.push(n);
    return n;
  }

  function updateStats() {
    stats[0].textContent = drops.toLocaleString("en-US");
    stats[1].textContent = crossings.toLocaleString("en-US");
    stats[2].textContent = crossings > 0
      ? (2 * drops / crossings).toFixed(5)
      : "waiting for a crossing";
  }

  function repaint() {
    var ctx = view.ctx;
    var accent = PiTheme.color("--accent");
    var muted = PiTheme.color("--text-3");

    ctx.clearRect(0, 0, view.width, view.height);
    ctx.lineWidth = 1;

    ctx.strokeStyle = PiTheme.color("--border");
    for (var y = 0; y <= view.height; y += SPACING) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(view.width, y);
      ctx.stroke();
    }

    needles.forEach(function (n) { drawNeedle(n, accent, muted); });
  }

  function step() {
    var burst = Math.min(CHUNK, pendingDrops);
    pendingDrops -= burst;

    /* New needles are painted incrementally so a frame costs a burst, not a
       full repaint. The full repaint runs only on reset and theme change. */
    var accent = PiTheme.color("--accent");
    var muted = PiTheme.color("--text-3");
    view.ctx.lineWidth = 1;
    for (var i = 0; i < burst; i += 1) drawNeedle(dropOne(), accent, muted);

    updateStats();
    if (drops >= 1000) PiQuest.award("dropper");

    if (pendingDrops > 0) requestAnimationFrame(step);
    else running = false;
  }

  function queueDrops(count) {
    pendingDrops += count;
    if (!running) {
      running = true;
      requestAnimationFrame(step);
    }
  }

  function reset() {
    drops = 0;
    crossings = 0;
    pendingDrops = 0;
    needles.length = 0;
    repaint();
    updateStats();
  }

  body.querySelectorAll("[data-drop]").forEach(function (button) {
    button.addEventListener("click", function () {
      queueDrops(parseInt(button.getAttribute("data-drop"), 10));
    });
  });

  body.querySelector("[data-reset]").addEventListener("click", reset);

  window.addEventListener("pi-theme-change", repaint);

  repaint();
})();
