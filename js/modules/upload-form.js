import { isEscapeKey } from './util';

const formUpload = document.querySelector('.img-upload__form');
const imageUploadInput = formUpload.querySelector('.img-upload__input');
const imageOverlay = formUpload.querySelector('.img-upload__overlay');
const imageUploadCancle = formUpload.querySelector('.img-upload__cancel');
const uploadHashtag = formUpload.querySelector('.text__hashtags');

const pristine = new Pristine(formUpload);

const onDocumentKeyDown = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closeUploadWindow();
  }
};

const openUploadWindow = () => {
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
};

function closeUploadWindow() {
  imageUploadInput.value = '';
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
}

imageUploadInput.addEventListener('change', openUploadWindow);

imageUploadCancle.addEventListener('click', closeUploadWindow);

formUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid){
    console.log('valid');
  } else{
    console.log('novalid');
  }
});
