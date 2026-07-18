(() => {
  "use strict";

  const menuButton = document.querySelector("#menuButton");
  const navigation = document.querySelector("#mainNav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
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

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const privateForm = document.querySelector("#privateContactForm");
  const privateStatus = document.querySelector("#privateContactStatus");
  document.querySelectorAll("[data-contact-open]").forEach((button) => {
    button.addEventListener("click", () => {
      privateForm?.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => privateForm?.querySelector("input")?.focus(), 450);
    });
  });

  if (privateForm) {
    privateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(privateForm);
      const name = String(data.get("name") || "").trim();
      const reply = String(data.get("reply") || "").trim();
      const subjectText = String(data.get("subject") || "Website contact").trim();
      const message = String(data.get("message") || "").trim();
      if (!name || !reply || !subjectText || !message) {
        if (privateStatus) privateStatus.textContent = "Please complete all required fields.";
        return;
      }
      const target = atob("ZmFzd2FkQHVvbW9zdWwuZWR1Lmlx");
      const subject = `[Website] ${subjectText}`;
      const body = [
        `Name: ${name}`,
        `Reply email: ${reply}`,
        "",
        message,
        "",
        `Page: ${window.location.href}`
      ].join("\n");
      if (privateStatus) privateStatus.textContent = "Opening your email application…";
      window.location.href = `mailto:${target}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
  } else {
    document.querySelectorAll(".reveal").forEach((node) => {
      node.classList.add("is-visible");
    });
  }
})();
