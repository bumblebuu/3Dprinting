const check = document.getElementById('check');
const cancel = document.getElementById('cancel');
const text = document.getElementById('savedIcon');

// Account save
function saveAccount() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const userName = document.getElementById('userName').value;
  const email = document.getElementById('email').value;

  // Data creating
  const url = 'http://localhost:3000/user/account';
  const data = {
    firstname: firstName,
    lastname: lastName,
    username: userName,
    email,
  };

  // Fetch http req
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then((response) => {
      if (response == 'SAVED!') {
        check.style.display = 'block';
        cancel.style.display = 'none';
      } else {
        cancel.style.display = 'block';
        check.style.display = 'none';
      }
      text.innerHTML = response;
      setTimeout(() => {
        cancel.style.display = 'none';
        check.style.display = 'none';
        text.innerHTML = '';
      }, 8000);
    });
}

// Password save
function savePassword() {
  const oldPassword = document.getElementById('oldPassword').value;
  const newPassword = document.getElementById('password').value;
  const newPasswordConf = document.getElementById('passwordAgain').value;

  // Data creating
  const url = 'http://localhost:3000/user/password';
  const data = {
    oldPassword,
    newPassword,
    newPasswordConf,
  };

  // Fetch http req
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then((response) => {
      if (response == 'SAVED!') {
        check.style.display = 'block';
        cancel.style.display = 'none';
      } else {
        cancel.style.display = 'block';
        check.style.display = 'none';
      }
      text.innerHTML = response;
      setTimeout(() => {
        cancel.style.display = 'none';
        check.style.display = 'none';
        text.innerHTML = '';
      }, 8000);
    });
}
