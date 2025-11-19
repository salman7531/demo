// Smooth scrolling and active nav link
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const searchInput = document.getElementById("searchInput");
  const productCards = document.querySelectorAll(".product-card");
  const categoryTabs = document.querySelectorAll(".category-tab");

  const modal = document.getElementById("videoModal");
  const modalOverlay = modal.querySelector(".modal-overlay");
  const modalClose = modal.querySelector(".modal-close");
  const demoVideo = document.getElementById("demoVideo");
  const viewDemoButtons = document.querySelectorAll(".view-demo");

  const yearSpan = document.getElementById("yearSpan");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Smooth scroll for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = link.getAttribute("href");
      if (target && target.startsWith("#")) {
        e.preventDefault();
        const section = document.querySelector(target);
        if (section) {
          const headerOffset = header.offsetHeight;
          const elementPosition = section.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset + 4;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
        // Close mobile nav
        if (mainNav.classList.contains("open")) {
          mainNav.classList.remove("open");
        }
      }
    });
  });

  // Highlight active section in nav
  const onScroll = () => {
    const scrollPos = window.scrollY + header.offsetHeight + 20;
    sections.forEach((section) => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        const id = section.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  // Mobile nav toggle
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  // Search filter
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();
      productCards.forEach((card) => {
        const name = card.dataset.name ? card.dataset.name.toLowerCase() : "";
        const category = card.dataset.category ? card.dataset.category.toLowerCase() : "";
        const matches =
          name.includes(query) ||
          category.includes(query) ||
          query.length === 0;

        card.style.display = matches ? "" : "none";
      });
    });
  }

  // Category tab click -> scroll to section
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.target;
      const targetSection = document.getElementById(targetId);

      categoryTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      if (targetSection) {
        const headerOffset = header.offsetHeight;
        const elementPosition =
          targetSection.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset + 4;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Modal open
  const openModal = (videoUrl) => {
    if (!videoUrl) return;
    demoVideo.src = `${videoUrl}?autoplay=1`;
    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");
  };

  // Modal close
  const closeModal = () => {
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
    demoVideo.src = "";
  };

  modalOverlay.addEventListener("click", closeModal);
  modalClose.addEventListener("click", closeModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-visible")) {
      closeModal();
    }
  });

  // Attach click to "Watch Demo" buttons
  viewDemoButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = btn.closest(".product-card");
      if (!card) return;
      const videoUrl = card.dataset.video;
      openModal(videoUrl);
    });
  });

  // Also allow clicking anywhere on card
  productCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Avoid double trigger if clicking button
      if (e.target.closest(".view-demo")) return;
      const videoUrl = card.dataset.video;
      openModal(videoUrl);
    });
  });
});
