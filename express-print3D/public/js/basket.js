function quantityChanged(user, product, direction) {
  let newQuantity;
  if (direction === 'minus') {
    const quantityInput = event.target.nextElementSibling;
    quantityInput.value = (parseInt(quantityInput.value, 10) - 1) < 1 ? 1 : parseInt(quantityInput.value, 10) - 1;
    newQuantity = parseInt(quantityInput.value, 10);
  }
  if (direction === 'plus') {
    const quantityInput = event.target.previousElementSibling;
    quantityInput.value = (parseInt(quantityInput.value, 10) + 1);
    newQuantity = parseInt(quantityInput.value, 10);
  }
  const quantityInputs = Array.from(document.querySelectorAll('input[name="quantity"]'));
  let totalPrice = 0;
  quantityInputs.forEach((input) => {
    totalPrice += parseInt(input.parentElement.nextElementSibling.innerHTML, 10) * input.value;
  });
  document.querySelector('.total').innerHTML = `Total: $ ${totalPrice}`;
  updateBasket(user, product, newQuantity);
}

function updateBasket(user, product, newQuantity) {
  fetch(`http://localhost:3000/basket/${user}`).then(response => response.json()).then(((basket) => {
    if (basket.product === product) {
      basket.quantity = newQuantity;
    }
    console.log(basket);
    fetch(`http://localhost:3000/basket/${user}`, {
      method: 'PUT',
      body: JSON.stringify(basket),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
  }));
}
