
// Filter products
const createFetch = function () {

  // Value read from document
  const brandsInputs = document.querySelectorAll('.brands');
  const categoriesInputs = document.querySelectorAll('.categories');
  const select = document.querySelector('#per-page');
  const perPage = select.value;

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

  const url = `http://localhost:3000/products/1?${perPage}${categories}${brands}`;

  window.location = url;

};

// Products per page
function getval(sel) {
  console.log(sel.value);
  const regex = /\?[0-9]{2,2}/;
  let url = '';

  const urlBase = window.location.href;

  if (urlBase.search(regex) > -1) {
    const index = urlBase.search(regex);
    const url1 = urlBase.substring(0, index);
    const url2 = urlBase.substring(index+3,);
    url = url1.concat(`?${sel.value}${url2}`);
  } else {
    url = urlBase.concat(`?${sel.value}`);
  }

  console.log(url);

  window.location = url;

}