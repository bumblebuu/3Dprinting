function toggleForm(id) {
  const nodes = document.querySelectorAll('.user-form');
  
  nodes.forEach((node) => {
    node.style.display = 'none';
  });

  document.getElementById(`${id}`).style.display = 'block';
}

function deleteUser() {

  const url = 'http://localhost:3000/user';

  fetch(url, {
  method: 'DELETE',
  user: req.user,
})
.then(() => {
  console.log('removed');
}).catch(err => {
 console.error(err)
});

}
