import { getRandomInteger, getId} from './util.js';
import { getComments } from './comments.js';

const PHOTO_PUBLISHED_COUNT = 25;
const PHOTO_DESCRIPTION = 'Моменты, которые запечатлены навсегда';

const LIKES_COUNT_FROM = 15;
const LIKES_COUNT_TO = 200;

const COMMENTS_COUNT_FROM = 0;
const COMMENTS_COUNT_TO = 30;


const getPhotoId = getId();

const getPhotoDescription = () => {
  const id = getPhotoId();
  return {
    id: id,
    url:`photos/${id}.jpg`,
    description:PHOTO_DESCRIPTION,
    likes:getRandomInteger(LIKES_COUNT_FROM,LIKES_COUNT_TO),
    comments: Array.from({length:getRandomInteger(COMMENTS_COUNT_FROM, COMMENTS_COUNT_TO)}, getComments)
  };
};

const getPhotos = (photoCount = PHOTO_PUBLISHED_COUNT) => Array.from({length:photoCount}, getPhotoDescription);


export {getPhotos, COMMENTS_COUNT_TO};
