function toggleForm(id) {
  const nodes = document.querySelectorAll('.user-form');

  nodes.forEach((node) => {
    node.style.display = 'none';
  });

  document.getElementById(`${id}`).style.display = 'block';
}
