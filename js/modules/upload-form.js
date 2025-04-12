import { isEscapeKey, showAlert,showSuccess } from './util.js';
import { sendData } from './api.js';
import { initSlider, destroySlider} from './slider.js';

const HASHTAGS_COUNT = 5;
const COMMENT_LENGTH = 140;
const REGEXP = /^#[a-zф-яё0-9]{1,19}$/i;
const ZOOM_STEP = 0.25;
const MIN_ZOOM_VALUE = 0.25;
const MAX_ZOOM_VALUE = 1;


let zoomValue = 1;

const errorMessage = {
  invalidName: 'введён невалидный хэштег',
  hashtagsLimit: 'превышено количество хэштегов',
  hashtagsRepeat: 'хэштеги повторяются',
  commentsLength: 'длина комментария больше 140 символов'
};


const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const formUpload = document.querySelector('.img-upload__form');
const imageUploadInput = formUpload.querySelector('.img-upload__input');
const imageOverlay = formUpload.querySelector('.img-upload__overlay');
const imageUploadCancel = formUpload.querySelector('.img-upload__cancel');
const onUploadHashtag = formUpload.querySelector('.text__hashtags');
const onUploadComment = formUpload.querySelector('.text__description');
const scaleControlSmaller = formUpload.querySelector('.scale__control--smaller');
const scaleControlBigger = formUpload.querySelector('.scale__control--bigger');
const scaleControl = formUpload.querySelector('.scale__control--value');
const submitButton = formUpload.querySelector('.img-upload__submit');
const imgUploadPrewiew = formUpload.querySelector('.img-upload__preview img');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unBlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};


const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});


const onDocumentKeyDown = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    onCloseUploadWindow();
  }
};

const cancelKeyDown = (evt) => {
  if(isEscapeKey(evt)){
    evt.stopPropagation();
  }
};

const onOpenUploadWindow = () => {
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  onUploadHashtag.addEventListener('keydown', cancelKeyDown);
  onUploadComment.addEventListener('keydown', cancelKeyDown);
  document.addEventListener('keydown', onDocumentKeyDown);
  initSlider();
};

function onCloseUploadWindow() {
  imageUploadInput.value = '';
  onUploadHashtag.value = '';
  onUploadComment.value = '';
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  onUploadHashtag.removeEventListener('focus', cancelKeyDown);
  onUploadComment.removeEventListener('focus', cancelKeyDown);
  destroySlider();
}


const onScaleControlSmallerClick = () => {
  if(zoomValue > MIN_ZOOM_VALUE){
    zoomValue -= ZOOM_STEP;
    imgUploadPrewiew.style.transform = `scale(${zoomValue})`;
    scaleControl.value = `${zoomValue * 100}%`;
  }
};

const onScaleControlBiggerClick = () => {
  if(zoomValue < MAX_ZOOM_VALUE){
    zoomValue += ZOOM_STEP;
    imgUploadPrewiew.style.transform = `scale(${zoomValue})`;
    scaleControl.value = `${zoomValue * 100}%`;
  }
};

imageUploadInput.addEventListener('change', onOpenUploadWindow);

imageUploadCancel.addEventListener('click', onCloseUploadWindow);

const getHashtagsArray = (element) => {
  const hashtagsArray = element.toLowerCase().split(/\s+/).filter(Boolean);
  return hashtagsArray;
};

const getHashtagsName = (element) => {
  const hashtagsName = getHashtagsArray(element);

  return hashtagsName.every((hashtag) => REGEXP.test(hashtag));
};

const getHashtagsCount = (element) => {
  const hashtagsArray = getHashtagsArray(element);
  return hashtagsArray.length <= HASHTAGS_COUNT;
};

const getHashtagsDuplicate = (element) => {
  const hashtagsArray = getHashtagsArray(element);
  return new Set(hashtagsArray).size === hashtagsArray.length;
};

const getCommentLength = (element) => element.length < COMMENT_LENGTH;


pristine.addValidator(onUploadHashtag, getHashtagsName, errorMessage.invalidName);
pristine.addValidator(onUploadHashtag, getHashtagsCount, errorMessage.hashtagsLimit);
pristine.addValidator(onUploadHashtag, getHashtagsDuplicate, errorMessage.hashtagsRepeat);
pristine.addValidator(onUploadComment, getCommentLength, errorMessage.commentsLength);

const setUserFormSubmit = (onSuccess) => {
  formUpload.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if(isValid){
      blockSubmitButton();
      showSuccess();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(() => {
          showAlert();
        })
        .finally(unBlockSubmitButton);
    }
  });
};

scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);


export {setUserFormSubmit, onCloseUploadWindow};
