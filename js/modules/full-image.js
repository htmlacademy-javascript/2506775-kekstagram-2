import { isEscapeKey } from './util';

const windowWithBigPicture = document.querySelector('.big-picture');
const commentsLoader = windowWithBigPicture.querySelector('.comments-loader');
const socialComments = windowWithBigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');

const bigImage = windowWithBigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = windowWithBigPicture.querySelector('.likes-count');
const commentsCount = windowWithBigPicture.querySelector('.social__comment-shown-count');
const commentsTotal = windowWithBigPicture.querySelector('.social__comment-total-count');
const descriptionOnWindow = windowWithBigPicture.querySelector('.social__caption');

const closeButton = document.querySelector('.big-picture__cancel');

const sliceCounterMin = 0;
let sliceCounterMax = 5;

const onDocumentKeyDown = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    removeBigWindow();
  }
};

function showComments (min, max, commentsArray) {
  const commentsFragment = document.createDocumentFragment();
  const slicedListComments = commentsArray.slice(min, max);
  socialComments.innerHTML = '';

  commentsCount.textContent = slicedListComments.length;

  slicedListComments.forEach((comment) => {
    const commentTemplate = socialComment.cloneNode(true);

    commentTemplate.querySelector('.social__picture').src = comment.avatar;
    commentTemplate.querySelector('.social__picture').alt = comment.name;
    commentTemplate.querySelector('.social__text').textContent = comment.message;

    commentsFragment.append(commentTemplate);
  });

  socialComments.append(commentsFragment);
  console.log(slicedListComments.length);
  console.log(commentsArray.length);

  if(slicedListComments.length === commentsArray.length){
    commentsLoader.classList.add('hidden');
  }
}

function removeBigWindow() {
  windowWithBigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
}

const openWindow = (item) => {

  windowWithBigPicture.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  commentsTotal.textContent = item.comments.length;
  bigImage.src = item.url;
  likesCount.textContent = item.likes;
  descriptionOnWindow.textContent = item.description;
  // commentsCount.textContent = 0;


  // showComments(sliceCounterMin, sliceCounterMax, item.comments);
  showComments(sliceCounterMin, sliceCounterMax, item.comments);
  commentsLoader.addEventListener('click', () => {
    sliceCounterMax += 5;
    showComments(sliceCounterMin, sliceCounterMax, item.comments);
  });

  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeyDown);

  closeButton.addEventListener('click', () =>{
    removeBigWindow();
    // commentsLoader.removeEventListener('click', newFunc);
  });
};

export{openWindow};
