import { isEscapeKey } from './util';

const regexp = /^#[a-zф-яё0-9]{1,19}$/i;
const HASHTAGS_COUNT = 5;
const COMMENT_LENGTH = 140;

const formUpload = document.querySelector('.img-upload__form');
const imageUploadInput = formUpload.querySelector('.img-upload__input');
const imageOverlay = formUpload.querySelector('.img-upload__overlay');
const imageUploadCancle = formUpload.querySelector('.img-upload__cancel');
const uploadHashtag = formUpload.querySelector('.text__hashtags');
const uploadComment = formUpload.querySelector('.text__description');


const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const onDocumentKeyDown = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closeUploadWindow();
  }
};

const onCancleKeyDown = (evt) => {
  if(isEscapeKey(evt)){
    evt.stopPropagation();
  }
};

const openUploadWindow = () => {
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadHashtag.addEventListener('keydown', onCancleKeyDown);
  uploadComment.addEventListener('keydown', onCancleKeyDown);
  document.addEventListener('keydown', onDocumentKeyDown);
};

function closeUploadWindow() {
  imageUploadInput.value = '';
  uploadHashtag.value = '';
  uploadComment.value = '';
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  uploadHashtag.removeEventListener('focus', onCancleKeyDown);
  uploadComment.removeEventListener('focus', onCancleKeyDown);
}

imageUploadInput.addEventListener('change', openUploadWindow);

imageUploadCancle.addEventListener('click', closeUploadWindow);

const getHashtagsArray = (element) => {
  const hashtagsArray = element.toLowerCase().split(/\s+/).filter((item) => item !== '');
  return hashtagsArray;
};

const getHashtagsName = (element) => {
  const hashtagsName = getHashtagsArray(element);
  const newArray = [];

  hashtagsName.forEach((hashtag) => {
    if(regexp.test(hashtag) === true) {
      newArray.push(hashtag);
    }
  });

  return hashtagsName.length === newArray.length;
};

const getHashtagsCount = (element) => {
  const hashtagsArray = getHashtagsArray(element);
  return hashtagsArray.length <= HASHTAGS_COUNT;
};

const getHashtagsDuplicate = (element) => {
  const hashtagsArray = getHashtagsArray(element);
  const newArray = [];
  for (let i = 0; i < hashtagsArray.length; i++) {
    if(!newArray.includes(hashtagsArray[i])){
      newArray.push(hashtagsArray[i]);
    }
  }
  if(newArray.length === hashtagsArray.length) {
    return newArray;
  }
};

const getCommentLength = (element) => element.length < COMMENT_LENGTH;


pristine.addValidator(uploadHashtag, getHashtagsName, 'введён невалидный хэштег');
pristine.addValidator(uploadHashtag, getHashtagsCount, 'превышено количество хэштегов');
pristine.addValidator(uploadHashtag, getHashtagsDuplicate, 'хэштеги повторяются');
pristine.addValidator(uploadComment, getCommentLength, 'длина комментария больше 140 символов');

formUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
