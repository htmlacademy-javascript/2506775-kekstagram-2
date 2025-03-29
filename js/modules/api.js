const templateFragmentError = document.querySelector('#data-error').content;
const templateError = templateFragmentError.querySelector('.data-error');

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if(!response.ok){
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    const errorMessage = templateError.cloneNode(true);
    document.body.append(errorMessage);
    setTimeout(() => {
      errorMessage.remove();
    }, 5000);
  });
