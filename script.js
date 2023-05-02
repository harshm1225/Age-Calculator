const dayWarningSpanEl = document.querySelector("#day-warning");
const monthWarningSpanEl = document.querySelector("#month-warning");
const yearWarningSpanEl = document.querySelector("#year-warning");
const submitButton = document.querySelector("#check-btn");
const dateInputEl = document.querySelector("#date-input");
const monthInputEl = document.querySelector("#month-input");
const yearInputEl = document.querySelector("#year-input");
const allInputBoxes = document.querySelectorAll(".all-inputs");
const passedYearsTextEL = document.querySelector("#output_year");
const passedMonthsTextEL = document.querySelector("#output_month");
const passedDaysTextEL = document.querySelector("#output_day");

function showEmptyInputWarning(element) {
  const elementCategory = element.previousElementSibling;
  const elementInput = element;
  const elementWarningText = element.nextElementSibling;
  elementWarningText.innerHTML = "This field is required";
  elementCategory.style.color = "red";
  elementInput.style.borderColor = "red";
  elementWarningText.style.color = "red";
}
function removeEmptyInputWarning(element) {
  const elementCategory = element.previousElementSibling;
  const elementInput = element;
  const elementWarningText = element.nextElementSibling;
  elementWarningText.innerHTML = "";
  elementCategory.style.color = "#716F6F";
  elementInput.style.borderColor = "#DCDCDC";
  elementWarningText.style.color = "";
}
function validateInput() {
  let enteredDate = dateInputEl.value;
  if (enteredDate.startsWith(0)) {
    enteredDate = +enteredDate.substring(1);
  }
  let enteredMonth = monthInputEl.value;
  if (enteredMonth.startsWith(0)) {
    enteredMonth = +enteredMonth.substring(1);
  }
  const enteredYear = +yearInputEl.value;
  if (!(enteredDate > 0 && enteredDate <= 31)) {
    dateInputEl.previousElementSibling.style.color = "red";
    dateInputEl.nextElementSibling.innerHTML = "Must be a valid day";
    dateInputEl.style.borderColor = "red";
    dateInputEl.nextElementSibling.style.color = "red";
  }
  if (!(enteredMonth > 0 && enteredMonth <= 12)) {
    monthInputEl.previousElementSibling.style.color = "red";
    monthInputEl.nextElementSibling.innerHTML = "Must be a valid month";
    monthInputEl.style.borderColor = "red";
    monthInputEl.nextElementSibling.style.color = "red";
  }
  if (
    !(
      enteredYear > 0 &&
      enteredYear < new Date().getFullYear() &&
      enteredYear > 1000
    )
  ) {
    yearInputEl.previousElementSibling.style.color = "red";
    yearInputEl.nextElementSibling.innerHTML = "Must be in a past";
    yearInputEl.style.borderColor = "red";
    yearInputEl.nextElementSibling.style.color = "red";
  }
  const birthDate = new Date(`${enteredYear}-${enteredMonth}-${enteredDate}`);
  const timeDiff = Math.abs(new Date().getTime() - birthDate.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;
  passedDaysTextEL.innerText = daysDiff;
  passedMonthsTextEL.innerText = Math.ceil(daysDiff / 30.44);
  passedYearsTextEL.innerText = Math.floor(daysDiff / 365.25);
}

function isAnyInputEmpty() {
  if (!dateInputEl.value) {
    showEmptyInputWarning(dateInputEl);
  }
  if (!monthInputEl.value) {
    showEmptyInputWarning(monthInputEl);
  }
  if (!yearInputEl.value) {
    showEmptyInputWarning(yearInputEl);
    return;
  }
  validateInput();
}
function onTyping(event) {
  removeEmptyInputWarning(event.target);
}

submitButton.addEventListener("click", isAnyInputEmpty);
for (const btn of allInputBoxes) {
  btn.addEventListener("input", onTyping);
}
window.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    isAnyInputEmpty();
  }
});
