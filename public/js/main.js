function toggleNav() {
  const navMenu = document.getElementById("navMenu");
  navMenu.classList.toggle("active");

  // Handle dropdowns on mobile
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.classList.toggle("active");
      }
    });
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      document.getElementById("navMenu").classList.remove("active");
    }
  });
});
