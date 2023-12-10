const day = document.querySelector('#day');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const form = document.querySelector('.form');

const errorMsgs = document.querySelectorAll('.error-msg');
const results = document.querySelectorAll('.result-number');

const showError = function (index, msg) {
  console.log(errorMsgs[index]);
  errorMsgs[index].textContent = msg;
  errorMsgs[index].previousElementSibling.style.borderColor = 'red';
  errorMsgs[index].previousElementSibling.previousElementSibling.style.color =
    'red';
};

const resetErrors = () => {
  errorMsgs.forEach((msg) => {
    msg.previousElementSibling.style.borderColor = 'hsl(0, 0%, 86%)';
    msg.previousElementSibling.previousElementSibling.style.color =
      'hsl(0, 1%, 44%)';
    msg.textContent = '';
  });
};

const handleValidation = (
  value,
  minValue,
  maxValue,
  errMsgIndex,
  requiredMsg
) => {
  if (value < minValue || value > maxValue) {
    showError(errMsgIndex, `Must be ${requiredMsg}`);
    return true;
  }
  return false;
};

const calcAge = (dob) => {
  const curDate = Date.now();
  let ageInMilliseconds = curDate - dob;

  const years = Math.floor(ageInMilliseconds / (365.44 * 24 * 60 * 60 * 1000));
  ageInMilliseconds -= years * (365.25 * 24 * 60 * 60 * 1000);

  const months = Math.floor(ageInMilliseconds / (30 * 24 * 60 * 60 * 1000));
  ageInMilliseconds -= months * (30 * 24 * 60 * 60 * 1000);

  const days = Math.floor(ageInMilliseconds / (24 * 60 * 60 * 1000));

  return { years, months, days };
};

const handle = function (e) {
  const btn = e.target.closest('.btn-box');
  if (!btn) return;

  let dayValue = Number(day.value);
  let monthValue = Number(month.value);
  let yearValue = Number(year.value);
  resetErrors();

  // CHECKING FOR EMPTY FIELDS
  if (dayValue === 0) {
    showError(0, 'This field is required!');
    return;
  }
  if (monthValue === 0) {
    showError(1, 'This field is required!');
    return;
  }
  if (yearValue === 0) {
    showError(2, 'This field is required!');
    return;
  }

  if (handleValidation(dayValue, 0, 31, 0, 'valid day')) return;

  if (handleValidation(monthValue, 1, 12, 1, 'valid month')) return;

  if (handleValidation(yearValue, 1900, 2023, 2, 'valid year')) return;

  const dob = new Date(yearValue, monthValue - 1, dayValue);
  const { years, months, days } = calcAge(dob);

  results[0].textContent = years;
  results[1].textContent = months;
  results[2].textContent = days;
};

form.addEventListener('click', handle);
