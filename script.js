document.addEventListener("DOMContentLoaded", function () {
  // --- Hero Section Carousel Logic (NEW) ---
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showNextSlide() {
    // Hide the current slide by removing its class
    slides[currentSlide].classList.remove("active-slide");

    // Increment the slide index, and loop back to 0 if at the end
    currentSlide = (currentSlide + 1) % slides.length;

    // Show the next slide by adding the active class
    slides[currentSlide].classList.add("active-slide");
  }

  // Set the first slide to be active on load
  slides[currentSlide].classList.add("active-slide");

  // Automatically change the slide every 5 seconds (5000 milliseconds)
  setInterval(showNextSlide, 5000);

  // --- Dropdown Menu Logic (UPDATED for mobile clicks) ---
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("mouseenter", function (event) {
      // Toggle the 'show-dropdown' class on the clicked dropdown
      this.classList.toggle("show-dropdown");

      // Close other dropdowns if they are open
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== this) {
          otherDropdown.classList.remove("show-dropdown");
        }
      });
    });
  });

  // Close menus if clicking outside of them
  window.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("show-dropdown");
      });
    }
  });

  // --- Mobile Menu Toggle ---
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // --- Animate Hero Text on Page Load ---
  window.addEventListener("load", () => {
    document.querySelector(".hero h1").style.opacity = "1";
    document.querySelector(".hero h1").style.transform = "translateY(0)";

    document.querySelector(".hero-sectors").style.opacity = "1";
    document.querySelector(".hero-sectors").style.transform = "translateY(0)";
  });
});

// About us section
// Add staggered animation for cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".image-card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
});

// Core values
document.addEventListener("DOMContentLoaded", () => {
  const valuesGrid = document.querySelector(".values-grid");
  const prevButton = document.querySelector(".nav-button.prev");
  const nextButton = document.querySelector(".nav-button.next");
  const valueCards = document.querySelectorAll(".value-card");

  // Function to scroll to the next or previous card group
  const scrollCards = (direction) => {
    if (!valuesGrid || valueCards.length === 0) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    let scrollAmount;

    if (isMobile) {
      // Scroll one card at a time on mobile
      scrollAmount = valueCards[0].offsetWidth + 15; // 15px is the gap
    } else {
      // Scroll four cards at a time on desktop
      scrollAmount = (valueCards[0].offsetWidth + 20) * 4; // 20px is the gap
    }

    const currentScroll = valuesGrid.scrollLeft;

    if (direction === "next") {
      valuesGrid.scroll({
        left: currentScroll + scrollAmount,
        behavior: "smooth",
      });
    } else if (direction === "prev") {
      valuesGrid.scroll({
        left: currentScroll - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Event listeners for navigation buttons
  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => scrollCards("prev"));
    nextButton.addEventListener("click", () => scrollCards("next"));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const valuesGrid = document.querySelector(".values-grid");
  const prevButton = document.querySelector(".nav-button.prev");
  const nextButton = document.querySelector(".nav-button.next");
  const scrollAmount = 250; // Adjust this value to change how much it scrolls

  if (valuesGrid && prevButton && nextButton) {
    nextButton.addEventListener("click", () => {
      valuesGrid.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    prevButton.addEventListener("click", () => {
      valuesGrid.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });
  }
});
// Building sustain

// Add simple interactivity
const exploreBtn = document.getElementById("exploreBtn");

exploreBtn.addEventListener("click", () => {
  alert("Redirecting to our Goal & SDG page...");
  // You can replace alert with actual redirect like:
  // window.location.href = "goals.html";
});

// Optional: fade-in animation when section enters view
const section = document.querySelector(".sustainable-section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      section.classList.add("visible");
    }
  });
});

observer.observe(section);

// Leadership section

// const leaderCards = document.querySelectorAll(".leader-card");

// const observers = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("visible");
//         observers.unobserve(entry.target); // This will prevent continous animation
//       }
//     });
//   },
//   { threshold: 0.2 }
// );

// leaderCards.forEach((card) => observers.observe(card));

// document.addEventListener("DOMContentLoaded", () => {
//   const leaderImages = document.querySelectorAll(".leader-image");
//   const imageSize = 400; // Consistent size for random images
// });

// footer

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup-form");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevents the page from reloading on form submission

      const firstName = form.querySelector('input[type="text"]').value;
      const email = form.querySelector('input[type="email"]').value;

      console.log("Form Submission Details:");
      console.log(`First Name: ${firstName}`);
      console.log(`Email: ${email}`);

      alert(
        "Thank you for subscribing! Check the console for submission details."
      );
    });
  }
});
