document.addEventListener("DOMContentLoaded", function () {
  // --- Hero Section Carousel Logic  ---
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showNextSlide() {
    slides[currentSlide].classList.remove("active-slide");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active-slide");
  }

  if (slides.length > 0) {
    slides[currentSlide].classList.add("active-slide");
    setInterval(showNextSlide, 5000);
  }

  // --- Dropdown Menu Logic (FIXED: Mobile Click persistence) ---
  const dropdowns = document.querySelectorAll(".dropdown");
  const navLinks = document.getElementById("nav-links");
  const menuToggle = document.getElementById("menu-toggle");

  const MOBILE_BREAKPOINT = 1024;

  dropdowns.forEach((dropdown) => {
    const dropdownLink = dropdown.querySelector("a");

    dropdown.addEventListener("mouseenter", function (event) {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        this.classList.add("show-dropdown");
        // Close other dropdown wen one of the dropdown is clicked
        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== this) {
            otherDropdown.classList.remove("show-dropdown");
          }
        });
      }
    });

    dropdown.addEventListener("mouseleave", function (event) {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        this.classList.remove("show-dropdown");
      }
    });

    dropdownLink.addEventListener("click", function (event) {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        const subMenu = dropdown.querySelector(".dropdown-menu");

        // Only prevent default if there's a submenu to open
        if (subMenu && subMenu.children.length > 0) {
          event.preventDefault();
        }

        dropdown.classList.toggle("show-dropdown");

        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove("show-dropdown");
          }
        });
      }
    });
  });

  window.addEventListener("click", function (event) {
    if (
      window.innerWidth > MOBILE_BREAKPOINT &&
      !event.target.closest(".dropdown")
    ) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("show-dropdown");
      });
    }
  });

  // --- Mobile Menu Toggle (Hamburger/Cross Icon) ---
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  // --- Close Mobile Menu on Sub-Link Click (After navigating) ---
  const navLinksList = document.querySelectorAll("#nav-links a");
  navLinksList.forEach((link) => {
    link.addEventListener("click", () => {
      // Check if the menu is open AND it's a mobile size
      if (
        window.innerWidth <= MOBILE_BREAKPOINT &&
        navLinks.classList.contains("active")
      ) {
        // We only close the menu if the click is not on a dropdown parent
        if (!link.closest(".dropdown")) {
          setTimeout(() => {
            navLinks.classList.remove("active");
            if (menuToggle) menuToggle.classList.remove("active");

            dropdowns.forEach((dropdown) => {
              dropdown.classList.remove("show-dropdown");
            });
          }, 50);
        }
      }
    });
  });

  // --- Hero text animationnnnnn
  window.addEventListener("load", () => {
    const heroH1 = document.querySelector(".hero h1");
    const heroSectors = document.querySelector(".hero-sectors");

    if (heroH1) {
      heroH1.style.opacity = "1";
      heroH1.style.transform = "translateY(0)";
    }
    if (heroSectors) {
      heroSectors.style.opacity = "1";
      heroSectors.style.transform = "translateY(0)";
    }
  });

  // --- **NEW** Search Icon/API Functionality UI ---
  const searchToggle = document.getElementById("search-toggle");
  const searchOverlay = document.getElementById("search-overlay");
  const closeSearch = document.getElementById("close-search");
  const searchForm = document.querySelector(".search-form");
  const searchInput = document.querySelector(".search-form input");

  // Show search overlay
  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener("click", (event) => {
      event.preventDefault();
      // Close mobile menu if open
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");

      searchOverlay.classList.add("active");
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 50);
    });
  }

  // Hide search overlay
  function closeSearchOverlay() {
    if (searchOverlay) {
      searchOverlay.classList.remove("active");
    }
  }

  if (closeSearch) {
    closeSearch.addEventListener("click", closeSearchOverlay);
  }

  // Handle escape key to close
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchOverlay.classList.contains("active")) {
      closeSearchOverlay();
    }
  });

  // Handle outside click to close
  if (searchOverlay) {
    searchOverlay.addEventListener("click", (event) => {
      if (event.target === searchOverlay) {
        closeSearchOverlay();
      }
    });
  }

  // Mock search submission (client-side only for UI)
  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        alert(`Performing search for: "${query}" (Simulated API call)`);
        // In a real application, you would make an API call here.
        // E.g., fetch('/api/search?q=' + encodeURIComponent(query))
        closeSearchOverlay();
        searchInput.value = ""; // Clear input after search
      } else {
        alert("Please enter a search term.");
      }
    });
  }
});

// About us section
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
      scrollAmount = valueCards[0].offsetWidth + 20; // 20px is the gap
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
  const scrollAmount = 250;

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

// Buiikding sustainable section

// Add simple interactivity
const exploreBtn = document.getElementById("exploreBtn");

if (exploreBtn) {
  exploreBtn.addEventListener("click", () => {
    alert("Redirecting to our Goal & SDG page...");
    // window.location.href = "goals.html";
  });
}

// Animation effecr when section enter
const section = document.querySelector(".sustainable-section");

if (section) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        section.classList.add("visible");
      }
    });
  });

  observer.observe(section);
}

// footer

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup-form");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevents the page from reloading on form submission

      const firstNameInput = form.querySelector('input[type="text"]');
      const emailInput = form.querySelector('input[type="email"]');

      const firstName = firstNameInput ? firstNameInput.value : "N/A";
      const email = emailInput ? emailInput.value : "N/A";

      console.log("Form Submission Details:");
      console.log(`First Name: ${firstName}`);
      console.log(`Email: ${email}`);

      alert("Thank you for subscribing!!!!!");

      // Optional: Clear fields
      if (firstNameInput) firstNameInput.value = "";
      if (emailInput) emailInput.value = "";
    });
  }
});
