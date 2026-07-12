(() => {
  const c = window.APP_CONFIG || {};
  document.querySelectorAll("[data-version]").forEach(e => e.textContent = c.version || "1.0.0");
  document.querySelectorAll("[data-size]").forEach(e => e.textContent = c.apkSize || "—");
  document.querySelectorAll("[data-sha]").forEach(e => e.textContent = c.sha256 || "—");
  document.querySelectorAll(".apk-download").forEach(a => {
    a.href = c.apkUrl;
    a.setAttribute("download", c.apkFileName || "firas-prayer-display.apk");
  });
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
