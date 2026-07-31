(() => {
  const inputMin = document.querySelector(".custom-range__input-min");
  const inputMax = document.querySelector(".custom-range__input-max");
  const track = document.querySelector(".custom-range-track");
  const textMin = document.querySelector('[data-val="min"]');
  const textMax = document.querySelector('[data-val="max"]');
  const resetBtn = document.querySelector('[data-btn="clear-range"]');

  const defaultMin = inputMin.value || inputMin.min;
  const defaultMax = inputMax.value || inputMax.max;

  function updateSlider(e) {
    const min = parseInt(inputMin.min);
    const max = parseInt(inputMax.max);
    let valMin = parseInt(inputMin.value);
    let valMax = parseInt(inputMax.value);

    if (e && e.target === inputMin) {
      if (valMin >= valMax) {
        inputMin.value = valMax;
        valMin = valMax;
      }
    } else if (e && e.target === inputMax) {
      if (valMax <= valMin) {
        inputMax.value = valMin;
        valMax = valMin;
      }
    }

    if (valMin === valMax) {
      if (e && e.target === inputMin) {
        inputMin.style.zIndex = "12";
        inputMax.style.zIndex = "11";
      } else if (e && e.target === inputMax) {
        inputMin.style.zIndex = "11";
        inputMax.style.zIndex = "12";
      }
    } else {
      inputMin.style.zIndex = "11";
      inputMax.style.zIndex = "11";
    }

    const percentMin = ((valMin - min) / (max - min)) * 100;
    const percentMax = ((valMax - min) / (max - min)) * 100;

    track.style.background = `linear-gradient(to right, #ebe9e5 ${percentMin}%, #544945 ${percentMin}%, #544945 ${percentMax}%, #ebe9e5 ${percentMax}%)`;

    textMin.textContent = valMin.toLocaleString("ru-RU")+ " ₽";
    textMax.textContent = valMax.toLocaleString("ru-RU")+ " ₽";
  }

  function resetSlider(e) {
    e.preventDefault();
    inputMin.value = defaultMin;
    inputMax.value = defaultMax;
    updateSlider();
  }

  inputMin.addEventListener("input", (e) => updateSlider(e));
  inputMax.addEventListener("input", (e) => updateSlider(e));
  resetBtn.addEventListener("click", resetSlider);

  updateSlider();
})();
