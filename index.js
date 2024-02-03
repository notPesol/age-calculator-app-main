const inputLabels = {
  day: document.getElementById("dayLabel"),
  month: document.getElementById("monthLabel"),
  year: document.getElementById("yearLabel"),
};

const inputElements = {
  year: document.getElementById("year"),
  month: document.getElementById("month"),
  day: document.getElementById("day"),
};

const spanElements = {
  day: document.getElementById("daySpan"),
  month: document.getElementById("monthSpan"),
  year: document.getElementById("yearSpan"),
};

const outputElements = {
  year: document.getElementById("rYear"),
  month: document.getElementById("rMonth"),
  day: document.getElementById("rDay"),
};

const button = document.getElementById("btn");

const nowDate = new Date();
nowDate.setDate(nowDate.getDate() + 1);

const years = nowDate.getFullYear();
const months = nowDate.getMonth();
const date = nowDate.getDate();

let inputValues = {
  year: null,
  month: null,
  day: null,
};

button.addEventListener("click", () => {
  clearState();

  let validateResults = Object.keys(inputElements).map((key) => {
    return validateInput(key);
  });

  if (validateResults.every((bool) => bool)) {
    calculateAge();
  }
});

const calculateAge = () => {
  const { year, month, day } = inputValues;
  const date = new Date(year, month - 1, day);
  const timeDate = date.getTime();
  const timeNow = nowDate.getTime();
  const result = timeNow - timeDate;

  const ageDate = new Date(result);
  const years = ageDate.getFullYear() - 1970;
  const months = ageDate.getMonth();
  const days = ageDate.getDate() - 1;

  outputElements.year.innerText = years;
  outputElements.month.innerText = months;
  outputElements.day.innerText = days;
};

const clearState = () => {
  for (const key in inputLabels) {
    inputLabels[key].classList.remove("label-error");
  }

  for (const key in inputElements) {
    inputElements[key].classList.remove("input-error");
  }

  for (const key in spanElements) {
    spanElements[key].classList.remove("span-error");
  }

  for (const key in inputValues) {
    inputValues[key] = null;
  }

  for (const key in outputElements) {
    outputElements[key].innerText = "--";
  }
};

const validateInput = (type) => {
  const element = inputElements[type];
  const value = element.value;
  const isNumber = !isNaN(+value);

  if (type === "year" && (value > years || !isNumber || !value)) {
    element.classList.add("input-error");
    inputLabels[type].classList.add("label-error");
    spanElements[type].classList.add("span-error");

    if (!value) {
      spanElements[type].innerText = "This field is required";
    } else {
      spanElements[type].innerText = "Must be a valid year";
    }

    return false;
  }

  if (type === "month" && (value > 12 || !isNumber || !value)) {
    element.classList.add("input-error");
    inputLabels[type].classList.add("label-error");
    spanElements[type].classList.add("span-error");

    if (!value) {
      spanElements[type].innerText = "This field is required";
    } else {
      spanElements[type].innerText = "Must be a valid month";
    }

    return false;
  }

  if (
    type === "day" &&
    (value > getMonthDays(inputValues?.year, inputValues?.month) ||
      !isNumber ||
      !value)
  ) {
    element.classList.add("input-error");
    inputLabels[type].classList.add("label-error");
    spanElements[type].classList.add("span-error");

    if (!value) {
      spanElements[type].innerText = "This field is required";
    } else {
      spanElements[type].innerText = "Must be a valid day";
    }

    return false;
  }

  inputValues[type] = +value;

  return true;
};

const getMonthDays = (year = years, month = 0) => {
  return new Date(year, month, 0).getDate();
};
