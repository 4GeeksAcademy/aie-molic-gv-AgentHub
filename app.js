(function () {
  "use strict";

  const THEME_STORAGE_KEY = "agenthub-theme";
  const navLinks = Array.from(document.querySelectorAll("[data-view]"));
  const pages = Array.from(document.querySelectorAll("[data-page]"));
  const topbarTitle = document.getElementById("topbar-title");
  const topbarContext = document.getElementById("topbar-context");
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleIcon = document.getElementById("theme-toggle-icon");

  const pageLabels = {
    panel: "Panel",
    usuarios: "Usuarios",
    agentes: "Agentes",
    habilidades: "Habilidades",
    contrataciones: "Contrataciones",
    "registro-de-errores": "Registro de errores"
  };

  function showPage(viewId) {
    if (!Object.prototype.hasOwnProperty.call(pageLabels, viewId)) return;

    pages.forEach(function (page) {
      page.hidden = page.dataset.page !== viewId;
    });

    navLinks.forEach(function (link) {
      const isCurrent = link.dataset.view === viewId;
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
        link.classList.add("bg-indigo-50", "text-indigo-700", "dark:bg-indigo-500/15", "dark:text-indigo-300");
        link.classList.remove("text-slate-600", "dark:text-slate-300");
      } else {
        link.removeAttribute("aria-current");
        link.classList.remove("bg-indigo-50", "text-indigo-700", "dark:bg-indigo-500/15", "dark:text-indigo-300");
        link.classList.add("text-slate-600", "dark:text-slate-300");
      }
    });

    const label = pageLabels[viewId];
    topbarTitle.textContent = label;
    topbarContext.textContent = viewId === "panel" ? "Resumen general" : "Sección de AgentHub";
    document.title = label + " | AgentHub";
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const viewId = link.dataset.view;
      if (!Object.prototype.hasOwnProperty.call(pageLabels, viewId)) return;
      event.preventDefault();
      showPage(viewId);
      if (window.location.hash !== "#" + viewId) {
        window.history.replaceState(null, "", "#" + viewId);
      }
    });
  });

  function readSavedTheme() {
    try {
      const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
    } catch (error) {
      return null;
    }
  }

  function updateThemeControl(isDark) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    themeToggleIcon.textContent = isDark ? "☼" : "☾";
  }

  function applyTheme(theme, persist) {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    updateThemeControl(isDark);

    if (persist) {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch (error) {
        // La preferencia sigue activa en esta página aunque el almacenamiento esté bloqueado.
      }
    }
  }

  const savedTheme = readSavedTheme();
  const systemPrefersDark = typeof window.matchMedia === "function"
    && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (systemPrefersDark ? "dark" : "light"), false);

  themeToggle.addEventListener("click", function () {
    const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme, true);
  });

  const initialView = window.location.hash.slice(1);
  showPage(Object.prototype.hasOwnProperty.call(pageLabels, initialView) ? initialView : "panel");
})();
