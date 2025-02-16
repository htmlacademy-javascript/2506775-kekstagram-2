const keysToProcess = {
  Escape: 'Escape'
};

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

const isEscapeKey = (evt) => evt.key === keysToProcess.Escape;

export {getRandomInteger, getId, isEscapeKey};
