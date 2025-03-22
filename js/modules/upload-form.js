import { isEscapeKey } from './util.js';

const HASHTAGS_COUNT = 5;
const COMMENT_LENGTH = 140;
const REGEXP = /^#[a-zф-яё0-9]{1,19}$/i;
const ZOOM_STEP = 0.25;
let effect;

let zoomValue = 1;

const errorMessage = {
  invalidName: 'введён невалидный хэштег',
  hashtagsLimit: 'превышено количество хэштегов',
  hashtagsRepeat: 'хэштеги повторяются',
  commentsLength: 'длина комментария больше 140 символов'
};

const EffectDictionary = {
  chrome: {min: 0, max: 1, start: 1, step: 0.1, name: 'grayscale',unit: ''},
  sepia: {min: 0, max: 1, start: 1, step: 0.1, name: 'sepia',unit: ''},
  marvin: {min: 0, max: 100, start: 100, step: 1, name: 'invert', unit: '%'},
  phobos: {min: 0, max: 3, start: 3, step: 0.1, name: 'blur', unit: 'px'},
  heat:  {min: 1,max: 3,start: 3,step: 0.1, name: 'brightness',unit: ''},
};

const formUpload = document.querySelector('.img-upload__form');
const imageUploadInput = formUpload.querySelector('.img-upload__input');
const imageOverlay = formUpload.querySelector('.img-upload__overlay');
const imageUploadCancel = formUpload.querySelector('.img-upload__cancel');
const onUploadHashtag = formUpload.querySelector('.text__hashtags');
const onUploadComment = formUpload.querySelector('.text__description');
const imgUploadPrewiew = formUpload.querySelector('.img-upload__preview img');
const scaleControlSmaller = formUpload.querySelector('.scale__control--smaller');
const scaleControlBigger = formUpload.querySelector('.scale__control--bigger');
const scaleControl = formUpload.querySelector('.scale__control--value');
const slider = formUpload.querySelector('.effect-level__slider');
const effectValue = formUpload.querySelector('.effect-level__value');
const effectLevel = formUpload.querySelector('.img-upload__effect-level');
const onEffectList = formUpload.querySelector('.effects__list');

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
      return +value;
    },
    from: function (value) {
      return value;
    },
  },
});

const onUpdateEffect = (evt) => {
  effect = evt.target.value;

  if(effect in EffectDictionary) {

    slider.noUiSlider.updateOptions({
      range: {
        min: EffectDictionary[effect].min,
        max: EffectDictionary[effect].max
      },
      step: EffectDictionary[effect].step,
      start: EffectDictionary[effect].start
    });
  } else {
    imgUploadPrewiew.style.filter = 'none';
    effectLevel.classList.add('hidden');
  }
};

slider.noUiSlider.on('update', () => {
  effectValue.value = slider.noUiSlider.get();
  if(effect in EffectDictionary) {
    effectLevel.classList.remove('hidden');
    imgUploadPrewiew.style.filter = `${EffectDictionary[effect].name}(${effectValue.value}${EffectDictionary[effect].unit})`;
  }
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
  onEffectList.removeEventListener('change', onUpdateEffect);
  slider.noUiSlider.destroy();
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


pristine.addValidator(onUploadHashtag, getHashtagsName, errorMessage.invalidName);
pristine.addValidator(onUploadHashtag, getHashtagsCount, errorMessage.hashtagsLimit);
pristine.addValidator(onUploadHashtag, getHashtagsDuplicate, errorMessage.hashtagsRepeat);
pristine.addValidator(onUploadComment, getCommentLength, errorMessage.commentsLength);

formUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(pristine.validate()){
    formUpload.submit();
  }
});

scaleControlSmaller.addEventListener('click', onZoomOut);
scaleControlBigger.addEventListener('click', onZoomIn);


onEffectList.addEventListener('change', onUpdateEffect);


