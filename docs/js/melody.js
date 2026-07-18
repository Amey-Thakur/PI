/*
 * Name: melody.js
 * Purpose: Play the decimals of pi as a running tune.
 * Description: Each digit 0 to 9 picks a rung on an A minor pentatonic ladder,
 *   so the notes always sit in key while the order never repeats. The
 *   AudioContext is built on the first click because browsers block audio that
 *   starts without a user gesture. One short plucked note fires every 300ms
 *   until you stop it or the thousand digits run out.
 * Usage: Loaded by docs/index.html; renders into #lab-melody .lab-body.
 * Tech Stack: Plain JavaScript
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-18
 */

(function () {
  "use strict";

  var body = document.querySelector("#lab-melody .lab-body");
  if (!body) return;

  /* One rung per digit: A minor pentatonic across two octaves, in Hz. */
  var LADDER = [220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.26, 783.99];

  var STEP_MS = 300;
  var DIGITS = PiDigits.first1000;
  var Ctor = window.AudioContext || window.webkitAudioContext;

  var button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn-primary";
  button.textContent = "Play the melody";

  var controls = document.createElement("div");
  controls.className = "lab-controls";
  controls.appendChild(button);

  var trail = document.createElement("div");
  trail.className = "lab-stat";
  trail.textContent = "Press play to hear the first decimals of pi as a tune.";

  var count = document.createElement("div");
  count.className = "lab-stat";
  count.innerHTML = "Played <b>0</b> of 1000";

  body.appendChild(controls);
  body.appendChild(trail);
  body.appendChild(count);

  var ctx = null;
  var timer = null;
  var pos = 0;      /* next digit to sound */
  var played = 0;   /* notes sounded this run */

  /* Two sine voices share one envelope: the detuned voice only adds shimmer,
     so their sub-gains sum to 1 and the peak stays at the envelope's 0.18. */
  function playNote(digit, when) {
    var freq = LADDER[digit];

    var env = ctx.createGain();
    env.connect(ctx.destination);
    env.gain.setValueAtTime(0.0001, when);
    env.gain.linearRampToValueAtTime(0.18, when + 0.015);
    env.gain.exponentialRampToValueAtTime(0.0001, when + 0.28);

    voice(freq, 0, 0.7, env, when);
    voice(freq, 6, 0.3, env, when);
  }

  function voice(freq, detune, level, env, when) {
    var g = ctx.createGain();
    g.gain.value = level;
    g.connect(env);

    var osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.detune.value = detune;
    osc.connect(g);

    osc.start(when);
    osc.stop(when + 0.3);
  }

  function updateReadout(current) {
    var start = Math.max(0, current - 11);
    var parts = [];

    for (var i = start; i <= current; i++) {
      var ch = DIGITS.charAt(i);
      parts.push(i === current ? "<b>[" + ch + "]</b>" : ch);
    }

    trail.innerHTML = parts.join(" ");
    count.innerHTML = "Played <b>" + played + "</b> of 1000";
  }

  function tick() {
    if (pos >= DIGITS.length) { stop(); return; }

    playNote(DIGITS.charCodeAt(pos) - 48, ctx.currentTime + 0.02);
    played += 1;
    updateReadout(pos);

    if (played >= 32) PiQuest.award("composer");
    pos += 1;
  }

  function start() {
    if (!ctx) {
      try { ctx = new Ctor(); }
      catch (_) {
        trail.textContent = "This browser has no Web Audio, so the tune cannot play here.";
        return;
      }
    }
    if (ctx.state === "suspended") ctx.resume();

    /* A finished run rewinds so the button plays again instead of doing nothing. */
    if (pos >= DIGITS.length) { pos = 0; played = 0; }

    button.textContent = "Stop";
    tick();
    timer = setInterval(tick, STEP_MS);
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
    button.textContent = "Play the melody";
    if (ctx && ctx.state === "running") ctx.suspend();
  }

  button.addEventListener("click", function () {
    if (timer) stop();
    else start();
  });
})();
