(() => {
  const tabbar = document.querySelector(".tabbar");
  const dragHandle = document.querySelector("[data-drag-tab]");
  const overlay = document.querySelector(".tabbar__overlay");
  const overlayCall = document.querySelector(".tabbar__call");
  const tabs = document.querySelectorAll(".tabbar [data-tab]");
  const tabsContent = document.querySelectorAll(".tabbar [data-tab-content]");

  if (!tabbar || !dragHandle || !overlay || !tabs.length || !tabsContent.length) {
    return;
  }

  const CLOSE_DISTANCE = 100;
  const CLOSE_VELOCITY = 0.65;

  let isDragging = false;
  let startY = 0;
  let offsetY = 0;
  let lastY = 0;
  let lastTime = 0;
  let velocityY = 0;

  function closeTabMenu() {
    tabbar.style.transform = "translateY(0)";
    tabbar.style.transition = "";

    overlay.classList.remove("active");

    tabs.forEach((tab) => tab.classList.remove("active"));
    tabsContent.forEach((content) => content.classList.remove("active"));

    dragHandle.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  overlay.addEventListener("click", closeTabMenu);
  overlayCall.addEventListener("click", closeTabMenu);

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      overlay.classList.remove("active");

      if (tab.classList.contains("active")) {
        closeTabMenu();
        return;
      }

      tabs.forEach((item) => item.classList.remove("active"));
      tabsContent.forEach((content) => content.classList.remove("active"));

      document.body.classList.add("no-scroll");
      dragHandle.classList.add("active");
      tab.classList.add("active");
      overlay.classList.add("active");

      tabsContent.forEach((content) => {
        if (content.dataset.tabContent === tab.dataset.tab) {
          content.classList.add("active");
        }
      });
    });
  });

  dragHandle.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    if (!document.querySelector("[data-tab].active")) return;

    isDragging = true;
    startY = event.clientY;
    lastY = event.clientY;
    lastTime = performance.now();
    offsetY = 0;
    velocityY = 0;

    tabbar.style.transition = "none";
    dragHandle.setPointerCapture(event.pointerId);
  });

  dragHandle.addEventListener("pointermove", (event) => {
    event.preventDefault();
    if (!isDragging) return;

    const currentY = event.clientY;
    const currentTime = performance.now();

    offsetY = Math.max(0, currentY - startY);

    const deltaY = currentY - lastY;
    const deltaTime = currentTime - lastTime;

    if (deltaTime > 0) {
      velocityY = deltaY / deltaTime;
    }

    lastY = currentY;
    lastTime = currentTime;

    tabbar.style.transform = `translateY(${offsetY}px)`;

    overlay.style.opacity = String(Math.max(0, 0.7 * (1 - offsetY / 250)));
  });

  function finishDrag() {
    if (!isDragging) return;

    isDragging = false;

    tabbar.style.transition = "transform 0.25s ease-out";
    overlay.style.transition = "opacity 0.25s ease-out";
    overlay.style.opacity = "";

    const shouldClose =
      offsetY >= CLOSE_DISTANCE || velocityY >= CLOSE_VELOCITY;

    if (shouldClose) {
      tabbar.style.transform = `translateY(${tabbar.offsetHeight}px)`;

      tabbar.addEventListener(
        "transitionend",
        () => {
          closeTabMenu();
        },
        { once: true }
      );
    } else {
      tabbar.style.transform = "translateY(0)";
    }
  }

  dragHandle.addEventListener("pointerup", finishDrag);
  dragHandle.addEventListener("pointercancel", finishDrag);
})();