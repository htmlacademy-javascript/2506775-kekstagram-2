const ALERT_SHOW_TIME = 5000;

const templateFragmentError = document.querySelector('#data-error').content;
const templateError = templateFragmentError.querySelector('.data-error');

const templateFragmentSuccess = document.querySelector('#success').content;
const templateSuccess = templateFragmentSuccess.querySelector('.success');


const keysToProcess = {
  Escape: 'Escape'
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

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, showSuccess, showAlert, debounce};
