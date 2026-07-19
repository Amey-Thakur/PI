/*
 * Name: spiral.js
 * Purpose: Wind thousands of pi digits into a colored Archimedean spiral.
 * Description: Each decimal becomes one dot placed along a spiral and tinted
 *   by its value from a fixed ten-color palette. If the digits carried any
 *   pattern it would surface as bands or streaks; the point of the picture is
 *   that none do. Larger views pull in the streamed file, and drawing happens
 *   in per-frame chunks so the page never locks up.
 * Usage: Loaded by docs/index.html; renders into #lab-spiral .lab-body.
 * Tech Stack: Plain JavaScript
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-18
 */

(function () {
  "use strict";

  var lab = document.getElementById("lab-spiral");
  if (!lab) return;
  var body = lab.querySelector(".lab-body");

  /* Fixed by design so a digit keeps its color when the theme flips. */
  var PALETTE = [
    "#e6af56", "#d97b6c", "#6fbf8f", "#5aa7d1", "#a58ad6",
    "#d1a3c4", "#c9c46a", "#7fc7bd", "#c98a5a", "#8a93c9"
  ];

  var STEP = 0.35;          // radians between consecutive dots
  var DOT = 2.2;            // dot diameter in CSS pixels
  var CHUNK = 600;          // dots drawn per animation frame
  var TWO_PI = Math.PI * 2;
  var LEGEND = "each dot is one decimal, colored 0 to 9";

  body.innerHTML =
    '<div class="lab-controls">' +
      '<button type="button" class="btn" data-count="1000">1,000</button>' +
      '<button type="button" class="btn" data-count="5000">5,000</button>' +
      '<button type="button" class="btn" data-count="10000">10,000</button>' +
    "</div>" +
    '<canvas class="lab-canvas" role="img" aria-label="Digits of pi wound into a colored spiral"></canvas>' +
    '<div class="lab-stat">' + LEGEND + "</div>";

  var canvas = body.querySelector("canvas");
  var stat = body.querySelector(".lab-stat");
  var buttons = body.querySelectorAll(".btn");

  var current = "";         // digit string currently drawn, for repaints
  var raf = 0;

  function mark(count) {
    buttons.forEach(function (b) {
      b.classList.toggle("btn-primary", Number(b.dataset.count) === count);
    });
  }

  function clearCanvas() {
    var view = PiCanvas.fit(canvas, 320);
    view.ctx.fillStyle = PiTheme.color("--bg");
    view.ctx.fillRect(0, 0, view.width, view.height);
  }

  /* Lay the whole string down as a spiral, spreading the work over frames. */
  function paint(str) {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    current = str;

    var view = PiCanvas.fit(canvas, 320);
    var ctx = view.ctx;
    var cx = view.width / 2;
    var cy = view.height / 2;

    ctx.fillStyle = PiTheme.color("--bg");
    ctx.fillRect(0, 0, view.width, view.height);

    var n = str.length;
    var span = n > 1 ? n - 1 : 1;
    var maxR = Math.min(view.width, view.height) / 2 - DOT;

    var i = 0;
    function frame() {
      var end = Math.min(i + CHUNK, n);
      for (; i < end; i++) {
        var a = i * STEP;
        var r = maxR * i / span;
        ctx.fillStyle = PALETTE[str.charCodeAt(i) - 48];
        ctx.beginPath();
        ctx.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), DOT / 2, 0, TWO_PI);
        ctx.fill();
      }
      raf = i < n ? requestAnimationFrame(frame) : 0;
    }
    frame();
  }

  function show(count) {
    mark(count);

    /* The first thousand ship inline, so this view works offline. */
    if (count <= 1000) {
      stat.textContent = LEGEND;
      paint(PiDigits.first1000.slice(0, count));
      return;
    }

    stat.textContent = "loading digits...";
    PiDigits.load(100000).then(function (all) {
      stat.textContent = LEGEND;
      paint(all.slice(0, count));
    }).catch(function () {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      current = "";
      clearCanvas();
      stat.textContent = "Digits past 1,000 need a web server. The 1,000 view works anywhere.";
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { show(Number(b.dataset.count)); });
  });

  /* Theme flip changes only the backdrop; the digit colors are fixed. */
  window.addEventListener("pi-theme-change", function () {
    if (current) paint(current);
    else clearCanvas();
  });

  show(1000);
})();
