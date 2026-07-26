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


  $$('[data-release-date]').forEach((node) => {
    node.textContent = config.releaseDate || "—";
  });

  $$('[data-min-android]').forEach((node) => {
    node.textContent = config.minimumAndroid || "Android 7.0 (API 24)";
  });

  $$('[data-cert-sha]').forEach((node) => {
    node.textContent = config.certificateSha256 || "—";
  });
  $$("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const downloadButtons = $$(".js-apk-download");
  const applyDownloadUrl = (url, isGithub = false) => {
    if (!url) return;
    downloadButtons.forEach((button) => {
      button.href = url;
      button.removeAttribute("aria-disabled");
      button.classList.remove("is-disabled");
      if (isGithub) button.removeAttribute("download");
      else if (config.apkFileName) button.setAttribute("download", config.apkFileName);
    });
  };

  if (config.releaseReady && config.apkUrl) {
    applyDownloadUrl(config.apkUrl, false);
  }

  // GitHub Releases هو المسار المفضل فقط عندما يطابق الملف المنشور الإصدار والحجم والبصمة المتوقعة.
  const loadGithubReleaseInfo = async () => {
    const repo = config.githubRepo;
    const wantedName = config.githubAssetName;
    if (!repo || !wantedName) return;
    try {
      const allResponse = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`, {
        headers: { Accept: "application/vnd.github+json" }
      });
      if (!allResponse.ok) throw new Error("GitHub releases unavailable");
      const releases = await allResponse.json();
      const expectedDigest = config.sha256 ? `sha256:${config.sha256.toLowerCase()}` : "";
      const expectedSize = Number(config.apkSizeBytes || 0);

      const officialApk = (name = "") => {
        const lower = name.toLowerCase();
        return lower.endsWith(".apk") &&
          (lower === wantedName.toLowerCase() || lower.startsWith("salat_fm") || lower.includes("prayer-display"));
      };

      let currentAsset = null;
      for (const release of releases) {
        const releaseLabel = `${release.tag_name || ""} ${release.name || ""}`.toLowerCase();
        if (!releaseLabel.includes("1.0.1")) continue;
        const candidate = (release.assets || []).find((asset) => {
          if (asset.name !== wantedName) return false;
          if (expectedSize && asset.size !== expectedSize) return false;
          const digest = (asset.digest || "").toLowerCase();
          return !digest || !expectedDigest || digest === expectedDigest;
        });
        if (candidate) {
          currentAsset = candidate;
          break;
        }
      }
      if (currentAsset?.browser_download_url) applyDownloadUrl(currentAsset.browser_download_url, true);

      const total = releases.reduce((sum, release) => sum + (release.assets || [])
        .filter((asset) => officialApk(asset.name))
        .reduce((assetSum, asset) => assetSum + (asset.download_count || 0), 0), 0);
      $$('[data-download-count]').forEach((node) => {
        node.textContent = total.toLocaleString("ar-IQ");
      });
    } catch (_) {
      $$('[data-download-count]').forEach((node) => {
        node.textContent = "يتوفر العدد عند الاتصال بـ GitHub";
      });
    }
  };
  loadGithubReleaseInfo();

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


  const supportForm = $("#supportForm");
  const supportFormStatus = $("#supportFormStatus");
  if (supportForm) {
    supportForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const value = (id) => $(id)?.value.trim() || "غير مذكور";
      const report = [
        "تقرير مشكلة Salat_FM",
        `التطبيق: Salat_FM ${value("#supportAppVersion")}`,
        `الجهاز/الشركة: ${value("#supportDevice")}`,
        `الموديل: ${value("#supportModel")}`,
        `إصدار Android: ${value("#supportAndroid")}`,
        `وصف المشكلة: ${value("#supportIssue")}`,
        `الخطوات التي جُرّبت: ${value("#supportTried")}`,
        "يرجى إرفاق تقرير التشخيص المنشأ من داخل التطبيق إن أمكن."
      ].join("\n");
      try {
        await navigator.clipboard.writeText(report);
        if (supportFormStatus) supportFormStatus.textContent = "تم نسخ نموذج المشكلة. راجعه ثم أرسله إلى masjidstime@gmail.com.";
      } catch (_) {
        window.prompt("انسخ تقرير المشكلة:", report);
        if (supportFormStatus) supportFormStatus.textContent = "ظهر التقرير في نافذة للنسخ اليدوي.";
      }
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
