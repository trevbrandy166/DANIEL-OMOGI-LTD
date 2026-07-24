// ===== MOBILE NAVIGATION =====
function initMobileNav() {
  const navMenu = document.getElementById("navMenu");
  const navToggle = document.getElementById("navToggle");

  if (!navMenu || !navToggle) {
    console.log("Mobile nav elements not found");
    return;
  }

  // Remove old listeners to prevent duplicates
  const newToggle = navToggle.cloneNode(true);
  navToggle.parentNode.replaceChild(newToggle, navToggle);

  const newMenu = navMenu.cloneNode(true);
  navMenu.parentNode.replaceChild(newMenu, navMenu);

  // Re-select after clone
  const freshToggle = document.getElementById("navToggle");
  const freshMenu = document.getElementById("navMenu");

  function toggleNav() {
    freshMenu.classList.toggle("active");
    freshToggle.classList.toggle("active");
  }

  // Click event for hamburger
  freshToggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    toggleNav();
  });

  // Touch event for hamburger
  freshToggle.addEventListener("touchend", function (e) {
    e.preventDefault();
    e.stopPropagation();
    toggleNav();
  });

  // Handle dropdown on mobile
  const dropdown = freshMenu.querySelector(".dropdown");
  const dropdownLink = dropdown ? dropdown.querySelector("a") : null;
  const dropdownMenu = dropdown
    ? dropdown.querySelector(".dropdown-menu")
    : null;

  if (dropdownLink && dropdownMenu) {
    dropdownLink.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle("active");
      }
    });

    dropdownLink.addEventListener("touchend", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle("active");
      }
    });
  }

  // Close when clicking a link (except dropdown toggle)
  freshMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // Don't close if it's the dropdown toggle on mobile
      if (
        link.parentElement.classList.contains("dropdown") &&
        window.innerWidth <= 768
      ) {
        return;
      }
      freshMenu.classList.remove("active");
      freshToggle.classList.remove("active");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", function (e) {
    if (!freshMenu.contains(e.target) && !freshToggle.contains(e.target)) {
      freshMenu.classList.remove("active");
      freshToggle.classList.remove("active");
    }
  });
}

// ===== AOS INIT =====
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
      disable: function () {
        return window.innerWidth < 768;
      },
    });
  }
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
  const counters = document.querySelectorAll(".counter");
  if (counters.length === 0) return;

  const speed = 200;

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText.replace(/\D/g, "") || 0;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(animateCounters, 20);
      } else {
        counter.innerText =
          target + (counter.getAttribute("data-suffix") || "");
      }
    });
  };

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
}

// ===== TYPING EFFECT =====
function initTyping() {
  const typingElement = document.querySelector(".typing-effect");
  if (!typingElement) return;

  const text = typingElement.getAttribute("data-text");
  if (!text) return;

  let index = 0;
  typingElement.textContent = "";

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
function initSlider() {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".slider-dot");

  if (slides.length === 0) return;

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

  showSlide(0);
  const interval = setInterval(nextSlide, 5000);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(interval);
      showSlide(index);
    });
  });
}

// // ===== IMAGE MARQUEE =====
// function initMarquee() {
//   const marqueeTrack = document.querySelector(".marquee-track");
//   if (marqueeTrack) {
//     const items = marqueeTrack.innerHTML;
//     marqueeTrack.innerHTML = items + items;
//   }
// }

// ===== DARK MODE =====
function initDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  if (!darkModeToggle) return;

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
}

// ===== SERVICES IMAGE SLIDER =====
function initServicesSlider() {
  const track = document.getElementById("sliderTrack");
  const prevBtn = document.getElementById("sliderPrev");
  const nextBtn = document.getElementById("sliderNext");
  const dots = document.querySelectorAll("#sliderDots .slider-dot");

  if (!track || !prevBtn || !nextBtn) return;

  let currentSlide = 0;
  const totalSlides = 6;
  let autoSlideInterval;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    track.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Button events
  prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  // Dot events
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoSlide();
      goToSlide(index);
      startAutoSlide();
    });
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    },
    { passive: true },
  );

  track.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoSlide();
    },
    { passive: true },
  );

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Pause on hover
  const container = document.querySelector(".services-slider-container");
  if (container) {
    container.addEventListener("mouseenter", stopAutoSlide);
    container.addEventListener("mouseleave", startAutoSlide);
  }

  // Start auto-slide
  startAutoSlide();
}

// ===== INITIALIZE EVERYTHING =====
function initAll() {
  setTimeout(() => {
    initMobileNav();
    initAOS();
    initCounters();
    initTyping();
    initSlider();
    // initMarquee();
    initServicesSlider();
    initDarkMode();
  }, 100);
}

// ===== INIT ON DOM READY =====
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}
