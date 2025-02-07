const windowWithBigPicture = document.querySelector('.big-picture');

const openWindow = (miniature, likes, comments, totalComments) => {
  windowWithBigPicture.classList.remove('hidden');

  const bigImage = windowWithBigPicture.querySelector('.big-picture__img').querySelector('img');
  const likesCount = windowWithBigPicture.querySelector('.likes-count');
  const commentsCount = windowWithBigPicture.querySelector('.social__comment-shown-count');
  const commentsTotal = windowWithBigPicture.querySelector('.social__comment-total-count');

  bigImage.src = miniature.src;
  likesCount.textContent = likes;
  commentsCount.textContent = comments;
  commentsTotal.textContent = totalComments;
};


export{openWindow};
