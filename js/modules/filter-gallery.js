import { debounce } from './util.js';
import { displaysPictures } from './photo-template.js';

const RENDER_TIME = 500;
const MAX_PHOTOS = 10;

const picturesContainer = document.querySelector('.pictures');
const imageFilters = document.querySelector('.img-filters');
const filters = imageFilters.querySelector('.img-filters__form');
const filterButtons = imageFilters.querySelectorAll('.img-filters__button');
const filterButtonDefault = imageFilters.querySelector('#filter-default');
const filterButtonRandom = imageFilters.querySelector('#filter-random');
const filterButtonDiscussed = imageFilters.querySelector('#filter-discussed');


const removeActiveClass = () => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

const clearGallery = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  if (pictures.length > 0) {
    pictures.forEach((picture) => picture.remove());
  }
};

const reloadGallery = (array) => {
  clearGallery();
  displaysPictures(array);
};

const renderGallery = debounce(reloadGallery, RENDER_TIME);

const randomPhotos = () => Math.random() - 0.5;

const discussedPhotos = (first, second) => second.comments.length - first.comments.length;

const Filters = {
  DEFAULT: {buttonName: filterButtonDefault, arrayModifier: false, },
  RANDOM: {buttonName: filterButtonRandom, arrayModifier: true, sortingFunction: randomPhotos, lengthLimit: MAX_PHOTOS},
  DISCUSSED: {buttonName: filterButtonDiscussed, arrayModifier: true, sortingFunction: discussedPhotos},
};

const modifyArray = (array, {arrayModifier, sortingFunction = () => 0, lengthLimit = array.length}) => {
  if (arrayModifier) {
    return array.slice().sort(sortingFunction).slice(0, lengthLimit);
  }
  return array;
};

const applyFilter = (filter, array) => {
  removeActiveClass();
  filter.buttonName.classList.add('img-filters__button--active');
  const modifiedArray = modifyArray(array, filter);
  renderGallery(modifiedArray);
};

const initFilterSection = (array) => {
  if (filters) {
    filterButtonDefault.addEventListener('click', () => applyFilter(Filters.DEFAULT, array));
    filterButtonRandom.addEventListener('click', () => applyFilter(Filters.RANDOM, array));
    filterButtonDiscussed.addEventListener('click', () => applyFilter(Filters.DISCUSSED, array));
  }
};

const loadGallery = (array) => {
  displaysPictures(array);
  initFilterSection(array);
  imageFilters.classList.remove('img-filters--inactive');
};

export {loadGallery};
