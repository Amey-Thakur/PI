/*
 * Name: montecarlo.js
 * Purpose: Estimate pi by throwing random darts at a circle in a square.
 * Description: A dart that lands inside the inscribed circle happens with
 *   probability pi/4, so four times the inside fraction closes in on pi as
 *   darts pile up. Points are stored as unit coordinates and repainted from
 *   that store, which keeps the cloud correct through theme flips and resizes
 *   while the exact running totals live in plain counters.
 * Usage: Loaded by docs/index.html after canvas.js, quest.js, and theme.js.
 * Tech Stack: Plain JavaScript
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-18
 */

(function () {
  "use strict";

  var body = document.querySelector("#lab-montecarlo .lab-body");
  if (!body) return;

  var CAP = 30000;      /* cloud kept for repaint; totals below stay exact */
  var CHUNK = 600;      /* darts drawn per animation frame */

  var canvas = document.createElement("canvas");
  canvas.className = "lab-canvas";
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "Random darts landing on a square with an inscribed circle");
  body.appendChild(canvas);

  var controls = document.createElement("div");
  controls.className = "lab-controls";
  var stats = document.createElement("div");
  stats.className = "lab-controls";
  body.appendChild(controls);
  body.appendChild(stats);

  function button(label, onClick) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "btn";
    b.textContent = label;
    b.addEventListener("click", onClick);
    controls.appendChild(b);
    return b;
  }

  function stat() {
    var s = document.createElement("div");
    s.className = "lab-stat";
    stats.appendChild(s);
    return s;
  }

  var thrownStat = stat();
  var estStat = stat();
  var errStat = stat();

  var view = null, palette = null, points = [];
  var thrown = 0, inside = 0, queued = 0, running = false;

  function readPalette() {
    palette = {
      border: PiTheme.color("--border"),
      ring: PiTheme.color("--text-3"),
      inside: PiTheme.color("--accent"),
      outside: PiTheme.color("--text-3")
    };
  }

  /* Largest centered square that fits, with the circle inscribed in it. */
  function geom() {
    var side = Math.min(view.width, view.height) - 20;
    return {
      x0: (view.width - side) / 2,
      y0: (view.height - side) / 2,
      side: side
    };
  }

  function drawBoard() {
    var ctx = view.ctx;
    var g = geom();
    ctx.clearRect(0, 0, view.width, view.height);

    ctx.lineWidth = 1;
    ctx.strokeStyle = palette.border;
    ctx.strokeRect(g.x0 + 0.5, g.y0 + 0.5, g.side, g.side);

    ctx.strokeStyle = palette.ring;
    ctx.beginPath();
    ctx.arc(g.x0 + g.side / 2, g.y0 + g.side / 2, g.side / 2, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawDot(g, ctx, p) {
    var px = g.x0 + p.u * g.side;
    var py = g.y0 + p.v * g.side;
    ctx.fillStyle = p.hit ? palette.inside : palette.outside;
    ctx.fillRect(px - 0.7, py - 0.7, 1.4, 1.4);
  }

  /* Refit clears and rescales the canvas, so this handles resize too. */
  function repaintAll() {
    view = PiCanvas.fit(canvas, 260);
    readPalette();
    drawBoard();

    var g = geom();
    var ctx = view.ctx;
    for (var i = 0; i < points.length; i++) drawDot(g, ctx, points[i]);
  }

  function updateStats() {
    thrownStat.innerHTML = "Darts thrown <b>" + thrown.toLocaleString() + "</b>";

    if (thrown === 0) {
      estStat.innerHTML = "Estimate <b>π ≈ ?</b>";
      errStat.innerHTML = "Absolute error <b>?</b>";
      return;
    }

    var est = 4 * inside / thrown;
    estStat.innerHTML = "Estimate <b>π ≈ " + est.toFixed(6) + "</b>";
    errStat.innerHTML = "Absolute error <b>" + Math.abs(est - Math.PI).toFixed(6) + "</b>";
  }

  function pump() {
    if (queued <= 0) { running = false; return; }

    var n = Math.min(CHUNK, queued);
    queued -= n;

    var g = geom();
    var ctx = view.ctx;
    for (var i = 0; i < n; i++) {
      var u = Math.random();
      var v = Math.random();
      var dx = u - 0.5;
      var dy = v - 0.5;
      var hit = dx * dx + dy * dy <= 0.25;
      var p = { u: u, v: v, hit: hit };

      thrown += 1;
      if (hit) inside += 1;
      points.push(p);
      drawDot(g, ctx, p);
    }

    if (points.length > CAP) points.splice(0, points.length - CAP);

    updateStats();
    if (thrown >= 10000) PiQuest.award("estimator");
    requestAnimationFrame(pump);
  }

  function throwDarts(n) {
    queued += n;
    if (!running) { running = true; requestAnimationFrame(pump); }
  }

  function reset() {
    queued = 0;
    thrown = 0;
    inside = 0;
    points = [];
    repaintAll();
    updateStats();
  }

  button("Throw 1,000", function () { throwDarts(1000); });
  button("Throw 10,000", function () { throwDarts(10000); });
  button("Reset", reset);

  window.addEventListener("pi-theme-change", repaintAll);

  repaintAll();
  updateStats();
})();
