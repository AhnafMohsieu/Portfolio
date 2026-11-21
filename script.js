/* Portfolio filtering. Progressive enhancement only: without this file every
   work row stays visible and the chips are inert. */
(function () {
  "use strict";

  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip[data-cat]"));
  var rows = Array.prototype.slice.call(document.querySelectorAll(".work__row[data-cat]"));
  if (!chips.length || !rows.length) return;

  var cats = chips.map(function (chip) { return chip.dataset.cat; });

  function apply(cat, updateHash) {
    chips.forEach(function (chip) {
      chip.setAttribute("aria-pressed", String(chip.dataset.cat === cat));
    });
    rows.forEach(function (row) {
      row.classList.toggle("is-hidden", cat !== "all" && row.dataset.cat !== cat);
    });
    if (updateHash) {
      var hash = cat === "all" ? "#work" : "#work-" + cat;
      if (location.hash !== hash) {
        history.replaceState(null, "", hash);
      }
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () { apply(chip.dataset.cat, true); });
  });

  var hashMatch = (location.hash || "");
  if (hashMatch.indexOf("#work") === 0) {
    var fromHash = hashMatch.replace(/^#work-/, "").replace(/^#work$/, "all");
    apply(cats.indexOf(fromHash) > -1 ? fromHash : "all", false);
  } else {
    apply("all", false);
  }

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
