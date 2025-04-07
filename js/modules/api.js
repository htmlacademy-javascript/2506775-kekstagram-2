const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const ALERT_SHOW_TIME = 5000;

const templateFragmentError = document.querySelector('#data-error').content;
const templateError = templateFragmentError.querySelector('.data-error');

const templateFragmentSuccess = document.querySelector('#success').content;
const templateSuccess = templateFragmentSuccess.querySelector('.success');

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

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(errorText ?? err.message);
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {showSuccess, showAlert, sendData, getData};
