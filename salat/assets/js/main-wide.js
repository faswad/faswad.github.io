(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const config = window.APP_CONFIG || {};

  const menuButton = $("#menuButton");
  const navigation = $("#mainNav");
  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      navigation.classList.toggle("is-open", open);
    });
    $$("a", navigation).forEach((link) => link.addEventListener("click", closeMenu));
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
    }, { passive: true });
  }

  $$('[data-version]').forEach((node) => { node.textContent = config.version || "2.6.5"; });
  $$('[data-release-date]').forEach((node) => { node.textContent = config.releaseDate || "19 يوليو 2026"; });
  $$('[data-apk-size]').forEach((node) => { node.textContent = config.apkSize || "—"; });
  $$('[data-apk-sha]').forEach((node) => { node.textContent = config.sha256 || "—"; });
  $$('[data-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });
  $$('.js-apk-download').forEach((link) => {
    if (config.apkUrl) link.href = config.apkUrl;
    if (config.apkFileName) link.setAttribute("download", config.apkFileName);
  });

  const modal = $("#imageModal");
  const modalImage = $("#imageModalPicture");
  const modalCaption = $("#imageModalCaption");
  const modalClose = $("#imageModalClose");

  $$('.image-zoom').forEach((button) => {
    button.addEventListener("click", () => {
      if (!modal || !modalImage) return;
      modalImage.src = button.dataset.image || "";
      modalImage.alt = button.dataset.alt || "";
      if (modalCaption) modalCaption.textContent = button.dataset.caption || "";
      if (typeof modal.showModal === "function") modal.showModal();
      else modal.setAttribute("open", "");
    });
  });

  if (modal && modalClose) {
    modalClose.addEventListener("click", () => modal.close?.());
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.close?.();
    });
  }

  const contactForm = $("#contactForm");
  const contactStatus = $("#contactStatus");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(contactForm);
      const name = String(data.get("name") || "").trim();
      const reply = String(data.get("reply") || "").trim();
      const topic = String(data.get("topic") || "استفسار عن Salat_FM").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !reply || !message) {
        if (contactStatus) contactStatus.textContent = "أكمل الحقول المطلوبة قبل الإرسال.";
        return;
      }

      // The address is assembled only when the visitor submits the form so it
      // is never displayed in the page markup or interface.
      const encodedParts = ["ZmFz", "d2Fk", "QHVv", "bW9z", "dWwu", "ZWR1", "Lmlx"];
      const target = atob(encodedParts.join(""));
      const subject = `[Salat_FM ${config.version || "2.6.5"}] ${topic}`;
      const body = [
        `الاسم: ${name}`,
        `وسيلة الرد: ${reply}`,
        `الموضوع: ${topic}`,
        "",
        message,
        "",
        `الصفحة: ${window.location.href}`
      ].join("\n");

      if (contactStatus) contactStatus.textContent = "سيتم الآن فتح تطبيق البريد برسالة جاهزة.";
      window.location.href = `mailto:${target}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    $$('.reveal').forEach((node) => observer.observe(node));
  } else {
    $$('.reveal').forEach((node) => node.classList.add("is-visible"));
  }
})();
