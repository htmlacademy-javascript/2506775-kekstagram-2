const NAMES = ['София', 'Артем', 'Ева', 'Амина', 'Давид', 'Максим', 'Дарина', 'Алия', 'Амелия', 'Дамир', 'Арслан'];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const photosArray = [];

//Пыталась вывести неповторяющееся число из массива

// const intArray = [];

// const indexId = (a, b) => {
//   for(let i = 25; i > intArray.length; i--){
//     if (!intArray.includes(getRandomInteger(a, b))){
//       intArray.push(getRandomInteger(a, b));
//     }
//   }
//   return getRandomInteger(a, b);
// };
// console.log(indexId(1,25));
// console.log(intArray);

const photoDescription = () => ({
  id:getRandomInteger(1, 25),
  url:`photo/${ getRandomInteger(1, 25) }.jpg`,
  description:'Моменты, которые запечатлены навсегда',
  likes:getRandomInteger(15, 200),
  comments:[
    {
      id:getRandomInteger(15, 200),
      avatar:`img/avatar-${getRandomInteger(1, 6)}`,
      message:MESSAGES[getRandomIndex(MESSAGES)],
      name:NAMES[getRandomIndex(NAMES)]
    }
  ],
});

for(let i = 0; i < 25; i++){
  photosArray.push(photoDescription());
}
console.log(photosArray);

//id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.?
//url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.?
//У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.?
//comments, массив объектов ?

