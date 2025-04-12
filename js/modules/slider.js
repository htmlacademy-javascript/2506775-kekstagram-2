const slider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.img-upload__effect-level');
const imgUploadPrewiew = document.querySelector('.img-upload__preview img');
const effectList = document.querySelector('.effects__list');
const effectNone = effectList.querySelector('#effect-none');

let effect;

const EffectDictionary = {
  chrome: {min: 0, max: 1, start: 1, step: 0.1, name: 'grayscale',unit: ''},
  sepia: {min: 0, max: 1, start: 1, step: 0.1, name: 'sepia',unit: ''},
  marvin: {min: 0, max: 100, start: 100, step: 1, name: 'invert', unit: '%'},
  phobos: {min: 0, max: 3, start: 3, step: 0.1, name: 'blur', unit: 'px'},
  heat:  {min: 1,max: 3,start: 3,step: 0.1, name: 'brightness',unit: ''},
};

const createSlider = () =>{

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
};

const onEffectListChange = (evt) => {
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

const initSlider = () => {
  effectNone.checked = true;


  createSlider();

  effectList.addEventListener('change', onEffectListChange);
  effectLevel.classList.add('hidden');


  slider.noUiSlider.on('update', () => {
    effectValue.value = slider.noUiSlider.get();
    if(effect in EffectDictionary) {
      effectLevel.classList.remove('hidden');
      imgUploadPrewiew.style.filter = `${EffectDictionary[effect].name}(${effectValue.value}${EffectDictionary[effect].unit})`;
    }
  });
};

const destroySlider = () => {
  slider.noUiSlider.destroy();
  effectList.removeEventListener('change', onEffectListChange);
};

export { initSlider, destroySlider };
