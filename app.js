const body = document.getElementById("body");
const introScreen = document.getElementById("intro-screen");
const navContainer = document.getElementById("nav-container");
const navMobileContainer = document.getElementById("nav-mobile-container");
const navMobileLinks = document.querySelectorAll("#nav-mobile-links");
const navMobileLinksContainer = document.getElementById(
  "nav-mobile-links-container"
);
const navMobileHamburgerContainer = document.getElementById(
  "nav-mobile-hamburger"
);
const navMobileHamburgerTop = document.getElementById(
  "nav-mobile-hamburger-top"
);
const navMobileHamburgerBottom = document.getElementById(
  "nav-mobile-hamburger-bottom"
);
const navMobileCloseItems = document.querySelectorAll(`[data-nav="true"]`);
const contactForm = document.getElementById("form");
const contactSuccessMessage = document.getElementById(
  "contact-success-message"
);
const footerElement = document.getElementById("footer-container");
const fadeUpArr = document.querySelectorAll(".fade-up");
const fadeDownArr = document.querySelectorAll(".fade-down");
const fadeLeftArr = document.querySelectorAll(".fade-left");
const fadeRightArr = document.querySelectorAll(".fade-right");
let isNavMenuOpen = false;

document.addEventListener("DOMContentLoaded", () => {
  // INIT PAGE ------------------------------------------------------------------------------------
  navScrollHandler();
  // Insert the current year into the element
  if (footerElement) {
    footerElement.textContent = new Date().getFullYear();
  }

  // INTRO SCREEN ------------------------------------------------------------------------------------
  window.addEventListener("load", (e) => {
    introScreen.classList.add("fade-out");
    const transitionDuration =
      parseFloat(window.getComputedStyle(introScreen).transitionDuration) *
      1000;
    setTimeout(() => {
      introScreen.style.display = "none";
    }, transitionDuration);
  });

  // FADE IN LOADING EFFECT ------------------------------------------------------------------------------------
  let options = {
    rootMarginTop: "50px",
    rootMarginBottom: "150px",
    threshold: 0.1,
  };

  let fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("fade-up");
        entry.target.classList.remove("fade-down");
        entry.target.classList.remove("fade-left");
        entry.target.classList.remove("fade-right");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, options);

  fadeUpArr.forEach((fadeUp) => {
    fadeObserver.observe(fadeUp);
  });
  fadeDownArr.forEach((fadeDown) => {
    fadeObserver.observe(fadeDown);
  });
  fadeLeftArr.forEach((fadeLeft) => {
    fadeObserver.observe(fadeLeft);
  });
  fadeRightArr.forEach((fadeRight) => {
    fadeObserver.observe(fadeRight);
  });

  // EVENT HANDLERS ------------------------------------------------------------------------------------
  // Handles bg color of nav bar on scroll
  window.addEventListener("scroll", navScrollHandler);

  function navScrollHandler() {
    if (window.scrollY <= 100) {
      navContainer.classList.remove("nav-scrolling");
      navMobileContainer.classList.remove("nav-scrolling");
    } else {
      navContainer.classList.add("nav-scrolling");
      navMobileContainer.classList.add("nav-scrolling");
    }
  }

  // Mobile nav menu handler to open menu
  navMobileHamburgerContainer.addEventListener("touchstart", (e) => {
    e.preventDefault();
    isNavMenuOpen = !isNavMenuOpen;
    mobileNavCloseHandler();
  });
  navMobileHamburgerContainer.addEventListener("click", (e) => {
    e.preventDefault();
    isNavMenuOpen = !isNavMenuOpen;
    mobileNavCloseHandler();
  });

  // Event listeners and functions to close mobile nav menu on click/touch
  navMobileCloseItems.forEach((item) => {
    item.addEventListener("touchstart", (e) => {
      isNavMenuOpen && (isNavMenuOpen = false);
      mobileNavCloseHandler();
    });

    item.addEventListener("click", (e) => {
      isNavMenuOpen && (isNavMenuOpen = false);
      mobileNavCloseHandler();
    });
  });

  function mobileNavCloseHandler() {
    if (!isNavMenuOpen) {
      navMobileHamburgerTop.classList.remove("nav-mobile-hamburger-top-close");
      navMobileHamburgerBottom.classList.remove(
        "nav-mobile-hamburger-bottom-close"
      );
      navMobileLinksContainer.classList.remove("nav-mobile-links-open");
    } else {
      navMobileHamburgerTop.classList.add("nav-mobile-hamburger-top-close");
      navMobileHamburgerBottom.classList.add(
        "nav-mobile-hamburger-bottom-close"
      );
      navMobileLinksContainer.classList.add("nav-mobile-links-open");
    }
  }

  // //  Contact form send to server and respond with success or error
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the form from being submitted

    // Get the form data
    const formData = new FormData(contactForm);
    console.dir(contactForm);
    // Send the form data to the server using an XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "sendmail.php");
    xhr.onload = function () {
      if (xhr.getResponseHeader("X-Contact-Form-Status") === "success") {
        // Display a success message
        contactSuccessMessage.innerHTML =
          "<span>&#10003;</span> Thank you! Your message has been sent";
        contactSuccessMessage.classList = "contact-success-message-show";
        setTimeout(() => {
          contactSuccessMessage.classList = "contact-success-message-hide";
        }, 2000);
        document.getElementById("contact-name").value = "";
        document.getElementById("contact-phone").value = "";
        document.getElementById("contact-email").value = "";
        document.getElementById("contact-subject").value = "";
        document.getElementById("contact-message").value = "";
      } else {
        contactSuccessMessage.innerHTML =
          "<span>&#9447;</span> Sorry there was an error, please try again later";
        contactSuccessMessage.classList = "contact-success-message-show";
        setTimeout(() => {
          contactSuccessMessage.classList = "contact-success-message-hide";
        }, 2000);
      }
    };
    xhr.send(formData);
  });

  // Insert the current year into the element
  if (footerElement) {
    footerElement.textContent = new Date().getFullYear();
  }
});
