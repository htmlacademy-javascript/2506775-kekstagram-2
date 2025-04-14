import { openWindow } from './full-image.js';
// import { getPhotos } from './photo-desc.js';

const container = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');
const imageFilters = document.querySelector('.img-filters');

let photoslist = [];

const getPicture = function(item){
  const element = template.cloneNode(true);

  element.dataset.pictureId = item.id;

  const image = element.querySelector('.picture__img');
  image.src = item.url;
  image.alt = item.description;

  const likes = element.querySelector('.picture__likes');
  likes.textContent = item.likes;

  const comments = element.querySelector('.picture__comments');
  comments.innerHTML = item.comments.length;

  return element;
};


const displaysPictures = (arrayOfPictures) => {
  photoslist = arrayOfPictures;
  const fragment = document.createDocumentFragment();

  for(let i = 0; i < arrayOfPictures.length; i++) {
    const miniature = getPicture(arrayOfPictures[i]);
    fragment.append(miniature);
  }

  container.append(fragment);
  imageFilters.classList.remove('img-filters--inactive');
};

container.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if(currentPicture){
    evt.preventDefault();
    const currentPhoto = photoslist.find((photo) => photo.id === Number(currentPicture.dataset.pictureId));
    openWindow(currentPhoto);
  }
});

export {displaysPictures, photoslist};
