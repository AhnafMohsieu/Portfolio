/* Portfolio filtering. Progressive enhancement only: without this file every
   work row stays visible and the chips are inert. */
(function () {
  "use strict";

  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip[data-cat]"));
  var rows = Array.prototype.slice.call(document.querySelectorAll(".work__row[data-cat]"));
  if (!chips.length || !rows.length) return;

  var cats = chips.map(function (chip) { return chip.dataset.cat; });

  function apply(cat) {
    chips.forEach(function (chip) {
      chip.setAttribute("aria-pressed", String(chip.dataset.cat === cat));
    });
    rows.forEach(function (row) {
      row.classList.toggle("is-hidden", cat !== "all" && row.dataset.cat !== cat);
    });
    var hash = cat === "all" ? "#work" : "#work-" + cat;
    if (location.hash !== hash) {
      history.replaceState(null, "", hash);
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () { apply(chip.dataset.cat); });
  });

  var fromHash = (location.hash || "").replace(/^#work-/, "");
  apply(cats.indexOf(fromHash) > -1 ? fromHash : "all");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
