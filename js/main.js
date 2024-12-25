const PHOTO_PUBLISHED_COUNT = 25;
const PHOTO_DESCRIPTION = 'Моменты, которые запечатлены навсегда';

const AVATAR_COUNT_FROM = 1;
const AVATAR_COUNT_TO = 6;

const LIKES_COUNT_FROM = 15;
const LIKES_COUNT_TO = 200;

const COMMENTS_COUNT_FROM = 0;
const COMMENTS_COUNT_TO = 30;

const NAMES = ['София', 'Артем', 'Ева', 'Амина', 'Давид', 'Максим', 'Дарина', 'Алия', 'Амелия', 'Дамир', 'Арслан'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getId = () => {
  let currentId = 0;
  return () => ++currentId;
};

const getPhotoId = getId();
const getCommentId = getId();

const getComments = () => {
  const comment = {
    id:getCommentId(),
    avatar:`img/avatar-${getRandomInteger(AVATAR_COUNT_FROM, AVATAR_COUNT_TO)}`,
    message:MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
    name:NAMES[getRandomInteger(0, NAMES.length - 1)]
  };
  return comment;
};

const getPhotoDescription = () => {
  const id = getPhotoId();
  return {
    id: id,
    url:`photo/${id}.jpg`,
    description:PHOTO_DESCRIPTION,
    likes:getRandomInteger(LIKES_COUNT_FROM,LIKES_COUNT_TO),
    comments: Array.from({length:getRandomInteger(COMMENTS_COUNT_FROM, COMMENTS_COUNT_TO)}, getComments)
  };
};
export const getPhotos = (photoCount = PHOTO_PUBLISHED_COUNT) => Array.from({length:photoCount}, getPhotoDescription);


