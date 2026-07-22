// function toggleNav() {
//   const navMenu = document.getElementById("navMenu");
//   navMenu.classList.toggle("active");

//   // Handle dropdowns on mobile
//   const dropdowns = document.querySelectorAll(".dropdown");
//   dropdowns.forEach((dropdown) => {
//     dropdown.addEventListener("click", function (e) {
//       if (window.innerWidth <= 768) {
//         e.preventDefault();
//         this.classList.toggle("active");
//       }
//     });
//   });
// }

// // Close mobile menu when clicking a link
// document.querySelectorAll(".nav-menu a").forEach((link) => {
//   link.addEventListener("click", () => {
//     if (window.innerWidth <= 768) {
//       document.getElementById("navMenu").classList.remove("active");
//     }
//   });
// });

// ===== MOBILE NAVIGATION =====
function toggleNav() {
  const navMenu = document.getElementById("navMenu");
  navMenu.classList.toggle("active");
}

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      document.getElementById("navMenu").classList.remove("active");
    }
  });
});

// ===== AOS (Animate On Scroll) =====
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-out",
    once: true,
    offset: 100,
  });
});

// ===== ANIMATED COUNTERS =====
const counters = document.querySelectorAll(".counter");
const speed = 200;

const animateCounters = () => {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(animateCounters, 20);
    } else {
      counter.innerText = target + (counter.getAttribute("data-suffix") || "");
    }
  });
};

// Trigger counters when stats section is visible
const statsSection = document.querySelector(".stats");
if (statsSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  observer.observe(statsSection);
}

// ===== TYPING EFFECT =====
const typingElement = document.querySelector(".typing-effect");
if (typingElement) {
  const text = typingElement.getAttribute("data-text");
  let index = 0;

  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 50);
    }
  }

  type();
}

// ===== TESTIMONIAL SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".slider-dot");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  currentSlide = index;
}

function nextSlide() {
  const next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

// Auto-rotate testimonials
if (slides.length > 0) {
  showSlide(0);
  setInterval(nextSlide, 5000);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });
}

// ===== IMAGE CAROUSEL/MARQUEE =====
const marqueeTrack = document.querySelector(".marquee-track");
if (marqueeTrack) {
  // Clone items for seamless loop
  const items = marqueeTrack.innerHTML;
  marqueeTrack.innerHTML = items + items;
}

// ===== DARK MODE =====
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Check for saved preference
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
}

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});
