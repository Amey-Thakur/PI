/*
 * Name: search.js
 * Purpose: Find any digit string inside the decimals of pi.
 * Description: People want to see their birthday or lucky number turn up in
 *   pi, so this lab loads a chosen depth on demand, runs one indexOf, and
 *   shows the first hit in context. The heavy files load only when asked and
 *   are cached by PiDigits, so a repeat search is instant. A miss says so
 *   plainly rather than pretending, because long strings really do run out.
 * Usage: Loaded by docs/index.html; renders into #lab-search .lab-body.
 * Tech Stack: Plain JavaScript
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-18
 */

(function () {
  "use strict";

  var body = document.querySelector("#lab-search .lab-body");
  if (!body) return;

  var input = document.createElement("input");
  input.className = "field";
  input.type = "text";
  input.setAttribute("inputmode", "numeric");
  input.maxLength = 12;
  input.placeholder = "e.g. 1403 or 271828";
  input.setAttribute("aria-label", "digit string to find in pi");

  var depth = document.createElement("select");
  depth.className = "field";
  depth.setAttribute("aria-label", "how many decimals to search");
  depth.innerHTML =
    '<option value="100000">first 100 thousand</option>' +
    '<option value="1000000">first million</option>';

  var go = document.createElement("button");
  go.type = "button";
  go.className = "btn btn-primary";
  go.textContent = "Search";

  var controls = document.createElement("div");
  controls.className = "lab-controls";
  controls.appendChild(input);
  controls.appendChild(depth);
  controls.appendChild(go);

  var out = document.createElement("div");

  body.appendChild(controls);
  body.appendChild(out);

  /* Keep the box to digits only, so the search and any innerHTML stay safe. */
  input.addEventListener("input", function () {
    var clean = input.value.replace(/\D/g, "").slice(0, 12);
    if (clean !== input.value) input.value = clean;
  });

  function message(html) {
    out.innerHTML = '<div class="lab-stat">' + html + "</div>";
  }

  function commas(n) {
    return n.toLocaleString("en-US");
  }

  function found(query, digits, at) {
    PiQuest.award("hunter");

    var start = Math.max(0, at - 30);
    var end = Math.min(digits.length, at + query.length + 30);

    var before = digits.slice(start, at);
    var after = digits.slice(at + query.length, end);
    var lead = start > 0 ? "3.&hellip;" : "3.";
    var tail = end < digits.length ? "&hellip;" : "";

    out.innerHTML =
      '<div class="lab-stat">found at decimal position <b>' + commas(at + 1) + "</b></div>" +
      '<div class="search-hit">' + lead + before +
      "<mark>" + query + "</mark>" + after + tail + "</div>";
  }

  function missing(query, count) {
    message("<b>" + query + "</b> is not in the first " + commas(count) +
      " decimals. Long strings get rare fast: a 7 digit string has about a " +
      "63 percent chance of showing up in ten million digits, so plenty never " +
      "appear this early.");
  }

  var busy = false;

  function search() {
    if (busy) return;

    var query = input.value.replace(/\D/g, "");
    if (!query) {
      message("Type a digit string, then search.");
      return;
    }

    var count = parseInt(depth.value, 10);
    var label = go.textContent;

    busy = true;
    go.disabled = true;
    go.textContent = "searching";

    PiDigits.load(count).then(function (digits) {
      var at = digits.indexOf(query);
      if (at === -1) missing(query, count);
      else found(query, digits, at);
    }).catch(function () {
      message("Could not load that many digits. This lab needs the page " +
        "served over http, not opened straight from a file.");
    }).then(function () {
      busy = false;
      go.disabled = false;
      go.textContent = label;
    });
  }

  go.addEventListener("click", search);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") search();
  });
})();
