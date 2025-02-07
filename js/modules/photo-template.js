import { openWindow } from './full-image';
import { COMMENTS_COUNT_TO } from './photo-desc';

const container = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');

const getPicture = function(item){
  const element = template.cloneNode(true);

  const image = element.querySelector('.picture__img');
  image.src = item.url;
  image.alt = item.description;

  const likes = element.querySelector('.picture__likes');
  likes.textContent = item.likes;

  const comments = element.querySelector('.picture__comments');
  comments.innerHTML = item.comments.length;
  // console.log(element);
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
  const currenrPicture = evt.target.closest('.picture');

  if(currenrPicture){
    const miniImage = currenrPicture.querySelector('img');
    const currentImageLikes = currenrPicture.querySelector('.picture__likes').textContent;
    const currentImageCommentsCount = currenrPicture.querySelector('.picture__comments').textContent;

    openWindow(miniImage, currentImageLikes, currentImageCommentsCount, COMMENTS_COUNT_TO);

    console.log(currenrPicture);
  }
});

export {displaysPictures};
