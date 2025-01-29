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

  return element;
};

const displaysPictures = (arrayOfPictures) => {
  const fragment = document.createDocumentFragment();

  for(let i = 0; i < arrayOfPictures.length; i++) {
    fragment.append(getPicture(arrayOfPictures[i]));
  }

  container.append(fragment);
};
export {displaysPictures};
