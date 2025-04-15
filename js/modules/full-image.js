import { isEscapeKey } from './util.js';

const SLICECOUNTERMAX = 5;
let sliceCounterMin = 0;


const windowWithBigPicture = document.querySelector('.big-picture');
const сommentsLoader = windowWithBigPicture.querySelector('.comments-loader');
const socialComments = windowWithBigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');

const bigImage = windowWithBigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = windowWithBigPicture.querySelector('.likes-count');
const commentsCount = windowWithBigPicture.querySelector('.social__comment-shown-count');
const commentsTotal = windowWithBigPicture.querySelector('.social__comment-total-count');
const descriptionOnWindow = windowWithBigPicture.querySelector('.social__caption');
const commentsFragment = document.createDocumentFragment();

const сloseButton = document.querySelector('.big-picture__cancel');

const createCommentFragment = (comment) => {
  const commentTemplate = socialComment.cloneNode(true);

  commentTemplate.querySelector('.social__picture').src = comment.avatar;
  commentTemplate.querySelector('.social__picture').alt = comment.name;
  commentTemplate.querySelector('.social__text').textContent = comment.message;

  commentsFragment.append(commentTemplate);
};

const showComments = (commentsArray) => {

  for(let i = 0; i < SLICECOUNTERMAX; i++){
    if(sliceCounterMin < commentsArray.length){

      createCommentFragment (commentsArray[i]);

      sliceCounterMin++;

      сommentsLoader.classList.toggle('hidden', sliceCounterMin === commentsArray.length);
    }
    socialComments.append(commentsFragment);
    commentsCount.textContent = sliceCounterMin;
  }
};

const openWindow = ({comments, url, likes, description}) => {
  socialComments.innerHTML = '';
  document.querySelector('body').classList.add('modal-open');
  windowWithBigPicture.classList.remove('hidden');
  сommentsLoader.classList.remove('hidden');

  commentsTotal.textContent = comments.length;
  bigImage.src = url;
  likesCount.textContent = likes;
  descriptionOnWindow.textContent = description;


  const onLoadCommentsClick = () => {
    showComments(comments);
  };

  сommentsLoader.addEventListener('click', onLoadCommentsClick);

  onLoadCommentsClick();


  const onPressDocumentKeyDown = (evt) => {
    if(isEscapeKey(evt)){
      evt.preventDefault();
      removeBigWindow();
    }
  };

  document.addEventListener('keydown',onPressDocumentKeyDown);


  function removeBigWindow() {
    windowWithBigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPressDocumentKeyDown);
    сommentsLoader.removeEventListener('click', onLoadCommentsClick);
    sliceCounterMin = 0;
  }

  сloseButton.addEventListener('click', () =>{
    removeBigWindow();
  });
};


export{openWindow};
