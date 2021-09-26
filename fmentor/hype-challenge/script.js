window.onload = function () {
  var initiallyActives = [
    document.getElementById("testimonials-btn"),
    document.querySelector(".user-card"),
  ];
  var tabLinks = document.querySelectorAll(".tab-link");
  var users = convertToArray(document.getElementsByClassName("user-card"));
  var leftArr = document.getElementsByClassName("left-arr")[0];
  var rightArr = document.getElementsByClassName("right-arr")[0];
  var activeUserIndex = 0;
  var isSpaceOrEnter = function (e) {
    return e.keyCode === 32 || e.keyCode === 13;
  };

  // Sayfanın ilk yüklenişinde aktif duruma gelmesi gereken bileşenlere active sınıfı atıyoruz
  initiallyActives.forEach(function (elem) {
    elem.classList.add("active");
  });

  // tableri kontrol eden butonları(testimonials ve feedbacks) tek tek gezerek
  // 'click' ve 'keypress' eventleri ekliyoruz.
  tabLinks.forEach(function (tabLink) {
    tabLink.addEventListener("click", function (e) {
      shouldUpdate(e, this);
    });

    tabLink.addEventListener("keypress", function (e) {
      // shouldUpdate fonksiyonunu yalnızca basılan tuşun 'space' veya 'enter' olması
      // durumunda çağırıyouz.
      if (isSpaceOrEnter(e)) shouldUpdate(e, this);
    });
  });

  function shouldUpdate(e, tabLink) {
    var classes = tabLink.classList;

    // halihazırda 'active' sınıfı mevcutsa tablinki aktif hâle getirmemize gerek yok demektir.
    // return ile fonksiyondan çıkıyoruz.
    if (classes.contains("active")) return;

    // üzerine tıklanan tablinki aktif hâle getirmeden önce bütün tableri inaktif
    // duruma getiriyoruz. Böylece sürecin sonunda tek bir aktif tablinkimiz olacak.
    deactivateTabs();

    activateTab(tabLink);
  }

  users.forEach(function (user) {
    user.addEventListener("click", function () {
      activateUser(this);
    });
  });

  leftArr.addEventListener("click", function () {
    decrementActiveUserIndex();
    updateText();
  });

  leftArr.addEventListener("keypress", function (e) {
    if (isSpaceOrEnter(e)) {
      decrementActiveUserIndex();
      updateText();
    }
  });

  rightArr.addEventListener("click", function () {
    incrementActiveUserIndex();
    updateText();
  });

  rightArr.addEventListener("keypress", function (e) {
    if (isSpaceOrEnter(e)) {
      incrementActiveUserIndex();
      updateText();
    }
  });

  function activateUser(user) {
    var activeUser = document.querySelector(".user-card.active");

    if (user == activeUser) return;

    deactivateAllUsers();
    var classes = user.classList;

    if (classes.contains("user-card")) classes.add("active");

    activeUserIndex = users.indexOf(user);
    updateText();
  }

  function deactivateAllUsers() {
    for (var _i = 0; _i < users.length; _i++) {
      var curUser = users[_i];
      var classes = curUser.classList;

      if (classes.contains("active")) {
        curUser.classList.remove("active");
        break;
      }
    }
  }

  function activateTab(tab) {
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    document
      .getElementById(tab.getAttribute("aria-controls"))
      .setAttribute("aria-hidden", "false");
  }

  function deactivateTabs() {
    tabLinks.forEach(function (tabLink) {
      tabLink.classList.remove("active");
      tabLink.setAttribute("aria-selected", "false");

      document
        .getElementById(tabLink.getAttribute("aria-controls"))
        .setAttribute("aria-hidden", "true");
    });
  }

  function incrementActiveUserIndex() {
    activeUserIndex++;

    if (activeUserIndex >= users.length) {
      activeUserIndex = 0;
      return;
    }
  }

  function decrementActiveUserIndex() {
    if (activeUserIndex <= 0) {
      activeUserIndex = users.length - 1;
      return;
    }

    activeUserIndex--;
  }

  function convertToArray(arrLikeObj) {
    return [].slice.call(arrLikeObj);
  }

  function updateText() {
    var firstTxt = document.querySelectorAll(".first-txt");

    var diff = 0 - activeUserIndex;

    hideAllTexts();

    firstTxt.forEach(function (txt) {
      txt.style.marginLeft = diff === 0 ? "0" : diff + "00%";

      switch (diff) {
        case 0:
          txt.setAttribute("aria-hidden", "false");
          break;
        case -1:
          txt.nextElementSibling.setAttribute("aria-hidden", "false");
          break;
        case -2:
          txt.nextElementSibling.nextElementSibling.setAttribute(
            "aria-hidden",
            "false"
          );
          break;
      }
    });

    activateUser(users[activeUserIndex]);
  }

  function hideAllTexts() {
    var texts = document.querySelectorAll("section > p");

    texts.forEach(function (text) {
      text.setAttribute("aria-hidden", "true");
    });
  }
};
