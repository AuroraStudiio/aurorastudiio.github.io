const copyBtns = document.querySelectorAll(".copy");
copyBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const value = btn.getAttribute("data-copy") || "";
    try {
      await navigator.clipboard.writeText(value);
      btn.textContent = "Copié !";
      setTimeout(() => (btn.textContent = "Copier"), 1500);
    } catch {
      btn.textContent = "Erreur";
      setTimeout(() => (btn.textContent = "Copier"), 1500);
    }
  });
});

const tabsets = document.querySelectorAll("[data-tabset]");
tabsets.forEach((tabset) => {
  const buttons = tabset.querySelectorAll("[data-tab]");
  const panels = tabset.querySelectorAll("[data-panel]");
  if (!buttons.length || !panels.length) return;

  const activate = (name) => {
    buttons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.tab === name);
    });
    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === name);
    });
  };

  const current = Array.from(buttons).find((btn) => btn.classList.contains("is-active"));
  activate(current ? current.dataset.tab : buttons[0].dataset.tab);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => activate(btn.dataset.tab));
  });
});

const mobileOverlay = document.querySelector("[data-mobile-overlay]");
const mobileOpeners = document.querySelectorAll("[data-mobile-open]");
const mobileClosers = document.querySelectorAll("[data-mobile-close]");

if (mobileOverlay) {
  let closeTimer;
  const openModal = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = undefined;
    }
    mobileOverlay.classList.remove("is-closing");
    mobileOverlay.classList.add("is-open");
  };
  const closeModal = () => {
    if (!mobileOverlay.classList.contains("is-open")) return;
    mobileOverlay.classList.remove("is-open");
    mobileOverlay.classList.add("is-closing");
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      mobileOverlay.classList.remove("is-closing");
      closeTimer = undefined;
    }, 320);
  };

  mobileOpeners.forEach((btn) => btn.addEventListener("click", openModal));
  mobileClosers.forEach((btn) => btn.addEventListener("click", closeModal));

  mobileOverlay.addEventListener("click", (event) => {
    if (event.target === mobileOverlay) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

const downloadOverlay = document.querySelector("[data-download-overlay]");
const downloadOpeners = document.querySelectorAll("[data-download-open]");
const downloadClosers = document.querySelectorAll("[data-download-close]");

if (downloadOverlay) {
  const modrinthLink = downloadOverlay.querySelector("[data-download-link=\"modrinth\"]");
  const zipLink = downloadOverlay.querySelector("[data-download-link=\"zip\"]");
  const curseforgeLink = downloadOverlay.querySelector("[data-download-link=\"curseforge\"]");
  let downloadTimer;

  const openDownload = (event) => {
    event.preventDefault();
    if (downloadTimer) {
      clearTimeout(downloadTimer);
      downloadTimer = undefined;
    }
    const source = event.currentTarget;
    const row = source.closest(".versions-row");
    const modrinth = row?.dataset.modrinth || "#";
    const zip = row?.dataset.zip || "#";
    const curseforge = row?.dataset.curseforge || "#";
    if (modrinthLink) modrinthLink.href = modrinth;
    if (zipLink) zipLink.href = zip;
    if (curseforgeLink) curseforgeLink.href = curseforge;

    downloadOverlay.classList.remove("is-closing");
    downloadOverlay.classList.add("is-open");
  };

  const closeDownload = () => {
    if (!downloadOverlay.classList.contains("is-open")) return;
    downloadOverlay.classList.remove("is-open");
    downloadOverlay.classList.add("is-closing");
    if (downloadTimer) clearTimeout(downloadTimer);
    downloadTimer = setTimeout(() => {
      downloadOverlay.classList.remove("is-closing");
      downloadTimer = undefined;
    }, 220);
  };

  downloadOpeners.forEach((btn) => btn.addEventListener("click", openDownload));
  downloadClosers.forEach((btn) => btn.addEventListener("click", closeDownload));

  downloadOverlay.addEventListener("click", (event) => {
    if (event.target === downloadOverlay) closeDownload();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDownload();
  });
}

