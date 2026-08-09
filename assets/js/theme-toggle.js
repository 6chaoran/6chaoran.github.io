(function () {
  "use strict";

  var storageKey = "site-theme";
  var root = document.documentElement;
  var lightStylesheet = document.getElementById("theme-light");
  var darkStylesheet = document.getElementById("theme-dark");
  var toggle = document.querySelector(".theme__toggle");
  var themeColor = document.querySelector('meta[name="theme-color"]');

  if (!lightStylesheet || !darkStylesheet || !toggle) return;

  function applyTheme(theme, savePreference) {
    var isDark = theme === "dark";

    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    lightStylesheet.disabled = isDark;
    darkStylesheet.disabled = !isDark;
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    toggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");

    var hiddenLabel = toggle.querySelector(".visually-hidden");
    if (hiddenLabel) {
      hiddenLabel.textContent = isDark ? "Switch to light mode" : "Switch to dark mode";
    }

    if (themeColor) {
      themeColor.setAttribute("content", isDark ? "#252a34" : "#ffffff");
    }

    if (savePreference) {
      try { localStorage.setItem(storageKey, theme); } catch (error) {}
    }
  }

  toggle.addEventListener("click", function () {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
  });

  applyTheme(root.dataset.theme === "dark" ? "dark" : "light", false);

  var systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  systemTheme.addEventListener("change", function (event) {
    var hasSavedPreference = false;
    try { hasSavedPreference = Boolean(localStorage.getItem(storageKey)); } catch (error) {}
    if (!hasSavedPreference) applyTheme(event.matches ? "dark" : "light", false);
  });
})();
