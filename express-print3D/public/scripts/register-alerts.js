function clearInput(id) {
  const node = document.querySelector(id);
  if (node.nextElementSibling) {
    node.nextElementSibling.remove();
  }
  node.setAttribute('class', 'form-control');
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
    return 'Please use the shown format!';
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
  node.setAttribute('class', 'is-invalid form-control');
  const text = document.createElement('div');
  text.setAttribute('class', 'invalid-feedback');
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
  name.setAttribute('class', 'is-valid form-control');
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
  name.setAttribute('class', 'is-valid form-control');
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
  name.setAttribute('class', 'is-valid form-control');
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
  email.setAttribute('class', 'is-valid form-control');
}

function passwordCheck() {
  const password = document.querySelector('#password');
  const reg1 = /\w{8,}/;
  const reg2 = /[0-9]/g
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
  password.setAttribute('class', 'is-valid form-control');
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
  password.setAttribute('class', 'is-valid form-control');
}

function addressCheck() {
  const address = document.querySelector('#address');
}