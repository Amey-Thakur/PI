/*
 * Name: canvas.js
 * Purpose: One canvas setup used by every drawing lab.
 * Description: Canvases need their backing store scaled by devicePixelRatio
 *   or every line looks soft on modern screens. Doing that in each lab would
 *   repeat the same ten lines five times, so it lives here once. Returns the
 *   context plus the CSS-pixel size the lab should think in.
 * Tech Stack: Plain JavaScript
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-18
 */

(function () {
  "use strict";

  window.PiCanvas = {
    /* Size a canvas to its layout width at native sharpness. */
    fit: function (canvas, cssHeight) {
      var dpr = window.devicePixelRatio || 1;
      var cssWidth = canvas.clientWidth || canvas.parentElement.clientWidth;

      canvas.style.height = cssHeight + "px";
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);

      var ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx: ctx, width: cssWidth, height: cssHeight };
    }
  };
})();
