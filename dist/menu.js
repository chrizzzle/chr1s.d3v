"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var menuButtons = _toConsumableArray(document.querySelectorAll(".menu__list-item-button"));

var backButton = document.querySelector(".slide__back");
var toggleButton = document.querySelector(".slide__toggle");
var toggleButtonIcon = document.querySelector(".slide__toggle-icon");
var offCanvas = document.querySelector(".slide");
var rootMenuLevel = document.querySelector(".menu__list--root");
var title = document.querySelector(".slide__title");
var level = 0;

var handleButtonClick = function handleButtonClick() {
  var childMenu = event.currentTarget.parentElement.closest(".menu__list-item").querySelector(".menu__list");

  _toConsumableArray(document.querySelectorAll(".menu__list--shown")).forEach(function (element) {
    element.classList.remove("menu__list--shown");
  });

  level++;
  childMenu.classList.remove("menu__list--hidden");
  childMenu.classList.add("menu__list--shown");
  backButton.classList.remove("slide__back--hidden");
  rootMenuLevel.style.transform = "translate(" + level * -100 + "%, 0)";
};

var handleBackClick = function handleBackClick() {
  var currentMenu = document.querySelector(".menu__list--shown");
  var parentMenu = currentMenu.parentElement.closest(".menu__list");

  var hideAfterTransition = function hideAfterTransition() {
    if (level === 0) {
      backButton.classList.add("slide__back--hidden");
    }

    currentMenu.classList.add("menu__list--hidden");
    currentMenu.classList.remove("menu__list--shown");
    rootMenuLevel.removeEventListener("transitionend", hideAfterTransition);
  };

  level = level > 0 ? level - 1 : level;
  rootMenuLevel.addEventListener("transitionend", hideAfterTransition);
  parentMenu.classList.remove("menu__list--hidden");
  parentMenu.classList.add("menu__list--shown");
  rootMenuLevel.style.transform = "translate(" + level * -100 + "%, 0)";
};

var handleToggleClick = function handleToggleClick() {
  if (offCanvas.classList.contains("slide--open")) {
    offCanvas.classList.remove("slide--open");
    toggleButtonIcon.innerHTML = "menu";
    return;
  }

  offCanvas.classList.add("slide--open");
  toggleButtonIcon.innerHTML = "menu_open";
};

menuButtons.forEach(function (menuButton) {
  menuButton.addEventListener("click", handleButtonClick);
});
backButton.addEventListener("click", handleBackClick);
toggleButton.addEventListener("click", handleToggleClick);
//# sourceMappingURL=menu.js.map
