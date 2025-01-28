import { getRandomInteger, getId} from './util.js';


const AVATAR_COUNT_FROM = 1;
const AVATAR_COUNT_TO = 6;

const getCommentId = getId();

const NAMES = ['София', 'Артем', 'Ева', 'Амина', 'Давид', 'Максим', 'Дарина', 'Алия', 'Амелия', 'Дамир', 'Арслан'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


const getComments = () => {
  const comment = {
    id:getCommentId(),
    avatar:`img/avatar-${getRandomInteger(AVATAR_COUNT_FROM, AVATAR_COUNT_TO)}`,
    message:MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
    name:NAMES[getRandomInteger(0, NAMES.length - 1)]
  };
  return comment;
};

export {getComments};
