document.documentElement.classList.add("js");

const compareRoot = document.querySelector("[data-compare]");

if (compareRoot) {
  const tabs = [...compareRoot.querySelectorAll("[data-view]")];
  const panels = [...compareRoot.querySelectorAll("[data-panel]")];

  function setCompareView(view) {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.view === view;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== view;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => setCompareView(tab.dataset.view));

    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
        return;
      }

      event.preventDefault();
      let nextIndex = index;

      if (event.key === "ArrowLeft") {
        nextIndex = index === 0 ? tabs.length - 1 : index - 1;
      } else if (event.key === "ArrowRight") {
        nextIndex = index === tabs.length - 1 ? 0 : index + 1;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      }

      tabs[nextIndex].focus();
      setCompareView(tabs[nextIndex].dataset.view);
    });
  });
}

