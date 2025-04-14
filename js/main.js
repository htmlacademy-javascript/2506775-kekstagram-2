import { loadGallery } from './modules/filter-gallery.js';
import { setUserFormSubmit, closeUploadWindow} from './modules/upload-form.js';
import { getData } from './modules/api.js';
import { showAlert } from './modules/util.js';

getData()
  .then((photos) => {
    loadGallery(photos);
  })
  .catch(() => {
    showAlert();
  });

setUserFormSubmit(closeUploadWindow);
