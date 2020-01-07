
function clearInput(id) {
  const node = document.querySelector(id);
  if (node.nextElementSibling) {
    node.nextElementSibling.remove();
  }
}


function getText(problem) {
  if (problem == 'empty') {
    return 'This field is required!';
  }
  if (problem == 'justString') {
    return 'You can only use the alphabet!';
  }
  if (problem == 'length') {
    return 'Has to be at least 6 characters long!';
  }
  if (problem == 'format') {
    return 'Please use the right format!';
  }
  if (problem == 'lenght2') {
    return 'Has to be at least 8 characters long!';
  }
  if (problem == 'number') {
    return 'It has to include a number!';
  }
  if (problem == 'notConf') {
    return 'Should be the same password!';
  }
}

function isInvalid(node, problem) {
  node.classList.add('is-invalid');
  node.classList.remove('is-valid');
  const text = document.createElement('div');
  text.classList.add('is-invalid');
  text.textContent = getText(problem);
  node.parentElement.appendChild(text);
}


function firstNameCheck() {
  const name = document.querySelector('#firstName');
  const reg = /[\d!@#\$%\^\&*\)\(+=._-]/g;
  if (name.value == '') {
    isInvalid(name, 'empty');
    return;
  }
  if (name.value.match(reg)) {
    isInvalid(name, 'justString');
    return;
  }
  name.classList.remove('is-invalid');
  name.classList.add('is-valid');
}

function lastNameCheck() {
  const name = document.querySelector('#lastName');
  const reg = /[\d!@#\$%\^\&*\)\(+=._-]/g;
  if (name.value == '') {
    isInvalid(name, 'empty');
    return;
  }
  if (name.value.match(reg)) {
    isInvalid(name, 'justString');
    return;
  }
  name.classList.remove('is-invalid');
  name.classList.add('is-valid');
}

function userNameCheck() {
  const name = document.querySelector('#userName');
  const reg = /[\w\W]{6,}/g;
  if (name.value == '') {
    isInvalid(name, 'empty');
    return;
  }
  if (!name.value.match(reg)) {
    isInvalid(name, 'length');
    return;
  }
  name.classList.remove('is-invalid');
  name.classList.add('is-valid');
}

function emailCheck() {
  const email = document.querySelector('#email');
  const reg = /[a-z0-9]{3,}\@[a-z0-9]{3,}\.[a-z]{2,}/;
  if (email.value == '') {
    isInvalid(email, 'empty');
    return;
  }
  if (!email.value.match(reg)) {
    isInvalid(email, 'format');
    return;
  }
  email.classList.remove('is-invalid');
  email.classList.add('is-valid');
}

function passwordCheck() {
  const password = document.querySelector('#password');
  const reg1 = /\w{8,}/;
  const reg2 = /[0-9]/g;
  if (password.value == '') {
    isInvalid(password, 'empty');
    return;
  }
  if (!password.value.match(reg1)) {
    isInvalid(password, 'lenght2');
    return;
  }
  if (!password.value.match(reg2)) {
    isInvalid(password, 'number');
    return;
  }
  password.classList.remove('is-invalid');
  password.classList.add('is-valid');
  return password.value;
}

function passAgainCheck() {
  const password = document.querySelector('#passwordAgain');
  if (password.value == '') {
    isInvalid(password, 'empty');
    return;
  }
  const passwordConf = passwordCheck();
  if (password.value !== passwordConf) {
    isInvalid(password, 'notConf');
    return;
  }
  password.classList.remove('is-invalid');
  password.classList.add('is-valid');
}

function addressCheck() {
  const address = document.querySelector('#address');
}

function enable(id, className) {
  const div = document.querySelector(id);
  const required = div.getElementsByClassName(className);
  const btn = div.querySelector('.enable-btn');
  const arr = Array.from(required);

  function checkClass(item) {
    return item.classList.contains('is-valid');
  }
  const itIs = arr.every(checkClass);
  if (itIs) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', true);
  }
}

const required = document.querySelectorAll('.required');
required.forEach((node) => {
  node.addEventListener('blur', () => {
    enable('.register-card', 'required');
  });
});

const account = document.querySelectorAll('.account');
account.forEach((node) => {
  node.addEventListener('blur', () => {
    enable('#account', 'account');
  });
});

const password = document.querySelectorAll('.password');
password.forEach((node) => {
  node.addEventListener('blur', () => {
    enable('#passwordDiv', 'password');
  });
});