const checkLength = (string, length) => string.length <= length;

checkLength('проверяемая строка', 18);


const isPalindromeString = (string) => {
  const newString = string.replaceAll(' ','').toLowerCase();

  let invertedString = '';
  for(let i = newString.length - 1; i >= 0; i--){
    invertedString += newString[i];
  }

  return newString === invertedString;

};

isPalindromeString('Лёша на полке клопа нашёл ');

const getNumber = (string) => {
  const replacedString = string.replaceAll(' ','');
  let numberString = '';

  for(let i = 0; i <= replacedString.length - 1; i++){
    if(!isNaN(replacedString[i])){
      numberString += replacedString[i];
    }
  }

  return parseInt(numberString, 10);
};

getNumber('ECMAScript 2022');
