// script.js

function showLoader() {
  document.querySelector('.loader-wrapper').style.display = 'flex';
}

function hideLoader() {
  document.querySelector('.loader-wrapper').style.display = 'none';
}

showLoader();

setTimeout(hideLoader, 2000);


document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(".fade-element");

  function checkFade() {
    for (const element of fadeElements) {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const isVisible = elementTop < window.innerHeight && elementBottom >= 0;

      if (isVisible) {
        element.style.opacity = "1";
        element.style.transform = "scale(1)";
      }
    }
  }

  window.addEventListener("scroll", checkFade);

  checkFade();
});

function checkScroll() {
  const scrollBtn = document.getElementById('scroll-top');
  if (window.scrollY >= 1000) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
}

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', checkScroll);




// Keep track of the currently open dropdown
var currentDropdown = null;

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction(dropdownId) {
    var dropdown = document.getElementById(dropdownId);

    // If a dropdown is already open and it's not the clicked one, close it
    if (currentDropdown && currentDropdown !== dropdown) {
        currentDropdown.classList.remove("show");
    }

    dropdown.classList.toggle("show");

    // Update the currently open dropdown
    currentDropdown = dropdown;
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
    if (!e.target.matches('.nav-button')) {
        var dropdowns = document.getElementsByClassName("dropdbtn");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }

        // Reset the currentDropdown variable when clicking outside
        currentDropdown = null;
    }
};


$(document).ready(function () {
  const iconsContainer = $('.icons');
  const prevButton = $('#prev-btn');
  const nextButton = $('#next-btn');
  const textInfoContainer = $('#text-info');
  const imageInfoContainer = $('#image-info');
  const textInfoHeader = $('.text-header'); // Change the selector to target the class

  iconsContainer.on('afterChange', function (event, slick, currentSlide) {
    updateButtonsVisibility(slick, currentSlide);
  });

  iconsContainer.on('click', 'img', function () {
    const text = $(this).data('text');
    const name = $(this).data('name');
    const image = $(this).data('image');

    // Update the content in the text info container
    textInfoContainer.text(text);

    // Update the content in the text header container with the name
    textInfoHeader.html(`
      <h1>${name}</h1>
      <p>${text}</p>
    `);

    // Update the content in the image info container
    imageInfoContainer.html(`
      <img src="${image}" alt="Additional Image">
    `);
  });

  function updateButtonsVisibility(slick, currentSlide) {
    const slideCount = slick.slideCount;
    const slidesToShow = slick.options.slidesToShow;
    const lastSlideIndex = slideCount - slidesToShow;

    if (currentSlide === 0) {
      prevButton.hide();
    } else {
      prevButton.show();
    }

    if (currentSlide >= lastSlideIndex) {
      nextButton.hide();
    } else {
      nextButton.show();
    }
  }

  iconsContainer.slick({
    slidesToShow: 8,
    slidesToScroll: 8,
    infinite: false,
    prevArrow: prevButton,
    nextArrow: nextButton
  });

  updateButtonsVisibility(iconsContainer.slick('getSlick'), 0);
});
