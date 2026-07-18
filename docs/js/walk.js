/*
 * Name: walk.js
 * Purpose: The Digit Walk art lab.
 * Description: Turns the decimals of pi into a drawing. Each digit d picks a
 *   heading of d * 36 degrees, one of ten compass points, and the pen takes a
 *   single unit step that way. The finished path is scaled and centered to fit
 *   the canvas, then drawn in faint accent so the many self crossings pile up
 *   into darker knots. Nobody designed the shape; the number did.
 * Usage: Loaded by docs/index.html; renders into #lab-walk .lab-body.
 * Tech Stack: Plain JavaScript, Canvas 2D API
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-18
 */

(function () {
  "use strict";

  var body = document.querySelector("#lab-walk .lab-body");
  if (!body) return;

  function button(label, extra) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "btn" + (extra ? " " + extra : "");
    b.textContent = label;
    return b;
  }

  var canvas = document.createElement("canvas");
  canvas.className = "lab-canvas";

  var controls = document.createElement("div");
  controls.className = "lab-controls";

  var stat = document.createElement("div");
  stat.className = "lab-stat";

  var walk1k = button("Walk 1,000", "btn-primary");
  var walk5k = button("Walk 5,000");
  var reset = button("Reset");

  controls.appendChild(walk1k);
  controls.appendChild(walk5k);
  controls.appendChild(reset);
  controls.appendChild(stat);
  body.appendChild(canvas);
  body.appendChild(controls);

  var dim = PiCanvas.fit(canvas, 300);
  var ctx = dim.ctx;
  var MARGIN = 16, PER_FRAME = 80, STEP = Math.PI / 180 * 36;

  var points = [];   /* whole path in screen space, ready to stroke */
  var drawn = 0;     /* segments shown so far */
  var frame = 0;     /* animation handle, 0 when idle */
  var walked = 0;    /* steps summed across runs, for the badge */

  function say(html) { stat.innerHTML = html; }

  function clear() { ctx.clearRect(0, 0, dim.width, dim.height); }

  /* Walk once in unit steps, then fit that raw path into the canvas. */
  function build(digits) {
    var x = 0, y = 0;
    var raw = [{ x: 0, y: 0 }];
    var minX = 0, maxX = 0, minY = 0, maxY = 0;

    for (var i = 0; i < digits.length; i++) {
      var a = (digits.charCodeAt(i) - 48) * STEP;
      x += Math.cos(a);
      y += Math.sin(a);
      raw.push({ x: x, y: y });

      if (x < minX) minX = x; else if (x > maxX) maxX = x;
      if (y < minY) minY = y; else if (y > maxY) maxY = y;
    }

    var availW = dim.width - MARGIN * 2;
    var availH = dim.height - MARGIN * 2;
    var spanX = maxX - minX || 1;
    var spanY = maxY - minY || 1;
    var scale = Math.min(availW / spanX, availH / spanY);
    var offX = MARGIN + (availW - spanX * scale) / 2;
    var offY = MARGIN + (availH - spanY * scale) / 2;

    points = raw.map(function (p) {
      return { x: offX + (p.x - minX) * scale, y: offY + (p.y - minY) * scale };
    });
  }

  function dot(p, r, color) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  /* Redraw from scratch so a theme flip or a resumed frame both look right. */
  function render(upto) {
    clear();
    if (points.length < 2) return;

    var accent = PiTheme.color("--accent") || "#e6b357";
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = accent;

    /* One stroke per segment so overlapping steps compound into darker ink. */
    for (var i = 0; i < upto; i++) {
      ctx.beginPath();
      ctx.moveTo(points[i].x, points[i].y);
      ctx.lineTo(points[i + 1].x, points[i + 1].y);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    dot(points[0], 3, accent);
    dot(points[upto], 3.4, PiTheme.color("--text-1") || accent);
  }

  function stop() {
    if (frame) { cancelAnimationFrame(frame); frame = 0; }
  }

  function step(total) {
    drawn = Math.min(drawn + PER_FRAME, total);
    render(drawn);
    say("Walked <b>" + drawn.toLocaleString() + "</b> of " + total.toLocaleString() + " steps.");

    if (drawn < total) {
      frame = requestAnimationFrame(function () { step(total); });
      return;
    }

    frame = 0;
    walked += total;
    say("A path of <b>" + total.toLocaleString() + "</b> steps. Total distance walked: " +
      walked.toLocaleString() + ".");
    if (walked >= 5000) PiQuest.award("wanderer");
  }

  function run(total, digits) {
    stop();
    build(digits.slice(0, total));
    drawn = 0;
    step(total);
  }

  walk1k.addEventListener("click", function () {
    run(1000, PiDigits.first1000);
  });

  /* 5,000 needs the streamed file; failing that (opened as a file) say so. */
  walk5k.addEventListener("click", function () {
    say("Loading digits...");
    PiDigits.load(100000).then(function (digits) {
      run(5000, digits);
    }).catch(function () {
      stop();
      points = [];
      drawn = 0;
      clear();
      say("Could not load the digit file. Serve this page over http to walk 5,000. Walk 1,000 runs offline.");
    });
  });

  reset.addEventListener("click", function () {
    stop();
    points = [];
    drawn = 0;
    clear();
    say("Cleared. Total distance walked so far: <b>" + walked.toLocaleString() + "</b> steps.");
  });

  window.addEventListener("pi-theme-change", function () {
    if (points.length > 1) render(drawn);
  });

  say("Each digit points the pen a tenth of a turn. Pick a length and watch pi draw.");
})();
