import { isEscapeKey, showAlert,downloadSuccessMessage} from './util.js';
import { sendData } from './api.js';
import {getInitSlider, destroySlider} from './slider.js';
import { uploadPhotoFile } from './load-photo.js';

const HASHTAGS_COUNT = 5;
const COMMENT_LENGTH = 140;
const REGEXP = /^#[a-zф-яё0-9]{1,19}$/i;
const ZOOM_STEP = 0.25;
const MIN_ZOOM_VALUE = 0.25;
const MAX_ZOOM_VALUE = 1;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};


const errorMessage = {
  invalidName: 'Введён невалидный хэштег',
  hashtagsLimit: 'Превышено количество хэштегов',
  hashtagsRepeat: 'Хэштеги повторяются',
  commentsLength: 'Длина комментария больше 140 символов'
};

let zoomValue = 1;


const formUpload = document.querySelector('.img-upload__form');
const imageUploadInput = formUpload.querySelector('.img-upload__input');
const imageOverlay = formUpload.querySelector('.img-upload__overlay');
const imageUploadCancel = formUpload.querySelector('.img-upload__cancel');
const uploadHashtag = formUpload.querySelector('.text__hashtags');
const uploadComment = formUpload.querySelector('.text__description');
const scaleControlSmaller = formUpload.querySelector('.scale__control--smaller');
const scaleControlBigger = formUpload.querySelector('.scale__control--bigger');
const scaleControl = formUpload.querySelector('.scale__control--value');
const submitButton = formUpload.querySelector('.img-upload__submit');
const imgUploadPrewiew = formUpload.querySelector('.img-upload__preview img');

const toblocksubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};


const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const resetValidation = () => {
  pristine.reset();
};

const onDocumentKeyDown = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closeUploadWindow();
  }
};

const onCancelKeyDown = (evt) => {
  if(isEscapeKey(evt)){
    evt.stopPropagation();
  }
};

const onClickScaleControlSmaller = () => {
  if(zoomValue > MIN_ZOOM_VALUE){
    zoomValue -= ZOOM_STEP;
    imgUploadPrewiew.style.transform = `scale(${zoomValue})`;
    scaleControl.value = `${zoomValue * 100}%`;
  }
};

const onClickScaleControlBigger = () => {
  if(zoomValue < MAX_ZOOM_VALUE){
    zoomValue += ZOOM_STEP;
    imgUploadPrewiew.style.transform = `scale(${zoomValue})`;
    scaleControl.value = `${zoomValue * 100}%`;
  }
};

const onOpenUploadWindow = () => {
  uploadPhotoFile();
  zoomValue = 1;
  scaleControl.value = `${zoomValue * 100}%`;
  imgUploadPrewiew.style.transform = `scale(${zoomValue})`;
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadHashtag.addEventListener('keydown', onCancelKeyDown);
  uploadComment.addEventListener('keydown', onCancelKeyDown);
  document.addEventListener('keydown', onDocumentKeyDown);
  scaleControlSmaller.addEventListener('click', onClickScaleControlSmaller);
  scaleControlBigger.addEventListener('click', onClickScaleControlBigger);
  getInitSlider();
};

function closeUploadWindow() {
  imageUploadInput.value = '';
  uploadHashtag.value = '';
  uploadComment.value = '';
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  uploadHashtag.removeEventListener('focus', onCancelKeyDown);
  uploadComment.removeEventListener('focus', onCancelKeyDown);
  scaleControlSmaller.removeEventListener('click', onClickScaleControlSmaller);
  scaleControlBigger.removeEventListener('click', onClickScaleControlBigger);
  destroySlider();
  resetValidation();
}

const onCloseUploadWindow = () => {
  closeUploadWindow();
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


pristine.addValidator(uploadHashtag, getHashtagsName, errorMessage.invalidName);
pristine.addValidator(uploadHashtag, getHashtagsCount, errorMessage.hashtagsLimit);
pristine.addValidator(uploadHashtag, getHashtagsDuplicate, errorMessage.hashtagsRepeat);
pristine.addValidator(uploadComment, getCommentLength, errorMessage.commentsLength);

const setUserFormSubmit = () => {
  formUpload.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if(isValid){
      toblocksubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          closeUploadWindow();
          downloadSuccessMessage();
        })
        .catch(() => {
          showAlert();
        })
        .finally(unblockSubmitButton);
    }
  });
};

export {setUserFormSubmit, closeUploadWindow};
