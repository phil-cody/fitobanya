(() => {
  const pagesBox = document.querySelector(".pagination ul");

  pagesBox.addEventListener("click", (event) => {
    if (!event.target.closest("li")) return;

    const currentPage = event.target.closest("li");

    Array.from(pagesBox.children).forEach((item) =>
      item.classList.remove("active"),
    );
    currentPage.classList.add("active");
  });
})();
