import { getPhotos } from './modules/photo-desc';
import { displaysPictures } from './modules/photo-template';

displaysPictures(getPhotos());

