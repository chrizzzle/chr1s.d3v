const ranges = document.querySelectorAll(".form__range");
const scoreField = document.querySelector(".form__score-number");
const radios = document.querySelectorAll(".form__radio");
const maxPriceField = document.getElementById("max-price");
const idealSpaceField = document.getElementById("ideal-space-house");
const idealSpacePropertyField = document.getElementById("ideal-space-property");
const priceField = document.getElementById("price");
const spaceField = document.getElementById("space-house");
const spacePropertyField = document.getElementById("space-property");
let resultField, totalMax;

const calcScore = () => {
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
    grading = getGrading(ranges[i]);
    value = parseInt(ranges[i].value, 10);
    total += grading;
    relativeScore = inverse ? 1 - value / max : value / max;
    relativeScore *= grading;
    relativeScoreSum += relativeScore;
  }

  return relativeScoreSum / total;
};
const getColorClass = (value, max, inverse, grading) => {
  const result = inverse ? 1 - value / max : value / max;
  const thresholds = {
    1: {
      green: 1/2,
      orange: 1/4
    },
    2: {
      green: 2/3,
      orange: 1/3
    },
    3: {
      green: 3/4,
      orange: 1/2
    }
  }

  
  if (result > thresholds[grading].green) {
    return "form__result--green";
  }
  if (result > thresholds[grading].orange) {
    return "form__result--orange";
  }
  return "form__result--red";
};

const getGrading = (range) => {
  return parseInt(range
    .closest(".form__group")
    .querySelector(".form__radio:checked").value, 10);
};

const setScore = () => {
  const score = calcScore();
  const colorClass = getColorClass(score, 1, false, 2);
  scoreField.innerHTML = Math.ceil(calcScore() * 100) + "/ 100";
  scoreField.classList.add(colorClass);
};
const setResult = (range) => {
  resultField = range.closest(".form__group").querySelector(".form__result");
  resultField.innerHTML = range.value;

  resultField.classList.remove("form__result--red");
  resultField.classList.remove("form__result--green");
  resultField.classList.remove("form__result--orange");

  const grading = getGrading(range);

  const colorClass = getColorClass(
    parseInt(range.value),
    parseInt(range.getAttribute("max")),
    !!range.dataset.inverse,
    grading
  );

  resultField.classList.add(colorClass);
};

const onRangeInput = (range) => () => {
  setResult(range);
  setScore();
};

const setMax = (field, value) => {
  field.setAttribute("max", value)
};

for (let i = 0; i < ranges.length; i++) {
  ranges[i].addEventListener("input", onRangeInput(ranges[i]));
  setResult(ranges[i]);
  totalMax += parseInt(ranges[i].getAttribute("max"), 10);
}

for (let i = 0; i < radios.length; i++) {
  let range;
  range = radios[i].closest(".form__group").querySelector(".form__range");
  radios[i].addEventListener("input", onRangeInput(range));
}

maxPriceField.addEventListener("change", () => {
  setMax(priceField, maxPriceField.value);
});

idealSpaceField.addEventListener("change", () => {
  setMax(spaceField, idealSpaceField.value);
});

idealSpacePropertyField.addEventListener("change", () => {
  setMax(spacePropertyField, idealSpacePropertyField.value)
});

setScore();
