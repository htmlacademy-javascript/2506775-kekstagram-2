import { COMMENTS_COUNT_TO } from './photo-desc';
import { isEscapeKey } from './util';

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

const onDocumentKeyDown = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    removeBigWindow();
  }
};

function removeBigWindow() {
  windowWithBigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
}

const openWindow = (item) => {
  const commentsFragment = document.createDocumentFragment();

  windowWithBigPicture.classList.remove('hidden');
  commentsCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  commentsTotal.textContent = COMMENTS_COUNT_TO;
  bigImage.src = item.url;
  likesCount.textContent = item.likes;
  descriptionOnWindow.textContent = item.description;
  commentsCount.textContent = item.comments.length;

  socialComments.innerHTML = '';
  item.comments.forEach((comment) => {
    const commentTemplate = socialComment.cloneNode(true);

    commentTemplate.querySelector('.social__picture').src = comment.avatar;
    commentTemplate.querySelector('.social__picture').alt = comment.name;
    commentTemplate.querySelector('.social__text').textContent = comment.message;

    commentsFragment.append(commentTemplate);
  });

  socialComments.append(commentsFragment);

  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeyDown);

  closeButton.addEventListener('click', () =>{
    removeBigWindow();
  });
};

export{openWindow};
