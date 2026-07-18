(() => {
  "use strict";

  const config = window.APP_CONFIG || {};
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const menuButton = $("#menuButton");
  const navigation = $("#mainNav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      navigation.classList.toggle("is-open", !isOpen);
    });

    $$("a", navigation).forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });

    const closeMenu = () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    };

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!navigation.classList.contains("is-open")) return;
      if (navigation.contains(event.target) || menuButton.contains(event.target)) return;
      closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  $$("[data-version]").forEach((node) => {
    node.textContent = config.version || "1.0.0";
  });

  $$("[data-build]").forEach((node) => {
    node.textContent = config.buildNumber || "—";
  });

  $$("[data-apk-size]").forEach((node) => {
    node.textContent = config.apkSize || "—";
  });

  $$("[data-apk-sha]").forEach((node) => {
    node.textContent = config.sha256 || "—";
  });

  $$("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  // Keep a direct href in the HTML, then refresh it from config.
  $$(".js-apk-download").forEach((button) => {
    if (config.apkUrl) button.href = config.apkUrl;
  });

  const modal = $("#imageModal");
  const modalImage = $("#imageModalPicture");
  const modalCaption = $("#imageModalCaption");
  const modalClose = $("#imageModalClose");

  $$(".image-zoom").forEach((button) => {
    button.addEventListener("click", () => {
      if (!modal || !modalImage) return;
      modalImage.src = button.dataset.image || "";
      modalImage.alt = button.dataset.alt || "";
      if (modalCaption) modalCaption.textContent = button.dataset.caption || "";
      modal.showModal();
    });
  });

  if (modal && modalClose) {
    modalClose.addEventListener("click", () => modal.close());
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.close();
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    $$(".reveal").forEach((node) => observer.observe(node));
  } else {
    $$(".reveal").forEach((node) => node.classList.add("is-visible"));
  }
})();
