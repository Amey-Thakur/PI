/*
 * Name: frequency.js
 * Purpose: The Digit Census lab: how evenly the digits of pi are spread.
 * Description: Reads a small precomputed table of digit counts at four depths
 *   and draws ten bars plus a chi-square read on fairness. The counts are
 *   precomputed because tallying up to a million digits in the browser on
 *   every depth switch would stutter, and the answer never changes. The ten
 *   bars are reused between depths so the CSS width transition animates them.
 * Usage: Loaded by docs/index.html; renders into #lab-frequency .lab-body.
 * Tech Stack: Plain JavaScript
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-18
 */

(function () {
  "use strict";

  var body = document.querySelector("#lab-frequency .lab-body");
  if (!body) return;

  var controls = document.createElement("div");
  controls.className = "lab-controls";

  var select = document.createElement("select");
  select.className = "field";
  select.setAttribute("aria-label", "how many decimals to census");
  controls.appendChild(select);

  var rows = document.createElement("div");
  rows.className = "freq-rows";

  var stat = document.createElement("div");
  stat.className = "lab-stat";

  var bars = [];
  var nums = [];

  /* A miss here is almost always a file:// open, where fetch cannot reach
     the JSON. Say that plainly instead of leaving an empty panel behind. */
  function fail() {
    body.innerHTML = "";
    var note = document.createElement("div");
    note.className = "lab-stat";
    note.textContent = "The digit census needs the site served over http, " +
      "not opened straight from a file. Start a local server, then reload.";
    body.appendChild(note);
  }

  function buildRows() {
    for (var d = 0; d <= 9; d++) {
      var row = document.createElement("div");
      row.className = "freq-row";

      var digit = document.createElement("div");
      digit.className = "d";
      digit.textContent = d;

      var track = document.createElement("div");
      track.className = "bar-track";
      var bar = document.createElement("div");
      bar.className = "bar";
      track.appendChild(bar);

      var n = document.createElement("div");
      n.className = "n";

      row.appendChild(digit);
      row.appendChild(track);
      row.appendChild(n);
      rows.appendChild(row);

      bars.push(bar);
      nums.push(n);
    }
  }

  function start(data) {
    var depths = data.depths || {};
    var threshold = data.chi_square_95_percent || 16.919;

    var keys = Object.keys(depths).map(Number).sort(function (a, b) {
      return a - b;
    });
    if (!keys.length) { fail(); return; }

    keys.forEach(function (k) {
      var opt = document.createElement("option");
      opt.value = String(k);
      opt.textContent = "first " + k.toLocaleString("en-US");
      select.appendChild(opt);
    });

    body.appendChild(controls);
    body.appendChild(rows);
    body.appendChild(stat);
    buildRows();

    function render() {
      var block = depths[select.value];
      if (!block) return;
      var counts = block.counts || {};

      var total = 0;
      var max = 0;
      var d;
      for (d = 0; d <= 9; d++) {
        var c = counts[d] || 0;
        total += c;
        if (c > max) max = c;
      }

      /* The tallest count reads full width and the rest scale against it, so
         what the eye lands on is the gap between digits, not their raw size. */
      for (d = 0; d <= 9; d++) {
        var v = counts[d] || 0;
        bars[d].style.width = (max ? (v / max * 100) : 0) + "%";
        nums[d].textContent = (total ? (v / total * 100) : 0).toFixed(2) + "%";
      }

      var chi = block.chi_square;
      var fair = chi < threshold;
      stat.innerHTML = "&#967;&#178; = <b>" + chi + "</b> against the " +
        threshold + " threshold at 95 percent: " +
        (fair ? "consistent with a fair ten-way split"
              : "a wobble worth watching, more digits smooth it out") + ".";
    }

    /* Commit the width:0 starting point once so the very first set of bars
       grows in rather than appearing already full. Later depth switches
       transition from whatever is on screen. */
    void rows.offsetWidth;

    select.addEventListener("change", render);
    render();
  }

  fetch("data/digit-frequency.json")
    .then(function (res) {
      if (!res.ok) throw new Error("census fetch failed: " + res.status);
      return res.json();
    })
    .then(start)
    .catch(fail);
})();
