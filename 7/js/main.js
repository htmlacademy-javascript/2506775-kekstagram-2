import { getPhotos } from './modules/photo-desc';
import { genPicture } from './modules/photo-template';

const photosArray = getPhotos();
genPicture(photosArray);

