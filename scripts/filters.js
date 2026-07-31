(() => {
  const resetFilterBtnArr = document.querySelectorAll(
    '[data-btn="clear-filter"]',
  );

  document
    .querySelector('li[data-filter="sort"]')
    .querySelectorAll("fieldset input")
    .forEach((input) => {
      input.checked = input.hasAttribute("data-default");
    });

  const resetSortBtnArr = document.querySelectorAll('[data-btn="clear-sort"]');

  resetFilterBtnArr.forEach((resetBtn) => {
    resetBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const container = event.target.closest("div");

      container
        .querySelectorAll('fieldset input[type="checkbox"]')
        .forEach((input) => (input.checked = false));

      container
        .querySelectorAll('fieldset input[type="radio"]')
        .forEach((input) => {
          input.checked = input.hasAttribute("data-default");
        });
    });
  });

  resetSortBtnArr.forEach((resetBtn) => {
    resetBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const container = event.target.closest("div");

      container.querySelectorAll("fieldset input").forEach((input) => {
        input.checked = input.hasAttribute("data-default");
      });

      updateSortTitle();
    });
  });

  const sortBlock = document.querySelector('li[data-filter="sort"]');
  const sortTitle = sortBlock.querySelector("summary p");
  const sortOptions = sortBlock.querySelectorAll("fieldset input");
  let currSort;

  sortBlock.addEventListener("change", (event) => {
    if (
      event.target.matches('input[name="category-sort"]') &&
      event.target.checked
    ) {
      updateSortTitle();
    }
  });

  function updateSortTitle() {
    let selectedOption = null;
    sortOptions.forEach((option) => {
      if (option.checked === true) {
        selectedOption = option;
      }
    });

    if (!selectedOption) {
      sortTitle.textContent = "Сортировка";
      return;
    }

    currSort = selectedOption.value;

    switch (currSort) {
      case "populars":
        sortTitle.textContent = "По популярности";
        break;
      case "expensive":
        sortTitle.textContent = "Сначала дорогие";
        break;
      case "cheapest":
        sortTitle.textContent = "Сначала дешевые";
        break;
      case "newest":
        sortTitle.textContent = "Новинки";
        break;
      default:
        sortTitle.textContent = "Сортировка";
    }
  }

  const filterBar = document.querySelector(".filterbar");
  const filterBarOpen = document.querySelector(".filter__open-menu");
  const filterBarClose = document.getElementById("filterbar-close");
  const overlay = document.querySelector(".tabbar__overlay");

  filterBarOpen.addEventListener("click", (event) => {
    filterBar.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
  });

  filterBarClose.addEventListener("click", (event) => {
    filterBar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });

  overlay.addEventListener("click", (event) => {
    filterBar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });

  updateSortTitle();
})();
