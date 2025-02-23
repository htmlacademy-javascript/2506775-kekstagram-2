import { isEscapeKey } from './util';

let sliceCounterMin = 0;
const SLICECOUNTERMAX = 5;

const windowWithBigPicture = document.querySelector('.big-picture');
const onCommentsLoader = windowWithBigPicture.querySelector('.comments-loader');
const socialComments = windowWithBigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');

const bigImage = windowWithBigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = windowWithBigPicture.querySelector('.likes-count');
const commentsCount = windowWithBigPicture.querySelector('.social__comment-shown-count');
const commentsTotal = windowWithBigPicture.querySelector('.social__comment-total-count');
const descriptionOnWindow = windowWithBigPicture.querySelector('.social__caption');
const commentsFragment = document.createDocumentFragment();

const onCloseButton = document.querySelector('.big-picture__cancel');

function createCommentFragment (comment) {
  const commentTemplate = socialComment.cloneNode(true);

  commentTemplate.querySelector('.social__picture').src = comment.avatar;
  commentTemplate.querySelector('.social__picture').alt = comment.name;
  commentTemplate.querySelector('.social__text').textContent = comment.message;

  commentsFragment.append(commentTemplate);
}

function showComments (commentsArray) {

  for(let i = 0; i < SLICECOUNTERMAX; i++){
    if(sliceCounterMin < commentsArray.length){

      createCommentFragment (commentsArray[i]);

      sliceCounterMin++;

      if(sliceCounterMin === commentsArray.length){
        onCommentsLoader.classList.add('hidden');
      }
    } else {
      onCommentsLoader.classList.add('hidden');
    }
    socialComments.append(commentsFragment);
    commentsCount.textContent = sliceCounterMin;
  }
}

const openWindow = (item) => {
  socialComments.innerHTML = '';
  document.querySelector('body').classList.add('modal-open');
  windowWithBigPicture.classList.remove('hidden');
  onCommentsLoader.classList.remove('hidden');

  commentsTotal.textContent = item.comments.length;
  bigImage.src = item.url;
  likesCount.textContent = item.likes;
  descriptionOnWindow.textContent = item.description;


  const loadMoreComments = () => {
    showComments(item.comments);
  };

  onCommentsLoader.addEventListener('click', loadMoreComments);

  loadMoreComments();


  const onDocumentKeyDown = (evt) => {
    if(isEscapeKey(evt)){
      evt.preventDefault();
      removeBigWindow();
    }
  };

  document.addEventListener('keydown', onDocumentKeyDown);


  function removeBigWindow() {
    windowWithBigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeyDown);
    onCommentsLoader.removeEventListener('click', loadMoreComments);
    sliceCounterMin = 0;
  }

  onCloseButton.addEventListener('click', () =>{
    removeBigWindow();
  });
};


export{openWindow};
