Stripe.setPublishableKey('pk_test_416dydOsOgQomWYLP1shxD6p005uIuHuiV');

const $form = $('#checkout-form');

const error = false;

(function () {
  window.addEventListener('load', () => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    const validation = Array.prototype.filter.call(forms, (form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
}());

$form.submit((event) => {
  $('.payment-errors').addClass('d-none');
  $form.find('#subbtn').prop('disabled', true);
  Stripe.card.createToken({
    number: $('#cc-number').val(),
    name: $('#cc-name').val(),
    cvc: $('#cc-cvc').val(),
    exp_month: $('#cc-exp-month').val(),
    exp_year: $('#cc-exp-year').val(),
  }, stripeResponseHandler);
  return false;
});

function stripeResponseHandler(status, response) {
  if (response.error) {
    $('.payment-errors').text(response.error.message);
    $('.payment-errors').removeClass('d-none');
    $form.find('#subbtn').prop('disabled', false);
  } else {
    const token = response.id;
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    $form.get(0).submit();
  }
}
