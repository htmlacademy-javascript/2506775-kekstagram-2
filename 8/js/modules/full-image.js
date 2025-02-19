import { isEscapeKey } from './util';

let sliceCounterMax = 0;

const windowWithBigPicture = document.querySelector('.big-picture');
const onCommentsLoader = windowWithBigPicture.querySelector('.comments-loader');
const socialComments = windowWithBigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');

const bigImage = windowWithBigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = windowWithBigPicture.querySelector('.likes-count');
const commentsCount = windowWithBigPicture.querySelector('.social__comment-shown-count');
const commentsTotal = windowWithBigPicture.querySelector('.social__comment-total-count');
const descriptionOnWindow = windowWithBigPicture.querySelector('.social__caption');

const onCloseButton = document.querySelector('.big-picture__cancel');

function showComments (commentsArray) {
  const commentsFragment = document.createDocumentFragment();

  for(let i = 0; i < 5; i++){
    if(sliceCounterMax < commentsArray.length){
      const commentTemplate = socialComment.cloneNode(true);

      commentTemplate.querySelector('.social__picture').src = commentsArray[i].avatar;
      commentTemplate.querySelector('.social__picture').alt = commentsArray[i].name;
      commentTemplate.querySelector('.social__text').textContent = commentsArray[i].message;

      commentsFragment.append(commentTemplate);
      sliceCounterMax++;

      if(sliceCounterMax === commentsArray.length){
        onCommentsLoader.classList.add('hidden');
      }
    } else {
      onCommentsLoader.classList.add('hidden');
    }
    socialComments.append(commentsFragment);
    commentsCount.textContent = sliceCounterMax;
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


  const loadMoreHandler = () => {
    showComments(item.comments);
  };

  onCommentsLoader.addEventListener('click', loadMoreHandler);

  loadMoreHandler();


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
    onCommentsLoader.removeEventListener('click', loadMoreHandler);
    sliceCounterMax = 0;
  }

  onCloseButton.addEventListener('click', () =>{
    removeBigWindow();
  });
};


export{openWindow};
