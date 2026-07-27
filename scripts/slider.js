(() => {
  const fault = 4;

  document.querySelectorAll(".slider").forEach((slider) => {
    const cards = Array.from(slider.children).filter(
      (item) => !item.matches("[data-slider-controls]"),
    );

    const section = slider.closest("section") || slider.parentElement;
    const prev = section.querySelector(".button__prev");
    const next = section.querySelector(".button__next");

    if (!cards.length || !prev || !next) return;

    const getPaddingLeft = () =>
      parseFloat(window.getComputedStyle(slider).paddingLeft) || 0;

    const getMaxScroll = () =>
      Math.max(0, slider.scrollWidth - slider.clientWidth);

    const getContentStart = () => {
      return slider.getBoundingClientRect().left + getPaddingLeft();
    };

    const getActiveCardIndex = () => {
      const contentStart = getContentStart();

      let activeIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const distance = Math.abs(
          card.getBoundingClientRect().left - contentStart,
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          activeIndex = index;
        }
      });

      return activeIndex;
    };

    const updateButtons = () => {
      const maxScroll = getMaxScroll();

      prev.disabled = slider.scrollLeft <= fault;
      next.disabled = slider.scrollLeft >= maxScroll - fault;
    };

    const scrollToCard = (card) => {
      const sliderRect = slider.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const targetScroll =
        slider.scrollLeft +
        cardRect.left -
        (sliderRect.left + getPaddingLeft());

      slider.scrollTo({
        left: Math.max(0, Math.min(targetScroll, getMaxScroll())),
        behavior: "smooth",
      });
    };

    slider.addEventListener("scroll", updateButtons);

    prev.addEventListener("click", () => {
      const activeIndex = getActiveCardIndex();
      const target = cards[activeIndex - 1];

      if (target) {
        scrollToCard(target);
      }
    });

    next.addEventListener("click", () => {
      const activeIndex = getActiveCardIndex();
      const target = cards[activeIndex + 1];

      if (target) {
        scrollToCard(target);
      }
    });

    updateButtons();
  });
})();
