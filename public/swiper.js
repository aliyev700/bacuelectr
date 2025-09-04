
const checkbox = document.getElementById("themeCheckbox");
const body = document.body;
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const ball = document.getElementById("toggleBall");

checkbox.addEventListener("change", () => {
  body.classList.toggle("dark", checkbox.checked);

  if (checkbox.checked) {
   
    ball.style.transform = "translateX(32px)";
    sun.style.opacity = "0";
    moon.style.opacity = "1";
  } else {
    
    ball.style.transform = "translateX(0)";
    sun.style.opacity = "1";
    moon.style.opacity = "0";
  }
});

const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
