const createFetch = function () {

  // Value read from document
  const brandsInputs = document.querySelectorAll('.brands');
  const categoriesInputs = document.querySelectorAll('.categories');

  function getValues(nameInput) {
    let names = '';
    for (let i = 0; i < nameInput.length; i++) {
      if (nameInput[i].checked) {
        names += `&${nameInput[i].value}`;
      }
    }
    return names;
  }

  const brandsUrl = `b=${getValues(brandsInputs).slice(1).replace(' ', '-')}`;
  const categoriesUrl = `c=${getValues(categoriesInputs).slice(1)}`;

  function isThere(name) {
    if (name.length == 2) {
      name = '';
    }
    return name;
  }

  const brands = isThere(brandsUrl);
  const categories = isThere(categoriesUrl);

  const url = `http://localhost:3000/products/1?${categories}${brands}`;

  window.location = url;

};
