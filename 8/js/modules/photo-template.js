import { openWindow } from './full-image';
import { closeWithEscape } from './full-image';

const container = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');

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
  const fragment = document.createDocumentFragment();

  for(let i = 0; i < arrayOfPictures.length; i++) {
    const miniature = getPicture(arrayOfPictures[i]);
    fragment.append(miniature);
  }

  container.append(fragment);
};

container.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if(currentPicture){
    openWindow(currentPicture.dataset.pictureId);
    document.querySelector('body').classList.add('modal-open');

    document.addEventListener('keydown', closeWithEscape);
  }
});

export {displaysPictures};
