import { photoslist } from './modules/photo-template.js';
import { displaysPictures } from './modules/photo-template.js';
import './modules/upload-form.js';

displaysPictures(photoslist);

// const templateFragmentError = document.querySelector('#data-error');
// const templateError = templateFragmentError.querySelector('.data-error');

// fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
//   .then((response) => {
//     if(!response.ok){
//       const errorMessage = templateError.cloneNode(true);
//       console.log(errorMessage);
//       document.body.append(errorMessage);
//     }
//   });

