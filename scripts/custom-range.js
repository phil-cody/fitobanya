function initRangeSlider(container) {
  const root = container || document;
  
  const inputMin = root.querySelector(".custom-range__input-min");
  const inputMax = root.querySelector(".custom-range__input-max");
  const track = root.querySelector(".custom-range-track");
  const textMin = root.querySelector('[data-val="min"]');
  const textMax = root.querySelector('[data-val="max"]');
  const resetBtn = root.querySelector('[data-btn="clear-range"]');

  if (!inputMin || !inputMax || !track || !textMin || !textMax) {
    console.warn('Не все элементы слайдера найдены в контейнере', container);
    return null;
  }

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

    if (textMin) {
      textMin.textContent = valMin.toLocaleString("ru-RU") + " ₽";
    }
    if (textMax) {
      textMax.textContent = valMax.toLocaleString("ru-RU") + " ₽";
    }
  }

  function resetSlider(e) {
    if (e) e.preventDefault();
    inputMin.value = defaultMin;
    inputMax.value = defaultMax;
    updateSlider();
  }

  const handlers = {
    inputMin: (e) => updateSlider(e),
    inputMax: (e) => updateSlider(e),
    reset: resetSlider
  };

  inputMin.addEventListener("input", handlers.inputMin);
  inputMax.addEventListener("input", handlers.inputMax);
  if (resetBtn) {
    resetBtn.addEventListener("click", handlers.reset);
  }

  updateSlider();

  return {
    update: updateSlider,
    reset: resetSlider,
    getValues: () => ({
      min: parseInt(inputMin.value),
      max: parseInt(inputMax.value)
    }),
    destroy: () => {
      inputMin.removeEventListener("input", handlers.inputMin);
      inputMax.removeEventListener("input", handlers.inputMax);
      if (resetBtn) {
        resetBtn.removeEventListener("click", handlers.reset);
      }
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.custom-range');
  
  sliders.forEach((sliderContainer, index) => {
    let container = sliderContainer.closest('.filter') || 
                    sliderContainer.closest('fieldset') || 
                    sliderContainer.parentElement;
    
    if (container) {
      const slider = initRangeSlider(container);
      if (slider) {
        console.log(`Слайдер #${index + 1} инициализирован`);
      }
    }
  });
});