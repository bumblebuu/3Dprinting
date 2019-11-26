const loginBtn = document.getElementById('login-btn');
/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById('mySidebar').style.right = '0';
  document.getElementById('picture').style.width = '35vw';
  if (loginBtn) {
    loginBtn.style.left = '73%';
  } else {
    document.getElementById('user-pic-div').style.left = '75%';
    document.querySelector('.dropdown-user').style.display = 'none';
  }
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById('mySidebar').style.right = '-300px';
  document.getElementById('picture').style.width = '50vw';
  if (loginBtn){
    loginBtn.style.left = '90%';
  } else {
    document.getElementById('user-pic-div').style.left = '92%';
  }
}

//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
const dropdown = document.getElementsByClassName('dropdown-btn');
let i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener('click', function () {
    this.classList.toggle('active');
    const dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === 'block') {
      dropdownContent.style.display = 'none';
    } else {
      dropdownContent.style.display = 'block';
    }
  });
}
