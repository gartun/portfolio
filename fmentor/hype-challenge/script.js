window.onload = function() {

  var initiallyActives = [ document.getElementById("testimonials-btn"), document.querySelector(".user-card") ];
  var tabLinks = document.querySelectorAll(".tab-link");
  var users = convertToArray(document.getElementsByClassName("user-card"));
  var leftArr = document.getElementsByClassName("left-arr")[0];
  var rightArr = document.getElementsByClassName("right-arr")[0];
  var activeUserIndex = 0;
  var isSpaceOrEnter = function(e) { return e.keyCode === 32 || e.keyCode === 13 };

  initiallyActives.forEach(function(elem) { elem.classList.add("active") });

  tabLinks.forEach(function(tabLink) {
    tabLink.addEventListener("click", function(e) {
      shouldUpdate(e, this);
    });

    tabLink.addEventListener("keypress", function(e) {
      if(isSpaceOrEnter(e)) shouldUpdate(e, this);
    })
  })

  function shouldUpdate(e, tabLink) {
    var classes = convertToArray(tabLink.classList);

    if(classes.indexOf("active") > -1) return;

    deactivateTabs();

    activateTab(tabLink);
  }

  users.forEach(function(user) {
    user.addEventListener("click", function() { activateUser(this) })
  });

  leftArr.addEventListener("click", function() {
    decrementActiveUserIndex();
    updateText();
  });

  leftArr.addEventListener("keypress", function(e) {
    if(isSpaceOrEnter(e)) {
      decrementActiveUserIndex();
      updateText();
    }
  });

  rightArr.addEventListener("click", function() {
    incrementActiveUserIndex();
    updateText();
  });

  rightArr.addEventListener("keypress", function(e) {
    if(isSpaceOrEnter(e)) {
      IncrementActiveUserIndex();
      updateText();
    }
  });

  function activateUser(user) {
    var activeUser = document.querySelector(".user-card.active");

    if(user == activeUser) return;

    deactivateAllUsers();
    var classes = convertToArray(user.classList);

    if(classes.indexOf("user-card") > -1) user.classList.add("active");

    activeUserIndex = users.indexOf(user);
    updateText();
  }

  function deactivateAllUsers() {

    for(var _i = 0; _i < users.length; _i++) {
      var curUser = users[_i];
      var classes = convertToArray(curUser.classList);

      if(classes.indexOf("active") > -1) {
        curUser.classList.remove("active");
        break;
      }
    } 
  }

  function activateTab(tab) {
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    document.getElementById(tab.getAttribute("aria-controls")).setAttribute("aria-hidden", "false");
  }

  function deactivateTabs() {
    tabLinks.forEach(function(tabLink) {
      tabLink.classList.remove("active");
      tabLink.setAttribute("aria-selected", "false");

      document.getElementById(tabLink.getAttribute("aria-controls")).setAttribute("aria-hidden", "true");
    })
  }

  function incrementActiveUserIndex() {
    activeUserIndex++;

    if(activeUserIndex >= users.length ) {
      activeUserIndex = 0;
      return;
    };
  }

  function decrementActiveUserIndex() {

    if(activeUserIndex <= 0) {
      activeUserIndex = users.length - 1;
      return;
    }
    
    activeUserIndex--;
  }

  function convertToArray(arrLikeObj) {
    return Array.prototype.slice.call(arrLikeObj);
  }

  function updateText() {
    var firstTxt = document.querySelectorAll(".first-txt");

    var diff = 0 - activeUserIndex;

    hideAllTexts();

    firstTxt.forEach(function(txt) {
      txt.style.marginLeft = diff === 0 ? "0" : diff + "00%"; 

      console.log(diff);

      switch(diff) {
        case 0:
          txt.setAttribute("aria-hidden", "false");
          break;
        case -1:
          txt.nextElementSibling.setAttribute("aria-hidden", "false");
          break;
        case -2: 
          txt.nextElementSibling.nextElementSibling.setAttribute("aria-hidden", "false");
          break;
      }
    });

    activateUser(users[activeUserIndex]);
  }

  function hideAllTexts() {
    var texts = document.querySelectorAll("section > p");

    texts.forEach(function(text) {
      text.setAttribute("aria-hidden", "true");
    })
  }
}
