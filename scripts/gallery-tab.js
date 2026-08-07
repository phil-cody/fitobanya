(() => {
  const tabs = document.querySelectorAll(".portfolio [data-tab]");
  const tabsContent = document.querySelectorAll(
    ".portfolio [data-tab-content]",
  );

  if (!tabs.length || !tabsContent.length) {
    return;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.classList.contains("active")) {
        return;
      }

      tabs.forEach((item) => item.classList.remove("active"));
      tabsContent.forEach((content) => content.classList.remove("active"));

      tab.classList.add("active");

      tabsContent.forEach((content) => {
        if (content.dataset.tabContent === tab.dataset.tab) {
          content.classList.add("active");
        }
      });
    });
  });

  tabs[0].classList.add("active");

  tabsContent.forEach((content) => {
    if (content.dataset.tabContent === tabs[0].dataset.tab)
      content.classList.add("active");
  });
})();
