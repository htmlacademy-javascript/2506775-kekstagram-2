const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');


const uploadPhotoFile = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const imageUrl = URL.createObjectURL(file);

    preview.src = imageUrl;

    effectsPreview.forEach((miniImage) => {
      miniImage.style.backgroundImage = `url(${imageUrl})`;
    });
    preview.onload = () => URL.revokeObjectURL(imageUrl);
  }
};

export {uploadPhotoFile};
