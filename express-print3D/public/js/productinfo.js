function showReview() {
  document.getElementById('review').classList.toggle('show');
}

function onCancel() {
  document.getElementById('review').classList.toggle('show');
}


function countAvg(product) {
  let avg;
  let sum = 0;
  let count = 0;
  const nums = product.reviews.map(item => item.rate);
  if (nums[0] == undefined) {
    avg = 0;
  } else {
    for (let i = 0; i < nums.length; i++) {
      const num = parseInt(nums[i]);
      sum += num;
      count += 1;
    }
    avg = sum / count;
  }
  return avg;
}

let slideIndex = 1;
window.addEventListener('load', () => {
  showSlides(slideIndex);
});

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName('mySlides');
  const dots = document.getElementsByClassName('demo');
  const captionText = document.getElementById('caption');
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

function toggleDisabled(event) {
  const {
    id,
  } = event.target.dataset;
  const disabledElement = document.querySelector(`.edit[data-id="${id}"]`);
  const hiddenElement = document.querySelector(`.hide[data-id="${id}"]`);

  if (disabledElement.disabled === false) {
    disabledElement.disabled = true;
  } else {
    disabledElement.disabled = false;
  }
  hiddenElement.classList.toggle('hidden');
}

function updateReview(user, review) {
  const newText = event.target.previousElementSibling;
  fetch(`http://localhost:3000/products/reviews/${review}`).then(response => response.json()).then((reviewToEdit) => {
    reviewToEdit.text = newText.value;
    fetch(`http://localhost:3000/products/reviews/edit/${review}`, {
      method: 'PUT',
      body: JSON.stringify(reviewToEdit),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
  });

  newText.disabled = true;
  event.target.classList.toggle('hidden');
}
