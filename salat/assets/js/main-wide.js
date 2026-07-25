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
    node.textContent = config.version || "1.0.1";
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


  async function refreshReleaseDownloadStats() {
    const countNode = $("[data-download-count]");
    const noteNode = $("[data-download-count-note]");
    if (!countNode || !config.githubRepo) return;

    const cacheKey = `salat-fm-download-count:${config.githubRepo}`;
    try {
      const cachedRaw = sessionStorage.getItem(cacheKey);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        if (Date.now() - cached.savedAt < 15 * 60 * 1000) {
          countNode.textContent = new Intl.NumberFormat("ar-IQ").format(cached.count);
          if (cached.latestUrl && !config.preferLocalApk) {
            $$(".js-apk-download").forEach((button) => {
              button.href = cached.latestUrl;
              button.removeAttribute("download");
            });
          }
          if (noteNode) noteNode.textContent = cached.note;
          return;
        }
      }
    } catch (_) {}

    try {
      const response = await fetch(`https://api.github.com/repos/${config.githubRepo}/releases?per_page=100`, {
        headers: {
          "Accept": "application/vnd.github+json",
          "X-GitHub-Api-Version": "2026-03-10"
        }
      });
      if (!response.ok) throw new Error(`GitHub API ${response.status}`);

      const releases = await response.json();
      const assetName = config.releaseAssetName || config.apkFileName;
      let total = 0;
      let latestUrl = "";

      for (const release of releases) {
        if (release.draft) continue;
        for (const asset of release.assets || []) {
          if (asset.name !== assetName) continue;
          total += Number(asset.download_count || 0);
          if (!latestUrl) latestUrl = asset.browser_download_url || "";
        }
      }

      const note = latestUrl
        ? "العدد من GitHub Releases ويجمع تنزيلات ملف APK المنشور عبر الإصدارات."
        : "لم يُنشر APK عبر GitHub Releases بعد؛ التنزيلات القديمة من ملف Pages الثابت لا يمكن استرجاع عددها.";
      countNode.textContent = new Intl.NumberFormat("ar-IQ").format(total);
      if (noteNode) noteNode.textContent = note;

      if (latestUrl && !config.preferLocalApk) {
        $$(".js-apk-download").forEach((button) => {
          button.href = latestUrl;
          button.removeAttribute("download");
        });
      }

      try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ count: total, latestUrl, note, savedAt: Date.now() }));
      } catch (_) {}
    } catch (_) {
      countNode.textContent = "—";
      if (noteNode) noteNode.textContent = "تعذر قراءة إحصائية التنزيل الآن؛ رابط APK المحلي يبقى متاحًا.";
    }
  }

  refreshReleaseDownloadStats();

})();
