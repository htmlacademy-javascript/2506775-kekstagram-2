const windowWithBigPicture = document.querySelector('.big-picture');
const commentsCountBlock = windowWithBigPicture.querySelector('.social__comment-count');
const commentsLoader = windowWithBigPicture.querySelector('.comments-loader');
const socialComments = windowWithBigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
console.log(socialComments);
console.log(socialComment);

// const createComments = () => {
//   const commentTemplate = socialComment.cloneNode(true);
// };

const openWindow = (miniature, likes, comments, totalComments) => {
  windowWithBigPicture.classList.remove('hidden');
  commentsCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  const bigImage = windowWithBigPicture.querySelector('.big-picture__img').querySelector('img');
  const likesCount = windowWithBigPicture.querySelector('.likes-count');
  const commentsCount = windowWithBigPicture.querySelector('.social__comment-shown-count');
  const commentsTotal = windowWithBigPicture.querySelector('.social__comment-total-count');
  const description = windowWithBigPicture.querySelector('.social__caption');

  bigImage.src = miniature.src;
  likesCount.textContent = likes;
  commentsCount.textContent = comments;
  commentsTotal.textContent = totalComments;
  description.textContent = miniature.alt;
};


export{openWindow};
