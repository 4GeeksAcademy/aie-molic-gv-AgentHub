(function () {
  "use strict";

  // Fuente mock compartida para el Dashboard y la futura vista de agentes.
  const mockData = {
    monthlyMetrics: {
      revenueUsd: 24860,
      discountLossUsd: 1240
    },
    agentsCollection: [
      { id: "A-001", name: "Atlas Researcher", ownerId: "U-001", ownerCompany: "Northstar Labs", status: "active", skillIds: ["S-001", "S-002"] },
      { id: "A-002", name: "Nova Support", ownerId: "U-002", ownerCompany: "BrightPath", status: "active", skillIds: ["S-003", "S-004"] },
      { id: "A-003", name: "Orbit Analyst", ownerId: "U-003", ownerCompany: "Orbit Data", status: "failing", skillIds: ["S-002", "S-001"] },
      { id: "A-004", name: "Verde Workflow", ownerId: "U-004", ownerCompany: "Verde & Co.", status: "inactive", skillIds: ["S-004", "S-003"] }
    ],
    usersCollection: [
      { id: "U-001", name: "Lucía Moreno", email: "lucia.moreno@northstar.example", company: "Northstar Labs", plan: "Enterprise", status: "Activo", signupDate: "2025-03-12" },
      { id: "U-002", name: "Mateo Ruiz", email: "mateo.ruiz@brightpath.example", company: "BrightPath", plan: "Pro", status: "Activo", signupDate: "2025-06-04" },
      { id: "U-003", name: "Sofía Chen", email: "sofia.chen@orbitdata.example", company: "Orbit Data", plan: "Pro", status: "Activo", signupDate: "2025-08-19" },
      { id: "U-004", name: "Diego Herrera", email: "diego.herrera@verdeco.example", company: "Verde & Co.", plan: "Starter", status: "Pendiente", signupDate: "2026-01-10" },
      { id: "U-005", name: "Valentina Cruz", email: "valentina.cruz@northstar.example", company: "Northstar Labs", plan: "Enterprise", status: "Activo", signupDate: "2026-02-02" }
    ]
  };

  const THEME_STORAGE_KEY = "agenthub-theme";
  const navLinks = Array.from(document.querySelectorAll("[data-view]"));
  const pages = Array.from(document.querySelectorAll("[data-page]"));
  const kpiGrid = document.getElementById("kpi-grid");
  const topbarTitle = document.getElementById("topbar-title");
  const topbarContext = document.getElementById("topbar-context");
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleIcon = document.getElementById("theme-toggle-icon");
  const mobileNavOpen = document.getElementById("mobile-nav-open");
  const mobileNavClose = document.getElementById("mobile-nav-close");
  const sidebar = document.getElementById("sidebar");
  const mobileNavBackdrop = document.getElementById("mobile-nav-backdrop");
  const mobileViewport = window.matchMedia("(max-width: 1023px)");
  const usersBody = document.getElementById("users-table-body");
  const usersEmpty = document.getElementById("users-empty-state");
  const userBackdrop = document.getElementById("user-dialog-backdrop");
  const userDialog = document.getElementById("user-dialog");
  let openUserMenuId = null;
  let pendingUserId = null;
  let dialogMode = "detail";
  let dialogReturnFocus = null;

  function getUserAgents(user) {
    return mockData.agentsCollection.filter(function (agent) { return agent.ownerId === user.id; });
  }

  function renderUsers() {
    usersBody.replaceChildren();
    usersEmpty.classList.toggle("hidden", mockData.usersCollection.length !== 0);
    mockData.usersCollection.forEach(function (user) {
      const row = document.createElement("tr");
      row.className = "hover:bg-slate-50 dark:hover:bg-slate-800/60";
      const identity = document.createElement("td");
      identity.className = "px-5 py-4 font-medium text-slate-900 dark:text-slate-100";
      identity.textContent = user.name;
      const email = document.createElement("td");
      email.className = "px-5 py-4 text-slate-600 dark:text-slate-300";
      email.textContent = user.email;
      const plan = document.createElement("td");
      plan.className = "px-5 py-4 text-slate-700 dark:text-slate-200";
      plan.textContent = user.plan;
      const statusCell = document.createElement("td");
      statusCell.className = "px-5 py-4";
      const badge = document.createElement("span");
      badge.className = user.status === "Activo"
        ? "inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
        : "inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-900 dark:bg-amber-900/40 dark:text-amber-300";
      badge.textContent = user.status;
      statusCell.appendChild(badge);
      const actionsCell = document.createElement("td");
      actionsCell.className = "relative px-5 py-3 text-right";
      const actionButton = document.createElement("button");
      actionButton.type = "button";
      actionButton.id = "user-actions-" + user.id;
      actionButton.className = "rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-indigo-400";
      actionButton.textContent = "⋯";
      actionButton.setAttribute("aria-label", "Acciones para " + user.name);
      actionButton.setAttribute("aria-haspopup", "menu");
      actionButton.setAttribute("aria-expanded", String(openUserMenuId === user.id));
      actionButton.setAttribute("aria-controls", "user-menu-" + user.id);
      actionButton.addEventListener("click", function () { toggleUserMenu(user.id, actionButton); });
      actionsCell.appendChild(actionButton);
      if (openUserMenuId === user.id) {
        const menu = document.createElement("div");
        menu.id = "user-menu-" + user.id;
        menu.className = "absolute right-4 top-12 z-20 w-44 rounded-lg border border-slate-200 bg-white p-1 text-left shadow-xl dark:border-slate-700 dark:bg-slate-800";
        menu.setAttribute("role", "group");
        [["Ver detalle", "detail"], ["Eliminar", "delete"]].forEach(function (item) {
          const option = document.createElement("button");
          option.type = "button";
          option.className = "block w-full rounded-md px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 " + (item[1] === "delete" ? "text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950/40" : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700");
          option.textContent = item[0];
          option.addEventListener("click", function () {
            dialogReturnFocus = actionButton;
            openUserMenuId = null;
            menu.remove();
            actionButton.setAttribute("aria-expanded", "false");
            if (item[1] === "detail") openUserDialog(user, false);
            else openUserDialog(user, true);
          });
          menu.appendChild(option);
        });
        actionsCell.appendChild(menu);
      }
      row.append(identity, email, plan, statusCell, actionsCell);
      usersBody.appendChild(row);
    });
  }

  function toggleUserMenu(userId, button) {
    openUserMenuId = openUserMenuId === userId ? null : userId;
    renderUsers();
    const renderedButton = document.getElementById("user-actions-" + userId);
    if (renderedButton) renderedButton.focus();
  }

  function openUserDialog(user, isDelete) {
    dialogMode = isDelete ? "delete" : "detail";
    pendingUserId = isDelete ? user.id : null;
    document.getElementById("user-dialog-title").textContent = isDelete ? "¿Eliminar usuario?" : user.name;
    document.getElementById("user-dialog-description").textContent = isDelete ? user.name + " (" + user.id + ")" : user.email;
    document.getElementById("user-dialog-fields").replaceChildren();
    document.getElementById("user-dialog-agents-wrap").classList.toggle("hidden", isDelete);
    document.getElementById("user-dialog-confirm").classList.toggle("hidden", !isDelete);
    if (!isDelete) {
      [["Email", user.email], ["Empresa", user.company], ["Plan", user.plan], ["Estado", user.status], ["Fecha de alta", user.signupDate]].forEach(function (field) {
        const wrapper = document.createElement("div");
        const term = document.createElement("dt");
        term.className = "text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400";
        term.textContent = field[0];
        const value = document.createElement("dd");
        value.className = "mt-1 break-words text-sm text-slate-900 dark:text-slate-100";
        value.textContent = field[1];
        wrapper.append(term, value);
        document.getElementById("user-dialog-fields").appendChild(wrapper);
      });
      const list = document.getElementById("user-dialog-agents");
      list.replaceChildren();
      const agents = getUserAgents(user);
      if (!agents.length) {
        const empty = document.createElement("li");
        empty.textContent = "Sin agentes asociados";
        list.appendChild(empty);
      } else agents.forEach(function (agent) {
        const item = document.createElement("li");
        item.textContent = agent.name + " (" + agent.id + ")";
        list.appendChild(item);
      });
    }
    userBackdrop.classList.remove("hidden");
    userBackdrop.classList.add("flex");
    document.getElementById(isDelete ? "user-delete-cancel" : "user-dialog-close").focus();
  }

  function closeUserDialog(restoreFocus) {
    userBackdrop.classList.add("hidden");
    userBackdrop.classList.remove("flex");
    pendingUserId = null;
    if (restoreFocus !== false && dialogReturnFocus && dialogReturnFocus.isConnected) dialogReturnFocus.focus();
    else if (restoreFocus !== false) document.getElementById("usuarios-title").focus();
  }

  function deleteSelectedUser() {
    if (!pendingUserId) return;
    const deleted = mockData.usersCollection.find(function (user) { return user.id === pendingUserId; });
    mockData.usersCollection = mockData.usersCollection.filter(function (user) { return user.id !== pendingUserId; });
    closeUserDialog(false);
    renderUsers();
    document.getElementById("users-announcement").textContent = deleted.name + " se eliminó de esta sesión.";
    const nextAction = usersBody.querySelector("button");
    (nextAction || document.getElementById("usuarios-title")).focus();
  }

  renderUsers();
  document.getElementById("user-dialog-close").addEventListener("click", function () { closeUserDialog(true); });
  document.getElementById("user-delete-cancel").addEventListener("click", function () { closeUserDialog(true); });
  document.getElementById("user-delete-confirm").addEventListener("click", deleteSelectedUser);
  userBackdrop.addEventListener("click", function (event) { if (event.target === userBackdrop) closeUserDialog(true); });
  userDialog.addEventListener("click", function (event) { event.stopPropagation(); });
  userDialog.addEventListener("keydown", function (event) {
    if (event.key !== "Tab") return;
    const controls = Array.from(userDialog.querySelectorAll("button:not([disabled]):not(.hidden)"))
      .filter(function (element) { return element.offsetParent !== null; });
    if (!controls.length) return;
    if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls[controls.length - 1].focus(); }
    else if (!event.shiftKey && document.activeElement === controls[controls.length - 1]) { event.preventDefault(); controls[0].focus(); }
  });
  document.addEventListener("click", function (event) {
    if (!openUserMenuId) return;
    // El botón puede haber sido reemplazado al renderizar; composedPath conserva
    // la ruta original del evento aunque el nodo ya no pertenezca al documento.
    const eventPath = typeof event.composedPath === "function" ? event.composedPath() : [];
    if (eventPath.includes(usersBody) || usersBody.contains(event.target)) return;
    openUserMenuId = null;
    renderUsers();
  });

  const pageLabels = {
    panel: "Panel",
    usuarios: "Usuarios",
    agentes: "Agentes",
    habilidades: "Habilidades",
    contrataciones: "Contrataciones",
    "registro-de-errores": "Registro de errores"
  };

  function formatUsd(amount) {
    return "$" + amount.toLocaleString("en-US");
  }

  function getKpiDefinitions() {
    return [
      {
        label: "Ingresos mensuales",
        value: formatUsd(mockData.monthlyMetrics.revenueUsd),
        suffix: "USD",
        icon: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" aria-hidden=\"true\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3v18m5-14.5C17 5.1 15.2 4 12.8 4 10.1 4 8 5.3 8 7.5S10.1 11 12.8 12c2.5 1 4.2 2.1 4.2 4.5S14.9 20 12 20c-2.4 0-4.6-1.1-5-3\"/></svg>",
        tone: "indigo"
      },
      {
        label: "Pérdidas por descuentos",
        value: formatUsd(mockData.monthlyMetrics.discountLossUsd),
        suffix: "USD",
        icon: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" aria-hidden=\"true\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m7 17 10-10M8 8h.01M16 16h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z\"/></svg>",
        tone: "blue"
      },
      {
        label: "Agentes activos",
        value: String(mockData.agentsCollection.filter(function (agent) { return agent.status === "active"; }).length),
        suffix: "",
        icon: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" aria-hidden=\"true\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3 5 7v10l7 4 7-4V7l-7-4Zm-3 9 2 2 4-4\"/></svg>",
        tone: "emerald"
      },
      {
        label: "Agentes fallando",
        value: String(mockData.agentsCollection.filter(function (agent) { return agent.status === "failing"; }).length),
        suffix: "",
        icon: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" aria-hidden=\"true\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 9v4m0 4h.01M10.3 3.9 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z\"/></svg>",
        tone: "rose"
      }
    ];
  }

  function renderKpis() {
    const toneClasses = {
      indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
      blue: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
      emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
      rose: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
    };

    kpiGrid.replaceChildren();
    getKpiDefinitions().forEach(function (kpi) {
      const card = document.createElement("article");
      card.className = "flex min-w-0 flex-col justify-between gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900";

      const header = document.createElement("div");
      header.className = "flex items-start justify-between gap-3";
      const label = document.createElement("h2");
      label.className = "text-sm font-medium leading-5 text-slate-600 dark:text-slate-400";
      label.textContent = kpi.label;
      const icon = document.createElement("span");
      icon.className = "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg [&>svg]:h-5 [&>svg]:w-5 " + toneClasses[kpi.tone];
      icon.setAttribute("aria-hidden", "true");
      icon.innerHTML = kpi.icon;
      header.append(label, icon);

      const value = document.createElement("p");
      value.className = "flex items-baseline gap-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-100";
      const amount = document.createElement("span");
      amount.textContent = kpi.value;
      value.appendChild(amount);
      if (kpi.suffix) {
        const suffix = document.createElement("span");
        suffix.className = "text-xs font-medium text-slate-500 dark:text-slate-400";
        suffix.textContent = kpi.suffix;
        value.appendChild(suffix);
      }

      card.append(header, value);
      kpiGrid.appendChild(card);
    });
  }

  renderKpis();

  function showPage(viewId) {
    if (!Object.prototype.hasOwnProperty.call(pageLabels, viewId)) return;

    if (openUserMenuId) {
      openUserMenuId = null;
      renderUsers();
    }
    if (!userBackdrop.classList.contains("hidden")) closeUserDialog(false);

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

  function setMobileNavigationOpen(isOpen, restoreFocus) {
    const isMobile = mobileViewport.matches;
    const drawerIsOpen = isMobile && isOpen;
    sidebar.classList.toggle("-translate-x-full", isMobile && !drawerIsOpen);
    mobileNavBackdrop.hidden = !drawerIsOpen;
    if (isMobile && !drawerIsOpen) sidebar.setAttribute("inert", "");
    else sidebar.removeAttribute("inert");
    mobileNavOpen.setAttribute("aria-expanded", String(drawerIsOpen));
    if (restoreFocus && isMobile) mobileNavOpen.focus();
  }

  setMobileNavigationOpen(false, false);

  mobileNavOpen.addEventListener("click", function () {
    setMobileNavigationOpen(true, false);
    const firstNavLink = sidebar.querySelector("[data-view]");
    if (firstNavLink) firstNavLink.focus();
  });
  mobileNavClose.addEventListener("click", function () { setMobileNavigationOpen(false, true); });
  mobileNavBackdrop.addEventListener("click", function () { setMobileNavigationOpen(false, true); });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !userBackdrop.classList.contains("hidden")) {
      event.stopImmediatePropagation();
      closeUserDialog(true);
      return;
    }
    if (event.key === "Escape" && openUserMenuId) {
      const user = mockData.usersCollection.find(function (entry) { return entry.id === openUserMenuId; });
      openUserMenuId = null;
      renderUsers();
      const actionButton = Array.from(usersBody.querySelectorAll("button[aria-label]")).find(function (button) { return button.getAttribute("aria-label") === "Acciones para " + user.name; });
      if (actionButton) actionButton.focus();
      return;
    }
    if (event.key === "Escape" && mobileNavOpen.getAttribute("aria-expanded") === "true") {
      setMobileNavigationOpen(false, true);
      return;
    }
    if (event.key !== "Tab" || mobileNavOpen.getAttribute("aria-expanded") !== "true") return;

    const focusableItems = Array.from(sidebar.querySelectorAll("a[href], button:not([disabled])"));
    if (!focusableItems.length) return;
    const firstItem = focusableItems[0];
    const lastItem = focusableItems[focusableItems.length - 1];
    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  });

  mobileViewport.addEventListener("change", function (event) {
    setMobileNavigationOpen(false, false);
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const viewId = link.dataset.view;
      if (!Object.prototype.hasOwnProperty.call(pageLabels, viewId)) return;
      event.preventDefault();
      showPage(viewId);
      setMobileNavigationOpen(false, false);
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
