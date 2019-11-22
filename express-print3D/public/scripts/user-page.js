function fetchData(id) {
  const url = `http://localhost:3000/user/${id.toString()}`;

  const form = document.querySelector('.user-form');

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'text/html');

  fetch(url, {
    mode: 'no-cors',
    method: 'get',
    headers: myHeaders,
  }).then((response) => {
    response.text().then((text) => {
      form.innerHTML = text;
    });
  }).catch((err) => {
    console.log(err);
  });
}
