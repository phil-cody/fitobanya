const sliderArr = Array.from(document.querySelectorAll(".slider"));
const prevArr = Array.from(document.querySelectorAll(".button__prev"));
const nextArr = Array.from(document.querySelectorAll(".button__next"));

const fault = 4;

for (let i = 0; i < sliderArr.length; i++) {
  const slider = sliderArr[i];
  const cards = Array.from(slider.children);
  const prev = prevArr[i];
  const next = nextArr[i];

  const getPaddingLeft = () =>
    parseFloat(window.getComputedStyle(slider).paddingLeft) || 0;

  const getMaxScroll = () => slider.scrollWidth - slider.clientWidth;

  const updateButtons = () => {
    const maxScroll = getMaxScroll();

    prev.disabled = slider.scrollLeft <= fault;
    next.disabled = slider.scrollLeft >= maxScroll - fault;
  };

  const scrollToCard = (card) => {
    const sliderRect = slider.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const paddingLeft = getPaddingLeft();
    const maxScroll = getMaxScroll();
    const targetScroll = slider.scrollLeft
      + cardRect.left
      - (sliderRect.left + paddingLeft);

    slider.scrollTo({
      left: Math.max(0, Math.min(targetScroll, maxScroll)),
      behavior: "smooth",
    });
  };

  updateButtons();

  slider.addEventListener("scroll", updateButtons);

  prev.addEventListener("click", () => {
    const sliderRect = slider.getBoundingClientRect();
    const contentStart = sliderRect.left + getPaddingLeft();

    const target = [...cards]
      .reverse()
      .find((card) => card.getBoundingClientRect().left < contentStart - fault);

    if (target) {
      scrollToCard(target);
    }
  });

  next.addEventListener("click", () => {
    const sliderRect = slider.getBoundingClientRect();
    const contentStart = sliderRect.left + getPaddingLeft();

    const target = cards.find(
      (card) => card.getBoundingClientRect().left > contentStart + fault
    );

    if (target) {
      scrollToCard(target);
    }
  });
}