
  document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const navToggle = document.querySelector(".nav-toggle");

    let isOpen = false;

    const handleMenuToggle = () => {
      isOpen = !isOpen;
      if (isOpen) {
        navbar.classList.add("open");
      } else {
        navbar.classList.remove("open");
      }
    };

    navToggle.addEventListener("click", handleMenuToggle);
  });
