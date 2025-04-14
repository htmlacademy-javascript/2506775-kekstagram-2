import { displaysPictures } from './modules/photo-template.js';
import { setUserFormSubmit, closeUploadWindow} from './modules/upload-form.js';
import { getData } from './modules/api.js';
import { showAlert } from './modules/util.js';


// displaysPictures(photoslist);

getData()
  .then((photos) => {
    displaysPictures(photos);
  })
  .catch(() => {
    showAlert();
  });

setUserFormSubmit(closeUploadWindow);
