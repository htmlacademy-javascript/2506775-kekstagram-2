import { loadGallery } from './modules/filter-gallery.js';
import { setUserFormSubmit} from './modules/upload-form.js';
import { getData } from './modules/api.js';
import { showAlert } from './modules/util.js';

getData()
  .then((photos) => {
    loadGallery(photos);
  })
  .catch(() => {
    showAlert();
  });

setUserFormSubmit();
