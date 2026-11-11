document.addEventListener("DOMContentLoaded", () => {
  // ==================================
  // 1. MOBILE NAVIGATION
  // ==================================

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation",
      );

      menuButton.textContent = isOpen ? "×" : "☰";
    });

    // Close menu after clicking a link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.setAttribute("aria-label", "Open navigation");

        menuButton.textContent = "☰";
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.setAttribute("aria-label", "Open navigation");

        menuButton.textContent = "☰";

        menuButton.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        nav.classList.remove("open");

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.setAttribute("aria-label", "Open navigation");

        menuButton.textContent = "☰";
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760 && nav.classList.contains("open")) {
        nav.classList.remove("open");

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.setAttribute("aria-label", "Open navigation");

        menuButton.textContent = "☰";
      }
    });
  }

  // Keep unavailable local photos from leaving broken-image icons.
  document
    .querySelectorAll(".about-visual img, .day-life img")
    .forEach((image) => {
      const useIllustrationFallback = () => {
        image
          .closest(".about-visual, .day-life")
          .classList.add("image-unavailable");

        image.hidden = true;
      };

      image.addEventListener("error", useIllustrationFallback, { once: true });

      if (image.complete && image.naturalWidth === 0) {
        useIllustrationFallback();
      }
    });

  // Let visitors highlight skills they want to call out.
  document.querySelectorAll(".tags button").forEach((skill) => {
    skill.addEventListener("click", () => {
      const isSelected = skill.getAttribute("aria-pressed") === "true";

      skill.setAttribute("aria-pressed", String(!isSelected));
    });
  });

  // ==================================
  // 2. AUTOMATIC FOOTER YEAR
  // ==================================

  document.querySelectorAll(".year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
});
