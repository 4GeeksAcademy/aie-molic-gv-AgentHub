(function () {
  "use strict";

  // Fuentes mock compartidas entre las vistas y sus relaciones por ID.
  const mockData = {
    monthlyMetrics: {
      revenueUsd: 24860,
      discountLossUsd: 1240
    },
    agentsCollection: [
      { id: "A-001", name: "Atlas Researcher", ownerId: "U-001", ownerCompany: "Northstar Labs", status: "active", skillIds: ["S-001", "S-002"], systemPrompt: "Eres Atlas Researcher, especialista en investigación web para Northstar Labs. Contrasta fuentes primarias y registra referencias verificables. Resume los hallazgos con claridad y señala cualquier incertidumbre." },
      { id: "A-002", name: "Nova Support", ownerId: "U-002", ownerCompany: "BrightPath", status: "active", skillIds: ["S-003", "S-004"], systemPrompt: "Eres Nova Support, asistente de atención para BrightPath. Clasifica cada consulta y redacta respuestas claras basadas en la información disponible. Si falta contexto, indícalo sin inventar datos." },
      { id: "A-003", name: "Orbit Analyst", ownerId: "U-003", ownerCompany: "Orbit Data", status: "failing", skillIds: ["S-002", "S-001"], systemPrompt: "Eres Orbit Analyst, especialista en análisis de datos para Orbit Data. Comprueba la estructura de los datos antes de resumir tendencias y resultados. Explica supuestos y limita las conclusiones a la evidencia proporcionada." },
      { id: "A-004", name: "Verde Workflow", ownerId: "U-004", ownerCompany: "Verde & Co.", status: "inactive", skillIds: ["S-004", "S-003"], systemPrompt: "Eres Verde Workflow, asistente para organizar procesos repetibles de Verde & Co. Describe los pasos necesarios de forma ordenada y confirma las dependencias conocidas. No afirmes haber ejecutado acciones externas." }
    ],
    skillsCollection: [
      { id: "S-001", name: "Web Research", category: "Investigación", description: "Busca, compara y sintetiza información web." },
      { id: "S-002", name: "Data Analysis", category: "Analítica", description: "Analiza conjuntos de datos y resume hallazgos." },
      { id: "S-003", name: "Customer Support", category: "Atención", description: "Clasifica consultas y redacta respuestas de soporte." },
      { id: "S-004", name: "Workflow Automation", category: "Automatización", description: "Coordina pasos repetibles y tareas entre herramientas." }
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
  const agentsList = document.getElementById("agents-list");
  const agentsEmpty = document.getElementById("agents-empty-state");
  const skillsList = document.getElementById("skills-list");
  const skillsEmpty = document.getElementById("skills-empty-state");
  const skillDetailBackdrop = document.getElementById("skill-detail-backdrop");
  const skillDetailDialog = document.getElementById("skill-detail-dialog");
  const skillDeleteBackdrop = document.getElementById("skill-delete-backdrop");
  const skillDeleteDialog = document.getElementById("skill-delete-dialog");
  const agentConfigBackdrop = document.getElementById("agent-config-backdrop");
  const agentConfigDialog = document.getElementById("agent-config-dialog");
  const agentDeleteBackdrop = document.getElementById("agent-delete-backdrop");
  const agentDeleteDialog = document.getElementById("agent-delete-dialog");
  let openUserMenuId = null;
  let pendingUserId = null;
  let dialogMode = "detail";
  let dialogReturnFocus = null;
  let openAgentMenuId = null;
  let pendingAgentId = null;
  let activeAgentDialog = null;
  let agentDialogReturnFocus = null;
  let openSkillMenuId = null;
  let pendingSkillId = null;
  let activeSkillDialog = null;
  let skillDialogReturnFocus = null;

  function getAgentsForSkill(skillId) {
    return mockData.agentsCollection.filter(function (agent) { return agent.skillIds.includes(skillId); });
  }

  function renderSkills() {
    skillsList.replaceChildren();
    skillsEmpty.classList.toggle("hidden", mockData.skillsCollection.length !== 0);
    skillsList.classList.toggle("hidden", mockData.skillsCollection.length === 0);
    mockData.skillsCollection.forEach(function (skill) {
      const agents = getAgentsForSkill(skill.id);
      const card = document.createElement("article");
      card.className = "relative min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900";
      const header = document.createElement("div");
      header.className = "flex items-start justify-between gap-3";
      const info = document.createElement("div");
      info.className = "min-w-0";
      const title = document.createElement("h2");
      title.className = "break-words text-base font-semibold text-slate-950 dark:text-white";
      title.textContent = skill.name;
      const metadata = document.createElement("p");
      metadata.className = "mt-1 text-xs text-slate-500 dark:text-slate-400";
      metadata.textContent = skill.id + " · " + skill.category;
      const description = document.createElement("p");
      description.className = "mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300";
      description.textContent = skill.description;
      info.append(title, metadata, description);
      const actions = document.createElement("div");
      actions.className = "relative shrink-0";
      const button = document.createElement("button");
      button.type = "button";
      button.id = "skill-actions-" + skill.id;
      button.className = "inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-indigo-400";
      button.textContent = "⋮";
      button.setAttribute("aria-label", "Acciones para " + skill.name);
      button.setAttribute("aria-haspopup", "true");
      button.setAttribute("aria-expanded", String(openSkillMenuId === skill.id));
      button.setAttribute("aria-controls", "skill-menu-" + skill.id);
      button.addEventListener("click", function () { toggleSkillMenu(skill.id); });
      actions.appendChild(button);
      if (openSkillMenuId === skill.id) {
        const menu = document.createElement("div");
        menu.id = "skill-menu-" + skill.id;
        menu.className = "absolute right-0 top-11 z-30 w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-700 dark:bg-slate-800";
        menu.setAttribute("role", "group");
        [["Ver detalle", false], ["Eliminar", true]].forEach(function (item) {
          const option = document.createElement("button");
          option.type = "button";
          option.className = "block w-full rounded-md px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 " + (item[1] ? "text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950/40" : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700");
          option.textContent = item[0];
          option.addEventListener("click", function () {
            skillDialogReturnFocus = document.getElementById(button.id);
            openSkillMenuId = null;
            renderSkills();
            if (item[1]) openSkillDeleteDialog(skill.id);
            else openSkillDetailDialog(skill.id);
          });
          menu.appendChild(option);
        });
        actions.appendChild(menu);
      }
      header.append(info, actions);
      const relation = document.createElement("div");
      relation.className = "mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-50 p-3 dark:bg-slate-950";
      const associated = document.createElement("p");
      associated.className = "min-w-0 text-sm text-slate-600 dark:text-slate-300";
      associated.textContent = agents.length ? agents.map(function (agent) { return agent.name; }).join(", ") : "Sin agentes asociados";
      const count = document.createElement("span");
      count.className = "shrink-0 rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200";
      count.textContent = agents.length + (agents.length === 1 ? " agente" : " agentes");
      relation.append(associated, count);
      card.append(header, relation);
      skillsList.appendChild(card);
    });
  }

  function toggleSkillMenu(skillId) {
    openSkillMenuId = openSkillMenuId === skillId ? null : skillId;
    renderSkills();
    const button = document.getElementById("skill-actions-" + skillId);
    if (button) button.focus();
  }

  function skillField(container, labelText, valueText) {
    const wrapper = document.createElement("div");
    const term = document.createElement("dt");
    term.className = "text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400";
    term.textContent = labelText;
    const value = document.createElement("dd");
    value.className = "mt-1 break-words text-sm text-slate-900 dark:text-slate-100";
    value.textContent = valueText;
    wrapper.append(term, value);
    container.appendChild(wrapper);
  }

  function showSkillDialog(backdrop, dialog, initialFocus) {
    activeSkillDialog = dialog;
    backdrop.classList.remove("hidden");
    backdrop.classList.add("flex");
    document.getElementById(initialFocus).focus();
  }

  function openSkillDetailDialog(skillId) {
    const skill = mockData.skillsCollection.find(function (entry) { return entry.id === skillId; });
    if (!skill) return;
    const agents = getAgentsForSkill(skill.id);
    document.getElementById("skill-detail-title").textContent = skill.name;
    document.getElementById("skill-detail-id").textContent = skill.id;
    const fields = document.getElementById("skill-detail-fields");
    fields.replaceChildren();
    skillField(fields, "Categoría", skill.category);
    skillField(fields, "Descripción", skill.description);
    skillField(fields, "Agentes que la utilizan", String(agents.length));
    const list = document.getElementById("skill-detail-agents");
    list.replaceChildren();
    if (!agents.length) {
      const empty = document.createElement("li");
      empty.textContent = "Sin agentes asociados";
      list.appendChild(empty);
    } else agents.forEach(function (agent) {
      const item = document.createElement("li");
      item.textContent = agent.name + " (" + agent.id + ")";
      list.appendChild(item);
    });
    showSkillDialog(skillDetailBackdrop, skillDetailDialog, "skill-detail-close");
  }

  function openSkillDeleteDialog(skillId) {
    const skill = mockData.skillsCollection.find(function (entry) { return entry.id === skillId; });
    if (!skill) return;
    pendingSkillId = skill.id;
    document.getElementById("skill-delete-description").textContent = "Se eliminará " + skill.name + " (" + skill.id + ") de esta sesión de demostración.";
    showSkillDialog(skillDeleteBackdrop, skillDeleteDialog, "skill-delete-cancel");
  }

  function closeSkillDialog(restoreFocus) {
    if (activeSkillDialog === skillDetailDialog) {
      skillDetailBackdrop.classList.add("hidden");
      skillDetailBackdrop.classList.remove("flex");
    } else if (activeSkillDialog === skillDeleteDialog) {
      skillDeleteBackdrop.classList.add("hidden");
      skillDeleteBackdrop.classList.remove("flex");
    }
    activeSkillDialog = null;
    pendingSkillId = null;
    if (restoreFocus === false) return;
    if (skillDialogReturnFocus && skillDialogReturnFocus.isConnected) skillDialogReturnFocus.focus();
    else document.getElementById("habilidades-title").focus();
  }

  function deleteSelectedSkill() {
    if (!pendingSkillId) return;
    const removed = mockData.skillsCollection.find(function (skill) { return skill.id === pendingSkillId; });
    if (!removed) return closeSkillDialog(true);
    const deletedIndex = mockData.skillsCollection.indexOf(removed);
    mockData.skillsCollection = mockData.skillsCollection.filter(function (skill) { return skill.id !== pendingSkillId; });
    mockData.agentsCollection.forEach(function (agent) {
      agent.skillIds = agent.skillIds.filter(function (skillId) { return skillId !== pendingSkillId; });
    });
    openSkillMenuId = null;
    closeSkillDialog(false);
    renderSkills();
    renderAgents();
    document.getElementById("skills-announcement").textContent = removed.name + " se eliminó de esta sesión.";
    const next = mockData.skillsCollection[Math.min(deletedIndex, mockData.skillsCollection.length - 1)];
    const target = next ? document.getElementById("skill-actions-" + next.id) : skillsEmpty;
    (target || document.getElementById("habilidades-title")).focus();
  }

  function bindSkillDialog(backdrop, dialog, closeButtonId) {
    document.getElementById(closeButtonId).addEventListener("click", function () { closeSkillDialog(true); });
    let pointerStartedOnBackdrop = false;
    backdrop.addEventListener("pointerdown", function (event) { pointerStartedOnBackdrop = event.target === backdrop; });
    backdrop.addEventListener("click", function (event) {
      const shouldClose = pointerStartedOnBackdrop && event.target === backdrop && activeSkillDialog === dialog;
      pointerStartedOnBackdrop = false;
      if (shouldClose) closeSkillDialog(true);
    });
    dialog.addEventListener("keydown", function (event) {
      if (event.key !== "Tab") return;
      const controls = Array.from(dialog.querySelectorAll("button:not([disabled])"));
      if (!controls.length) return;
      if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls[controls.length - 1].focus(); }
      else if (!event.shiftKey && document.activeElement === controls[controls.length - 1]) { event.preventDefault(); controls[0].focus(); }
    });
  }

  bindSkillDialog(skillDetailBackdrop, skillDetailDialog, "skill-detail-close");
  bindSkillDialog(skillDeleteBackdrop, skillDeleteDialog, "skill-delete-cancel");
  document.getElementById("skill-delete-confirm").addEventListener("click", deleteSelectedSkill);
  document.getElementById("skill-delete-cancel").addEventListener("click", function () { closeSkillDialog(true); });
  document.addEventListener("click", function (event) {
    if (!openSkillMenuId) return;
    const path = typeof event.composedPath === "function" ? event.composedPath() : [];
    if (path.includes(skillsList) || skillsList.contains(event.target)) return;
    openSkillMenuId = null;
    renderSkills();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && activeSkillDialog) {
      event.stopImmediatePropagation();
      closeSkillDialog(true);
      return;
    }
    if (event.key === "Escape" && openSkillMenuId) {
      const id = openSkillMenuId;
      openSkillMenuId = null;
      renderSkills();
      const button = document.getElementById("skill-actions-" + id);
      if (button) button.focus();
    }
  });

  renderSkills();

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

  function getAgentOwner(agent) {
    return mockData.usersCollection.find(function (user) { return user.id === agent.ownerId; }) || null;
  }

  function getAgentSkills(agent) {
    return agent.skillIds.map(function (skillId) {
      return mockData.skillsCollection.find(function (skill) { return skill.id === skillId; }) || null;
    }).filter(Boolean);
  }

  function makeAgentButton(label, text, classes, handler) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = classes;
    button.textContent = text;
    button.setAttribute("aria-label", label);
    button.addEventListener("click", handler);
    return button;
  }

  function renderAgents() {
    agentsList.replaceChildren();
    agentsEmpty.classList.toggle("hidden", mockData.agentsCollection.length !== 0);
    agentsList.classList.toggle("hidden", mockData.agentsCollection.length === 0);
    mockData.agentsCollection.forEach(function (agent) {
      const owner = getAgentOwner(agent);
      const skills = getAgentSkills(agent);
      const card = document.createElement("article");
      card.id = "agent-card-" + agent.id;
      card.className = "relative min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5";
      const top = document.createElement("div");
      top.className = "flex items-start justify-between gap-3";
      const identity = document.createElement("div");
      identity.className = "min-w-0";
      const title = document.createElement("h2");
      title.className = "break-words text-base font-semibold text-slate-950 dark:text-white";
      title.textContent = agent.name;
      const id = document.createElement("p");
      id.className = "mt-1 font-mono text-xs text-slate-500 dark:text-slate-400";
      id.textContent = agent.id;
      identity.append(title, id);
      const trailing = document.createElement("div");
      trailing.className = "flex shrink-0 items-start gap-2";
      const status = document.createElement("span");
      const statusInfo = {
        active: ["Activo", "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"],
        failing: ["Fallando", "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300"],
        inactive: ["Inactivo", "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"]
      }[agent.status] || ["Estado no disponible", "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"];
      status.className = "inline-flex rounded-full px-2.5 py-1 text-xs font-medium " + statusInfo[1];
      status.textContent = statusInfo[0];
      const actions = document.createElement("div");
      actions.className = "relative";
      const menuButton = makeAgentButton("Acciones para " + agent.name, "⋮", "inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-indigo-400", function () { toggleAgentMenu(agent.id); });
      menuButton.id = "agent-actions-" + agent.id;
      menuButton.setAttribute("aria-haspopup", "true");
      menuButton.setAttribute("aria-expanded", String(openAgentMenuId === agent.id));
      menuButton.setAttribute("aria-controls", "agent-menu-" + agent.id);
      actions.appendChild(menuButton);
      if (openAgentMenuId === agent.id) {
        const menu = document.createElement("div");
        menu.id = "agent-menu-" + agent.id;
        menu.className = "absolute right-0 top-11 z-30 w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-700 dark:bg-slate-800";
        menu.setAttribute("role", "group");
        [["Configurar", false], ["Eliminar", true]].forEach(function (item) {
          const option = document.createElement("button");
          option.type = "button";
          option.className = "block w-full rounded-md px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 " + (item[1] ? "text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950/40" : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700");
          option.textContent = item[0];
          option.addEventListener("click", function () {
            agentDialogReturnFocus = document.getElementById("agent-actions-" + agent.id);
            openAgentMenuId = null;
            renderAgents();
            if (item[1]) openAgentDeleteDialog(agent.id);
            else openAgentConfigDialog(agent.id);
          });
          menu.appendChild(option);
        });
        actions.appendChild(menu);
      }
      trailing.append(status, actions);
      top.append(identity, trailing);
      const ownerLine = document.createElement("p");
      ownerLine.className = "mt-4 text-sm text-slate-600 dark:text-slate-300";
      ownerLine.textContent = owner ? owner.name + " · " + owner.company : "Propietario no disponible · " + (agent.ownerCompany || "Empresa no disponible");
      const skillsButton = makeAgentButton("Skills de " + agent.name, "", "mt-4 flex min-h-11 w-full items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-left text-sm hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:bg-slate-950 dark:hover:bg-slate-800 dark:focus-visible:ring-indigo-400", function () {
        const panel = document.getElementById("agent-skills-" + agent.id);
        const expanded = skillsButton.getAttribute("aria-expanded") === "true";
        skillsButton.setAttribute("aria-expanded", String(!expanded));
        if (expanded) {
          panel.setAttribute("aria-hidden", "true");
          panel.setAttribute("inert", "");
          panel.classList.remove("max-h-40", "opacity-100");
          panel.classList.add("max-h-0", "opacity-0");
          panel.addEventListener("transitionend", function finishCollapse(event) {
            if (event.target !== panel || skillsButton.getAttribute("aria-expanded") === "true") return;
            panel.hidden = true;
            panel.removeEventListener("transitionend", finishCollapse);
          });
        } else {
          panel.hidden = false;
          panel.removeAttribute("aria-hidden");
          panel.removeAttribute("inert");
          panel.classList.remove("max-h-0", "opacity-0");
          panel.classList.add("max-h-40", "opacity-100");
        }
      });
      skillsButton.id = "agent-skills-toggle-" + agent.id;
      skillsButton.setAttribute("aria-expanded", "false");
      skillsButton.setAttribute("aria-controls", "agent-skills-" + agent.id);
      const skillsSummary = document.createElement("span");
      skillsSummary.className = "flex flex-wrap items-center gap-2";
      const label = document.createElement("span");
      label.className = "font-medium text-slate-700 dark:text-slate-200";
      label.textContent = "Skills · " + skills.length;
      skillsSummary.appendChild(label);
      skills.forEach(function (skill) {
        const chip = document.createElement("span");
        chip.className = "rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300";
        chip.textContent = skill.name;
        skillsSummary.appendChild(chip);
      });
      const chevron = document.createElement("span");
      chevron.className = "shrink-0 text-slate-500";
      chevron.setAttribute("aria-hidden", "true");
      chevron.textContent = "⌄";
      skillsButton.append(skillsSummary, chevron);
      const skillsPanel = document.createElement("div");
      skillsPanel.id = "agent-skills-" + agent.id;
      skillsPanel.hidden = true;
      skillsPanel.setAttribute("aria-hidden", "true");
      skillsPanel.setAttribute("inert", "");
      skillsPanel.className = "mt-2 max-h-0 overflow-hidden rounded-lg border border-slate-200 p-3 text-sm opacity-0 transition-all duration-200 dark:border-slate-800 motion-reduce:transition-none";
      const skillsList = document.createElement("ul");
      skillsList.className = "flex flex-wrap gap-2";
      skills.forEach(function (skill) { const item = document.createElement("li"); item.textContent = skill.name; skillsList.appendChild(item); });
      if (!skills.length) { const item = document.createElement("li"); item.textContent = "Sin habilidades disponibles"; skillsList.appendChild(item); }
      skillsPanel.appendChild(skillsList);
      card.append(top, ownerLine, skillsButton, skillsPanel);
      agentsList.appendChild(card);
    });
  }

  function toggleAgentMenu(agentId) {
    openAgentMenuId = openAgentMenuId === agentId ? null : agentId;
    renderAgents();
    const button = document.getElementById("agent-actions-" + agentId);
    if (button) button.focus();
  }

  function showAgentDialog(backdrop, dialog, initialFocus) {
    activeAgentDialog = dialog;
    backdrop.classList.remove("hidden");
    backdrop.classList.add("flex");
    document.getElementById(initialFocus).focus();
  }

  function closeAgentDialog(restoreFocus) {
    if (activeAgentDialog === agentConfigDialog) {
      agentConfigBackdrop.classList.add("hidden");
      agentConfigBackdrop.classList.remove("flex");
    } else if (activeAgentDialog === agentDeleteDialog) {
      agentDeleteBackdrop.classList.add("hidden");
      agentDeleteBackdrop.classList.remove("flex");
    }
    activeAgentDialog = null;
    pendingAgentId = null;
    if (restoreFocus === false) return;
    if (agentDialogReturnFocus && agentDialogReturnFocus.isConnected) agentDialogReturnFocus.focus();
    else document.getElementById("agentes-title").focus();
  }

  function openAgentConfigDialog(agentId) {
    const agent = mockData.agentsCollection.find(function (entry) { return entry.id === agentId; });
    if (!agent) return;
    const owner = getAgentOwner(agent);
    document.getElementById("agent-config-title").textContent = "Configurar " + agent.name;
    document.getElementById("agent-config-id").textContent = agent.id;
    document.getElementById("agent-config-name").textContent = agent.name;
    document.getElementById("agent-config-owner").textContent = owner ? owner.name + " · " + owner.company : "Propietario no disponible · " + (agent.ownerCompany || "Empresa no disponible");
    document.getElementById("agent-config-status").textContent = ({ active: "Activo", failing: "Fallando", inactive: "Inactivo" })[agent.status] || "Estado no disponible";
    document.getElementById("agent-system-prompt").value = agent.systemPrompt;
    pendingAgentId = agent.id;
    showAgentDialog(agentConfigBackdrop, agentConfigDialog, "agent-system-prompt");
  }

  function saveAgentConfig() {
    const agent = mockData.agentsCollection.find(function (entry) { return entry.id === pendingAgentId; });
    if (!agent) return closeAgentDialog(true);
    agent.systemPrompt = document.getElementById("agent-system-prompt").value;
    const name = agent.name;
    closeAgentDialog(true);
    document.getElementById("agents-announcement").textContent = "Configuración de " + name + " guardada en esta sesión.";
  }

  function openAgentDeleteDialog(agentId) {
    const agent = mockData.agentsCollection.find(function (entry) { return entry.id === agentId; });
    if (!agent) return;
    pendingAgentId = agent.id;
    document.getElementById("agent-delete-description").textContent = "Se eliminará " + agent.name + " (" + agent.id + ") de esta sesión de demostración.";
    showAgentDialog(agentDeleteBackdrop, agentDeleteDialog, "agent-delete-cancel");
  }

  function deleteSelectedAgent() {
    const deleted = mockData.agentsCollection.find(function (entry) { return entry.id === pendingAgentId; });
    if (!deleted) return closeAgentDialog(true);
    const deletedIndex = mockData.agentsCollection.indexOf(deleted);
    mockData.agentsCollection = mockData.agentsCollection.filter(function (entry) { return entry.id !== pendingAgentId; });
    openAgentMenuId = null;
    closeAgentDialog(false);
    renderAgents();
    renderKpis();
    document.getElementById("agents-announcement").textContent = deleted.name + " se eliminó de esta sesión.";
    const nextAgent = mockData.agentsCollection[Math.min(deletedIndex, mockData.agentsCollection.length - 1)];
    const target = nextAgent ? document.getElementById("agent-actions-" + nextAgent.id) : agentsEmpty;
    (target || document.getElementById("agentes-title")).focus();
  }

  function bindAgentDialog(backdrop, dialog, closeButtonId) {
    document.getElementById(closeButtonId).addEventListener("click", function () { closeAgentDialog(true); });
    let pointerStartedOnBackdrop = false;
    backdrop.addEventListener("pointerdown", function (event) { pointerStartedOnBackdrop = event.target === backdrop; });
    backdrop.addEventListener("click", function (event) {
      const shouldClose = pointerStartedOnBackdrop && event.target === backdrop && activeAgentDialog === dialog;
      pointerStartedOnBackdrop = false;
      if (shouldClose) closeAgentDialog(true);
    });
    dialog.addEventListener("keydown", function (event) {
      if (event.key !== "Tab") return;
      const controls = Array.from(dialog.querySelectorAll("button:not([disabled]), textarea:not([disabled])"))
        .filter(function (element) { return element.offsetParent !== null; });
      if (!controls.length) return;
      if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls[controls.length - 1].focus(); }
      else if (!event.shiftKey && document.activeElement === controls[controls.length - 1]) { event.preventDefault(); controls[0].focus(); }
    });
  }

  bindAgentDialog(agentConfigBackdrop, agentConfigDialog, "agent-config-close");
  bindAgentDialog(agentDeleteBackdrop, agentDeleteDialog, "agent-delete-cancel");
  document.getElementById("agent-config-cancel").addEventListener("click", function () { closeAgentDialog(true); });
  document.getElementById("agent-config-save").addEventListener("click", saveAgentConfig);
  document.getElementById("agent-delete-confirm").addEventListener("click", deleteSelectedAgent);

  document.addEventListener("click", function (event) {
    if (!openAgentMenuId) return;
    const path = typeof event.composedPath === "function" ? event.composedPath() : [];
    if (path.includes(agentsList) || agentsList.contains(event.target)) return;
    openAgentMenuId = null;
    renderAgents();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && activeAgentDialog) {
      event.stopImmediatePropagation();
      closeAgentDialog(true);
      return;
    }
    if (event.key === "Escape" && openAgentMenuId) {
      const menuId = openAgentMenuId;
      openAgentMenuId = null;
      renderAgents();
      const button = document.getElementById("agent-actions-" + menuId);
      if (button) button.focus();
    }
  });

  renderAgents();

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
    if (openAgentMenuId) { openAgentMenuId = null; renderAgents(); }
    if (activeAgentDialog) closeAgentDialog(false);
    if (openSkillMenuId) { openSkillMenuId = null; renderSkills(); }
    if (activeSkillDialog) closeSkillDialog(false);
    if (viewId === "habilidades") renderSkills();

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
