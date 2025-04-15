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

const reloadGallery = (arrays) => {
  clearGallery();
  displaysPictures(arrays);
};

const renderGallery = debounce(reloadGallery, RENDER_TIME);

const getRandomPhotos = () => Math.random() - 0.5;

const getDiscussedPhotos = (first, second) => second.comments.length - first.comments.length;

const Filters = {
  DEFAULT: {buttonName: filterButtonDefault, arrayModifiers: false, },
  RANDOM: {buttonName: filterButtonRandom, arrayModifiers: true, sortingFunction: getRandomPhotos, lengthLimit: MAX_PHOTOS},
  DISCUSSED: {buttonName: filterButtonDiscussed, arrayModifiers: true, sortingFunction: getDiscussedPhotos},
};

const modifyArray = (arrays, {arrayModifiers, sortingFunction = () => 0, lengthLimit = arrays.length}) => {
  if (arrayModifiers) {
    return arrays.slice().sort(sortingFunction).slice(0, lengthLimit);
  }
  return arrays;
};

const applyFilter = (filter, arrays) => {
  removeActiveClass();
  filter.buttonName.classList.add('img-filters__button--active');
  const modifiedArray = modifyArray(arrays, filter);
  renderGallery(modifiedArray);
};

const getInitFilterSection = (arrays) => {
  if (filters) {
    filterButtonDefault.addEventListener('click', () => applyFilter(Filters.DEFAULT, arrays));
    filterButtonRandom.addEventListener('click', () => applyFilter(Filters.RANDOM, arrays));
    filterButtonDiscussed.addEventListener('click', () => applyFilter(Filters.DISCUSSED, arrays));
  }
};

const loadGallery = (arrays) => {
  displaysPictures(arrays);
  getInitFilterSection(arrays);
  imageFilters.classList.remove('img-filters--inactive');
};

export {loadGallery};
