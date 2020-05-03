const ranges = document.querySelectorAll(".form__range");
const scoreField = document.querySelector(".form__score");
const radios = document.querySelectorAll(".form__radio");
const maxPriceField = document.getElementById("max-price");
const idealSpaceField = document.getElementById("ideal-space-house");
const idealSpacePropertyField = document.getElementById("ideal-space-property");
const priceField = document.getElementById("price");
const spaceField = document.getElementById("space-house");
const spacePropertyField = document.getElementById("space-property");
let resultField, totalMax;

const calcScore = function () {
  let relativeScoreSum = 0,
    total = 0,
    max,
    value,
    inverse,
    relativeScore,
    grading;
  for (let i = 0; i < ranges.length; i++) {
    max = parseInt(ranges[i].getAttribute("max"), 10);
    inverse = !!ranges[i].dataset.inverse;
    grading = ranges[i]
      .closest(".form__group")
      .querySelector(".form__radio:checked").value;
    grading = parseInt(grading, 10);
    value = parseInt(ranges[i].value, 10);
    total += grading;
    relativeScore = inverse ? 1 - (value / max) : value / max;
    relativeScore *= grading;
    relativeScoreSum += relativeScore;
  }

  return relativeScoreSum / total;
};
const setResult = function (range) {
  return function () {
    resultField = range.closest(".form__group").querySelector(".form__result");
    resultField.innerHTML = range.value;
    scoreField.innerHTML = Math.round(calcScore() * 100) + "/ 100";
  };
};

for (let i = 0; i < ranges.length; i++) {
  ranges[i].addEventListener("input", setResult(ranges[i]));
  setResult(ranges[i])();
  totalMax += parseInt(ranges[i].getAttribute("max"), 10);
}

for (let i = 0; i < radios.length; i++) {
  let range;
  radios[i].addEventListener("input", function () {
    scoreField.innerHTML = Math.round(calcScore() * 100) + "/ 100";
    range = radios[i].closest(".form__group").querySelector(".form__range");
    setResult(range)();
  });
}

maxPriceField.addEventListener("change", function () {
 priceField.setAttribute("max", maxPriceField.value);  
});

idealSpaceField.addEventListener("change", function () {
  spaceField.setAttribute("max", idealSpaceField.value);
});

idealSpacePropertyField.addEventListener("change", function () {
  spacePropertyField.setAttribute("max", idealSpacePropertyField.value);
});