const images = Array.from(document.querySelectorAll(".slider img"));
const dots = Array.from(document.querySelectorAll(".slider .dots li"));
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentSlide = 1;
const totalImages = images.length;
let intervalId;
let touchStartX = 0;
let touchEndX = 0;

// Function to update the active slide and dot
function checker() {
  removeActive();

  images[currentSlide - 1].classList.add("active");
  dots[currentSlide - 1].classList.add("active");

  // Disable prev button if on the first slide
  if (currentSlide === 1) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }

  // Disable next button if on the last slide
  if (currentSlide === totalImages) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
}

// Remove active class from all slides and dots
function removeActive() {
  images.forEach(function (img) {
    img.classList.remove("active");
  });
  dots.forEach(function (dot) {
    dot.classList.remove("active");
  });
}

// Next button 
nextBtn.addEventListener("click", function () {
  if (!nextBtn.classList.contains("disabled")) {
    currentSlide++;
    checker();
  } else {
      return false
  }
});

// Previous button 
prevBtn.addEventListener("click", function () {
  if (!prevBtn.classList.contains("disabled")) {
    currentSlide--;
    checker();
  } else {
    return false;
  }
});

// Dots
for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function () {
    currentSlide = parseInt(this.getAttribute("data-index"));
    checker();
  });
}

// Auto-slide 
function startSlider() {
  intervalId = setInterval(function () {
      currentSlide++
    if (currentSlide > totalImages) {
      currentSlide = 1; 
    }
    checker();
  }, 5000);
}

// Pause the slider on hover
slider.addEventListener("mouseenter", function () {
  clearInterval(intervalId);
});

// Resume auto-slide when not hovered
slider.addEventListener("mouseleave", function () {
  startSlider();
});

// Start slider
startSlider();
checker();

// Swipe functionality
document.addEventListener("touchstart", handleTouchStart);
function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].clientX;
  }

document.addEventListener("touchmove", handleTouchMove);
  function handleTouchMove(e) {
    touchEndX = e.changedTouches[0].clientX;    
  }

  
  document.addEventListener("touchend", handleTouchEnd);
function handleTouchEnd() {
  if (touchStartX - touchEndX > 50) {
    // Swipe left (next slide)
    if (currentSlide < totalImages) {
      currentSlide++;
      checker();
    }
  }

  if (touchEndX - touchStartX > 50) {
    // Swipe right (previous slide)
    if (currentSlide > 1) {
      currentSlide--;
      checker();
    }
  }
}

