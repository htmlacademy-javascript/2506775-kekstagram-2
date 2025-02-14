import { getPhotos } from './photo-desc';
import { COMMENTS_COUNT_TO } from './photo-desc';
import { isEscapeKey } from './util';

const photoslist = getPhotos();

const windowWithBigPicture = document.querySelector('.big-picture');
const commentsCountBlock = windowWithBigPicture.querySelector('.social__comment-count');
const commentsLoader = windowWithBigPicture.querySelector('.comments-loader');
const socialComments = windowWithBigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');

const bigImage = windowWithBigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = windowWithBigPicture.querySelector('.likes-count');
const commentsCount = windowWithBigPicture.querySelector('.social__comment-shown-count');
const commentsTotal = windowWithBigPicture.querySelector('.social__comment-total-count');
const descriptionOnWindow = windowWithBigPicture.querySelector('.social__caption');

const closeButton = document.querySelector('.big-picture__cancel');


const createComments = (elementComments) => {
  const commentsFragment = document.createDocumentFragment();
  elementComments.comments.forEach((comment) => {
    const commentTemplate = socialComment.cloneNode(true);

    commentTemplate.querySelector('.social__picture').src = comment.avatar;
    commentTemplate.querySelector('.social__picture').alt = comment.name;
    commentTemplate.querySelector('.social__text').textContent = comment.message;

    commentsFragment.append(commentTemplate);
  });

  socialComments.append(commentsFragment);
};

const openWindow = (pictureId) => {
  const currentPhoto = photoslist.find((photo) => photo.id === Number(pictureId));
  windowWithBigPicture.classList.remove('hidden');
  commentsCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');


  commentsTotal.textContent = COMMENTS_COUNT_TO;
  bigImage.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  descriptionOnWindow.textContent = currentPhoto.description;
  commentsCount.textContent = currentPhoto.comments.length;


  createComments(currentPhoto);
};

const closeWithEscape = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    windowWithBigPicture.classList.add('hidden');
  }
};

closeButton.addEventListener('click', () =>{
  windowWithBigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});

export{openWindow, photoslist, closeWithEscape};
