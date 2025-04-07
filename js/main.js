import { displaysPictures } from './modules/photo-template.js';
import { setUserFormSubmit, onCloseUploadWindow} from './modules/upload-form.js';
import { getData } from './modules/api.js';


// displaysPictures(photoslist);

getData()
  .then((photos) => {
    displaysPictures(photos);
  });

setUserFormSubmit(onCloseUploadWindow);


