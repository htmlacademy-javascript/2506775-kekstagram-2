import { isEscapeKey } from './util.js';

const HASHTAGS_COUNT = 5;
const COMMENT_LENGTH = 140;
const REGEXP = /^#[a-zф-яё0-9]{1,19}$/i;
const ZOOM_STEP = 0.25;

let zoomValue = 1;

const errorMessage = {
  invalidName: 'введён невалидный хэштег',
  hashtagsLimit: 'превышено количество хэштегов',
  hashtagsRepeat: 'хэштеги повторяются',
  commentsLength: 'длина комментария больше 140 символов'
};

const effectKeys = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness',
};

const formUpload = document.querySelector('.img-upload__form');
const imageUploadInput = formUpload.querySelector('.img-upload__input');
const imageOverlay = formUpload.querySelector('.img-upload__overlay');
const imageUploadCancel = formUpload.querySelector('.img-upload__cancel');
const uploadHashtag = formUpload.querySelector('.text__hashtags');
const uploadComment = formUpload.querySelector('.text__description');
const imgUploadPrewiew = formUpload.querySelector('.img-upload__preview img');
const scaleControlSmaller = formUpload.querySelector('.scale__control--smaller');
const scaleControlBigger = formUpload.querySelector('.scale__control--bigger');
const scaleControl = formUpload.querySelector('.scale__control--value');
const slider = formUpload.querySelector('.effect-level__slider');
const effectValue = formUpload.querySelector('.effect-level__value');
const effectLevel = formUpload.querySelector('.img-upload__effect-level');
const effectList = formUpload.querySelector('.effects__list');

effectLevel.classList.add('hidden');


const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const onDocumentKeyDown = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    onCloseUploadWindow();
  }
};

const onCancleKeyDown = (evt) => {
  if(isEscapeKey(evt)){
    evt.stopPropagation();
  }
};

const onOpenUploadWindow = () => {
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadHashtag.addEventListener('keydown', onCancleKeyDown);
  uploadComment.addEventListener('keydown', onCancleKeyDown);
  document.addEventListener('keydown', onDocumentKeyDown);
};

function onCloseUploadWindow() {
  imageUploadInput.value = '';
  uploadHashtag.value = '';
  uploadComment.value = '';
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  uploadHashtag.removeEventListener('focus', onCancleKeyDown);
  uploadComment.removeEventListener('focus', onCancleKeyDown);
}


const onZoomOut = () => {
  if(zoomValue > ZOOM_STEP){
    zoomValue -= ZOOM_STEP;
    imgUploadPrewiew.style.transform = `scale(${zoomValue})`;
    scaleControl.value = `${zoomValue * 100}%`;
  }
};

const onZoomIn = () => {
  if(zoomValue < 1){
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


pristine.addValidator(uploadHashtag, getHashtagsName, errorMessage.invalidName);
pristine.addValidator(uploadHashtag, getHashtagsCount, errorMessage.hashtagsLimit);
pristine.addValidator(uploadHashtag, getHashtagsDuplicate, errorMessage.hashtagsRepeat);
pristine.addValidator(uploadComment, getCommentLength, errorMessage.commentsLength);

formUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(pristine.validate()){
    formUpload.submit();
  }
});

scaleControlSmaller.addEventListener('click', onZoomOut);
scaleControlBigger.addEventListener('click', onZoomIn);

effectList.addEventListener('change', (evt) => {
  effectLevel.classList.remove('hidden');
  const effect = evt.target.value;

  slider.noUiSlider.on('update', () => {
    effectValue.value = slider.noUiSlider.get();
    console.log(effectKeys.value);
  });

  if(effect === 'none'){
    effectLevel.classList.add('hidden');
    imgUploadPrewiew.style.filter = 'none';
  }else if(effect === 'chrome') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });
    imgUploadPrewiew.style.filter = `${effectKeys.chrome}(${effectValue.value})`;
  } else if(effect === 'sepia') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });
    imgUploadPrewiew.style.filter = `${effectKeys.sepia}(${effectValue.value})`;
  } else if(effect === 'marvin'){
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1
    });
    imgUploadPrewiew.style.filter = `${effectKeys.marvin}(${effectValue.value}%)`;
  } else if(effect === 'phobos'){
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    imgUploadPrewiew.style.filter = `${effectKeys.phobos}(${effectValue.value}px)`;
  } else if(effect === 'heat'){
    slider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    imgUploadPrewiew.style.filter = `${effectKeys.heat}(${effectValue.value})`;
  }
});
