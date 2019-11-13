/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById('mySidebar').style.width = '250px';
  document.getElementById('main').style.marginRight = '250px';
  document.getElementById('dark-page').style.marginRight = '180px';
  document.getElementById('picture').style.marginLeft = '70px';
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById('mySidebar').style.width = '0';
  document.getElementById('main').style.marginRight = '0';
  document.getElementById('dark-page').style.marginRight = '0';
  document.getElementById('picture').style.marginLeft = '0';
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
      // dropdownContent.style.position = 'absolute';
      // dropdownContent.style.right = '250px';
    }
  });
}
