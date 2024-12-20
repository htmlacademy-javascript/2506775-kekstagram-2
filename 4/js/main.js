const photoPublished = 25;

const NAMES = ['София', 'Артем', 'Ева', 'Амина', 'Давид', 'Максим', 'Дарина', 'Алия', 'Амелия', 'Дамир', 'Арслан'];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const idGenerator = () => {
  let currentId = 0;
  return () => ++currentId;
};

const getId = idGenerator();
const getPhoto = idGenerator();
const getIdComment = idGenerator();

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const commentGenerator = () => {
  const comment = {
    id:getIdComment(),
    avatar:`img/avatar-${getRandomInteger(1, 6)}`,
    message:MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
    name:NAMES[getRandomInteger(0, NAMES.length - 1)]
  };
  return comment;
};

const photoDescription = () => ({
  id:getId(),
  url:`photo/${ getPhoto() }.jpg`,
  description:'Моменты, которые запечатлены навсегда',
  likes:getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, () => commentGenerator())
});

const photoArray = Array.from({length: photoPublished}, () => photoDescription());

console.log(photoArray);
