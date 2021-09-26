window.onload = function () {

  var tabLinks = [].slice.call(document.querySelectorAll("button[role='tab']"));
  var isSpaceOrEnter = function (e) {
    return e.keyCode === 32 || e.keyCode === 13;
  };

  tabLinks.forEach(function (tb) {
    tb.addEventListener("click", function (e) {
      shouldUpdate(e, this);
    });

    tb.addEventListener("keypress", function (e) {
      if (isSpaceOrEnter(e.keyCode)) shouldUpdate(e, this);
    });
  });

  function shouldUpdate(eve, tb) {
    var isSelected = tb.getAttribute("aria-selected");

    if (isSelected === "true") return;

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

    var otherPanels = [].slice
      .call(document.querySelectorAll("[role='tabpanel']"))
      .filter(function (pnl) {
        return pnl !== panel
      });

    otherPanels.forEach(function(pnl) {
      pnl.setAttribute("aria-hidden", "true");
    });

    panel.setAttribute("aria-hidden", "false");
  }

  var fYear = document.getElementById("footer-year"),
      curYear = new Date().getFullYear();
  fYear.innerText = 2020 === curYear ? "2020" : "2020-" + curYear;
};
