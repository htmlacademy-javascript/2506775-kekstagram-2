const container = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');
const fragment = document.createDocumentFragment();

const genPicture = (arrPic) => {
  for(let i = 0; i < arrPic.length; i++) {
    const element = template.cloneNode(true);
    const image = element.querySelector('.picture__img');
    image.src = arrPic[i].url;
    image.alt = arrPic[i].description;

    const likes = element.querySelector('.picture__likes');
    likes.textContent = arrPic[i].likes;

    const comments = element.querySelector('.picture__comments');
    comments.innerHTML = arrPic[i].comments.length;

    fragment.append(element);
  }

  container.append(fragment);
};
export {genPicture};
