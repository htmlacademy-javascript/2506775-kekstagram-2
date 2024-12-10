const checkLength = (string, length) => {
  if(string.length <= length){
    return true;
  } else {
    return false;
  }
};

checkLength('проверяемая строка', 18);


const isPalindromeString = (string) => {
  const newString = string.replaceAll(' ','').toLowerCase();

  let invertedString = '';
  for(let i = newString.length - 1; i >= 0; i--){
    invertedString += newString[i];
  }

  if(newString === invertedString){
    return true;
  } else {
    return false;
  }
};

isPalindromeString('Лёша на полке клопа нашёл ');

const getNumber = (string) => {

  const replacedString = string.replaceAll(' ','');
  let numberString = '';

  for(let i = 0; i <= replacedString.length - 1; i++){
    if(isNaN(replacedString[i]) === false){

      if(replacedString[i] < 0){
        numberString += Math.abs(replacedString[i]);
      }

      numberString += replacedString[i];
    }
  }
  if(numberString === ''){
    return NaN;
  }
  const number = Number(numberString);
  return number;
};

getNumber('ECMAScript 2022');
