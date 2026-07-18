/*
 * Name: theme.js
 * Purpose: Dark and light mode, shared with every canvas on the page.
 * Description: Flips the data-theme attribute and remembers the choice.
 *   Canvas labs cannot use CSS variables directly, so this file also exposes
 *   PiTheme.color() to resolve them and fires "pi-theme-change" so every
 *   canvas repaints the moment the theme flips instead of waiting for input.
 * Tech Stack: Plain JavaScript
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-18
 */

(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var knob = toggle.querySelector(".knob");

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    knob.textContent = theme === "dark" ? "☼" : "☾";
    try { localStorage.setItem("pi-theme", theme); } catch (_) {}
    window.dispatchEvent(new Event("pi-theme-change"));
  }

  toggle.addEventListener("click", function () {
    apply(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  window.PiTheme = {
    /* Resolve a CSS variable like "--accent" to its current value. */
    color: function (name) {
      return getComputedStyle(root).getPropertyValue(name).trim();
    }
  };

  knob.textContent = root.getAttribute("data-theme") === "dark" ? "☼" : "☾";
})();
