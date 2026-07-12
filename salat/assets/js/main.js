(() => {
  "use strict";

  const config = window.APP_CONFIG || {};
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const menuButton = $("#menuButton");
  const nav = $("#mainNav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });

    $$("a", nav).forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  $$("[data-version]").forEach((node) => {
    node.textContent = config.version || "1.0.0";
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

  // The exact URL is also present directly in the HTML as a fallback.
  $$(".js-apk-download").forEach((button) => {
    if (config.apkUrl) button.href = config.apkUrl;
    button.removeAttribute("aria-disabled");
  });

  const galleryDialog = $("#galleryDialog");
  const galleryImage = $("#galleryDialogImage");
  const galleryCaption = $("#galleryDialogCaption");
  const galleryClose = $("#galleryClose");

  $$(".gallery-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      if (!galleryDialog || !galleryImage) return;
      galleryImage.src = button.dataset.image || "";
      galleryImage.alt = button.dataset.alt || "";
      if (galleryCaption) galleryCaption.textContent = button.dataset.caption || "";
      galleryDialog.showModal();
    });
  });

  if (galleryDialog && galleryClose) {
    galleryClose.addEventListener("click", () => galleryDialog.close());
    galleryDialog.addEventListener("click", (event) => {
      if (event.target === galleryDialog) galleryDialog.close();
    });
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    $$(".reveal").forEach((node) => revealObserver.observe(node));
  } else {
    $$(".reveal").forEach((node) => node.classList.add("is-visible"));
  }
})();
