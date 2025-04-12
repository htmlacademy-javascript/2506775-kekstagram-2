const ALERT_SHOW_TIME = 5000;

const templateFragmentError = document.querySelector('#data-error').content;
const templateError = templateFragmentError.querySelector('.data-error');

const templateFragmentSuccess = document.querySelector('#success').content;
const templateSuccess = templateFragmentSuccess.querySelector('.success');


const keysToProcess = {
  Escape: 'Escape'
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


const getId = () => {
  let currentId = 0;
  return () => ++currentId;
};

const isEscapeKey = (evt) => evt.key === keysToProcess.Escape;

const showSuccess = () => {
  const successMessage = templateSuccess.cloneNode(true);
  document.body.append(successMessage);
  setTimeout(() => {
    successMessage.remove();
  }, ALERT_SHOW_TIME);
};
const showAlert = () => {
  const errorMessage = templateError.cloneNode(true);
  document.body.append(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInteger, getId, isEscapeKey, showSuccess, showAlert};
