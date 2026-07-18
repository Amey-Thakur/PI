/*
 * Name: timeline.js
 * Purpose: Render the pi history timeline and a five round dating quiz.
 * Description: Reads the curated milestones file, lays each entry on the
 *   vertical timeline oldest first, then quizzes the reader on when five modern
 *   events happened. Quiz milestones are drawn only from the post 1500 era so
 *   the dates are guessable, and every fresh run reshuffles questions and decoys.
 * Usage: Loaded by docs/index.html; fills #timeline-track and #timeline-quiz.
 * Tech Stack: Plain JavaScript
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-18
 */

(function () {
  "use strict";

  var track = document.getElementById("timeline-track");
  var quiz = document.getElementById("timeline-quiz");
  if (!track || !quiz) return;

  var ROUNDS = 5;

  /* Fisher-Yates on a copy, so the source list stays untouched. */
  function shuffled(list) {
    var out = list.slice();
    for (var i = out.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = out[i]; out[i] = out[j]; out[j] = t;
    }
    return out;
  }

  function note(text) {
    quiz.innerHTML = "";
    var p = document.createElement("p");
    p.textContent = text;
    quiz.appendChild(p);
  }

  function drawTimeline(items, eras) {
    var nextEra = 0;

    items.forEach(function (m) {
      /* Era headers ride the same list so the connecting line never breaks;
         each one opens the chapter its milestones belong to. */
      while (nextEra < eras.length && m.sort >= eras[nextEra].start) {
        var head = document.createElement("li");
        head.className = "era";

        var title = document.createElement("h3");
        title.textContent = eras[nextEra].title;
        var lede = document.createElement("p");
        lede.className = "lede";
        lede.textContent = eras[nextEra].lede;

        head.appendChild(title);
        head.appendChild(lede);
        track.appendChild(head);
        nextEra += 1;
      }

      var li = document.createElement("li");

      var when = document.createElement("div");
      when.className = "when";
      when.textContent = m.when;
      var what = document.createElement("p");
      what.className = "what";
      what.textContent = m.what;
      var who = document.createElement("div");
      who.className = "who";
      who.textContent = m.who;

      li.appendChild(when);
      li.appendChild(what);
      li.appendChild(who);
      track.appendChild(li);
    });
  }

  function buildQuiz(eligible) {
    var score = 0;
    var round = 0;
    var questions = shuffled(eligible).slice(0, ROUNDS);

    quiz.innerHTML = "";

    var title = document.createElement("h3");
    title.textContent = "The Historian's Test";

    var intro = document.createElement("p");
    intro.textContent = "Five milestones, four possible dates each. Match every " +
      "event to the year it really happened.";

    var stage = document.createElement("div");

    quiz.appendChild(title);
    quiz.appendChild(intro);
    quiz.appendChild(stage);

    /* Answer plus three distinct decoy dates from other post 1500 entries. */
    function options(answer) {
      var seen = {};
      var pool = [];
      eligible.forEach(function (m) {
        if (m.when === answer || seen[m.when]) return;
        seen[m.when] = true;
        pool.push(m.when);
      });
      return shuffled([answer].concat(shuffled(pool).slice(0, 3)));
    }

    function renderRound() {
      var m = questions[round];
      stage.innerHTML = "";

      var q = document.createElement("p");
      q.className = "quiz-q";
      var lead = document.createElement("strong");
      lead.textContent = "When did this happen? ";
      q.appendChild(lead);
      q.appendChild(document.createTextNode(m.what));

      var opts = document.createElement("div");
      opts.className = "quiz-opts";

      var buttons = [];
      var answered = false;

      options(m.when).forEach(function (when) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn";
        btn.textContent = when;
        btn.addEventListener("click", function () {
          if (answered) return;
          answered = true;

          buttons.forEach(function (b) {
            if (b.textContent === m.when) b.classList.add("right");
            b.disabled = true;
          });
          if (when === m.when) score += 1;
          else btn.classList.add("wrong");

          setTimeout(function () {
            round += 1;
            if (round < ROUNDS) renderRound();
            else renderFinal();
          }, 1000);
        });
        buttons.push(btn);
        opts.appendChild(btn);
      });

      stage.appendChild(q);
      stage.appendChild(opts);
    }

    function renderFinal() {
      if (score === ROUNDS) PiQuest.award("historian");
      stage.innerHTML = "";

      var result = document.createElement("p");
      result.className = "quiz-q";
      result.textContent = score === ROUNDS
        ? "Perfect run: " + score + " of " + ROUNDS + ". The Historian badge is yours."
        : "You scored " + score + " of " + ROUNDS + ". Only a clean sweep earns the Historian badge.";

      var again = document.createElement("button");
      again.type = "button";
      again.className = "btn";
      again.textContent = "Try again";
      again.addEventListener("click", function () { buildQuiz(eligible); });

      stage.appendChild(result);
      stage.appendChild(again);
    }

    renderRound();
  }

  fetch("data/milestones.json")
    .then(function (res) {
      if (!res.ok) throw new Error("milestones fetch failed: " + res.status);
      return res.json();
    })
    .then(function (data) {
      var items = (data.milestones || []).slice().sort(function (a, b) {
        return a.sort - b.sort;
      });
      if (!items.length) { note("The timeline data is empty."); return; }

      var eras = (data.eras || []).slice().sort(function (a, b) {
        return a.start - b.start;
      });
      drawTimeline(items, eras);

      var eligible = items.filter(function (m) { return m.sort > 1500; });
      if (eligible.length >= ROUNDS) buildQuiz(eligible);
      else note("Not enough modern milestones to build the quiz.");
    })
    .catch(function () {
      note("The history timeline needs the page served over http. Open it from " +
        "a local server or the live site and it will fill in.");
    });
})();
