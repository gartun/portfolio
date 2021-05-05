/*! grunt-project - v1.0.0 - 2021-01-05 */
"use strict";var main=document.querySelector("main"),introSec=document.querySelector(".intro-section"),proSec=document.querySelector(".projects-section"),contactSec=document.querySelector(".contact-section"),tabLinks=document.querySelectorAll("[data-tab]");function getHeight(t){return document.querySelector(t).scrollHeight}function showIt(t){switch(t.dataset.tab){case"who":proSec.classList.remove("show"),contactSec.classList.remove("show"),introSec.classList.add("show");break;case"projects":introSec.classList.remove("show"),contactSec.classList.remove("show"),proSec.classList.add("show");break;case"contact":proSec.classList.remove("show"),introSec.classList.remove("show"),contactSec.classList.add("show")}}function activateIt(t){tabLinks.forEach(function(t){t.classList.remove("active")}),t.classList.add("active")}Array.hasOwnProperty("from")||(Array.prototype.from=function(t){for(var e=[],o=0;o<t.length;o++)e.push(t[o]);return e}),"function"!=typeof NodeList.prototype.forEach&&(tabLinks=Array.prototype.from(tabLinks)),tabLinks.forEach(function(t){t.addEventListener("click",function(){activateIt(this),showIt(this)}),t.addEventListener("focus",function(){var e=this;window.onkeypress=function(t){if("Enter"===t.key)return activateIt(e),void showIt(e)}})}),window.onload=function(){var t=getHeight("header"),e=getHeight("footer"),e=window.innerHeight-t-e;main.style.height=e+"px"};window.onresize=function(){var t=getHeight("header"),e=getHeight("footer"),e=window.innerHeight-t-e;main.style.height=e+"px"};var fYear=document.getElementById("footer-year"),curYear=(new Date).getFullYear();fYear.innerText=2020===curYear?"2020":"2020-"+curYear;