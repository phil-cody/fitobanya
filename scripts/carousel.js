const carousels = document.querySelectorAll("[data-carousel]");
const fault = 4;

carousels.forEach((carousel) => {
  const track = carousel.querySelector("[data-carousel-track]");
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  const progress = carousel.querySelector("[data-carousel-progress]");

  if (!track) return;

  const cards = Array.from(track.children);

  if (!cards.length) return;

  const getPaddingLeft = () =>
    parseFloat(window.getComputedStyle(track).paddingLeft) || 0;

  const getMaxScroll = () =>
    Math.max(0, track.scrollWidth - track.clientWidth);

  const getContentStart = () => {
    const trackRect = track.getBoundingClientRect();

    return trackRect.left + getPaddingLeft();
  };

  const updateButtons = () => {
    const maxScroll = getMaxScroll();

    if (prev) {
      prev.disabled = track.scrollLeft <= fault;
    }

    if (next) {
      next.disabled = track.scrollLeft >= maxScroll - fault;
    }
  };

  const scrollToCard = (card) => {
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const targetScroll =
      track.scrollLeft +
      cardRect.left -
      (trackRect.left + getPaddingLeft());

    track.scrollTo({
      left: Math.max(0, Math.min(targetScroll, getMaxScroll())),
      behavior: "smooth",
    });
  };

  const progressItems = [];

  if (progress) {
    progress.replaceChildren();

    cards.forEach((card, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.setAttribute("aria-label", `Перейти к слайду ${index + 1}`);

      button.addEventListener("click", () => {
        scrollToCard(card);
      });

      progress.append(button);
      progressItems.push(button);
    });
  }

  const updateProgress = () => {
    if (!progressItems.length) return;

    const contentStart = getContentStart();

    let activeIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.getBoundingClientRect().left - contentStart
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        activeIndex = index;
      }
    });

    progressItems.forEach((item, index) => {
      const isActive = index === activeIndex;

      item.classList.toggle("is-active", isActive);
      item.toggleAttribute("aria-current", isActive);
    });
  };

  track.addEventListener("scroll", () => {
    updateButtons();
    updateProgress();
  });

  prev?.addEventListener("click", () => {
    const contentStart = getContentStart();

    const target = [...cards]
      .reverse()
      .find((card) => card.getBoundingClientRect().left < contentStart - fault);

    if (target) scrollToCard(target);
  });

  next?.addEventListener("click", () => {
    const contentStart = getContentStart();

    const target = cards.find(
      (card) => card.getBoundingClientRect().left > contentStart + fault
    );

    if (target) scrollToCard(target);
  });

  updateButtons();
  updateProgress();
});