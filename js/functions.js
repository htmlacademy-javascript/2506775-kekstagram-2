const MINUTES_IN_HOUR = 60;

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


// Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

// Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

// Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.

function parseTime(time){
  const [hours, minutes] = time.split(':').map(Number);
  return hours * MINUTES_IN_HOUR + minutes;
}

const isMeeting = (startWork, endWork, startMeeting, duration) => {
  const workStart = parseTime(startWork);
  const workEnd = parseTime(endWork);
  const meetingStart = parseTime(startMeeting);

  const meetingEnd = meetingStart + duration;

  return meetingStart >= workStart && meetingEnd <= workEnd;
};

isMeeting('14:00', '17:30', '08:0', 90);
