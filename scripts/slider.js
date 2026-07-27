const sliderArr = Array.from(document.querySelectorAll(".slider"));
const prevArr = Array.from(document.querySelectorAll(".button__prev"));
const nextArr = Array.from(document.querySelectorAll(".button__next"));

const fault = 4;

for (let i = 0; i < sliderArr.length; i++) {
  const cards = Array.from(sliderArr[i].children);
  const prev = prevArr[i];
  const next = nextArr[i];

  if (sliderArr[i].scrollLeft <= fault) {
    prev.disabled = true;
  }

  sliderArr[i].addEventListener("scroll", () => {
    let sliderWidth = sliderArr[i].scrollWidth;
    let viewSliderWidth = sliderArr[i].clientWidth;
    const maxScroll = sliderWidth - viewSliderWidth;

    if (sliderArr[i].scrollLeft >= maxScroll - fault) {
      next.disabled = true;
    } else if (sliderArr[i].scrollLeft <= fault) {
      prev.disabled = true;
    } else {
      next.disabled = false;
      prev.disabled = false;
    }
  });

  prev.addEventListener("click", () => {
    let target = null;

    const sliderRect = sliderArr[i].getBoundingClientRect();

    for (let j = cards.length - 1; j >= 0; j--) {
      const card = cards[j];
      const cardRect = card.getBoundingClientRect();

      if (cardRect.left < sliderRect.left - fault) {
        target = card;
        break;
      }
    }

    if (!target) return;

    const targetRect = target.getBoundingClientRect();
    const newScroll =
      targetRect.left - sliderRect.left + sliderArr[i].scrollLeft;

    sliderArr[i].scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  });

  next.addEventListener("click", () => {
    let target = null;

    const sliderRect = sliderArr[i].getBoundingClientRect();

    for (let j = 0; j < cards.length; j++) {
      const card = cards[j];
      const cardRect = card.getBoundingClientRect();

      if (cardRect.left > sliderRect.left + fault) {
        target = card;
        break;
      }
    }

    if (!target) return;

    const targetRect = target.getBoundingClientRect();
    const newScroll =
      targetRect.left - sliderRect.left + sliderArr[i].scrollLeft;

    sliderArr[i].scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  });
}