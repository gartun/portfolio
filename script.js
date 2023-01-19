window.onload = function () {
  /* UTIL FUNCS starts */
  function convertToArrayFrom(selector) {
    return [].slice.call(document.querySelectorAll(selector));
  }

  var isEitherSpaceOrEnter = function (e) {
    return e.keyCode === 32 || e.keyCode === 13;
  };
  /* UTIL FUNCS end */

  var tabLinks = convertToArrayFrom("button[role='tab']");

  tabLinks.forEach(function (tb) {
    tb.addEventListener("click", function () {
      shouldUpdate(this);
    });

    tb.addEventListener("keypress", function () {
      if (isEitherSpaceOrEnter(e.keyCode)) shouldUpdate(this);
    });
  });

  function shouldUpdate(tb) {
    var isSelected = tb.getAttribute("aria-selected");
    // if already selected then no need to update ui.
    if (isSelected === "true") return;

    // before activating the selected tab, deactivate all.
    deactivateTabs();

    activateTab(tb);
  }

  function deactivateTabs() {
    tabLinks.forEach(function (tb) {
      tb.setAttribute("aria-selected", "false");
    });
  }

  function activateTab(tb) {
    tb.setAttribute("aria-selected", "true");

    showPanel(tb.getAttribute("aria-controls"));
  }

  function showPanel(id) {
    var panel = document.getElementById(id);

    var otherPanels = convertToArrayFrom("[role='tabpanel']")
      .filter(function (pnl) {
        return pnl !== panel
      });

    otherPanels.forEach(function (pnl) {
      pnl.setAttribute("aria-hidden", "true");
    });

    panel.setAttribute("aria-hidden", "false");
  }

  var fYear = document.getElementById("footer-year"),
    curYear = new Date().getFullYear();
  fYear.innerText = 2020 === curYear ? "2020" : "2020-" + curYear;
};
