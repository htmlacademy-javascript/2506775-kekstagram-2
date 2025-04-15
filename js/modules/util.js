const ALERT_SHOW_TIME = 5000;

const templateFragmentError = document.querySelector('#data-error').content;
const templateError = templateFragmentError.querySelector('.data-error');

const templateFragmentSuccess = document.querySelector('#success').content;
const templateSuccess = templateFragmentSuccess.querySelector('.success');


const keysToProcess = {
  Escape: 'Escape'
};


const isEscapeKey = (evt) => evt.key === keysToProcess.Escape;

let successMessage;

const removeMessage = () => {
  successMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
};

const onClickButton = () => {
  removeMessage();
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    removeMessage();
  }
}

function onDocumentClick (evt) {
  const messageBox = successMessage.querySelector('div');
  const isClickOnMessage = evt.composedPath().includes(messageBox);
  if (!isClickOnMessage) {
    removeMessage();
  }
}

const showSuccess = (message) => {
  successMessage = message.cloneNode(true);
  const button = successMessage.querySelector('button');
  document.body.append(successMessage);
  button.addEventListener('click', onClickButton);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
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

const downloadSuccessMessage = () => {
  showSuccess(templateSuccess);
};
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, downloadSuccessMessage, showAlert, debounce};
