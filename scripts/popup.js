(() => {
  const openButtons = document.querySelectorAll('[data-btn="popup"]');
  const closeButtons = document.querySelectorAll('[data-btn="close"]');
  const popups = document.querySelectorAll("dialog");

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const popup = document.querySelector(
        `#popup_${button.getAttribute("name")}`,
      );

      if (popup) {
        popup.showModal();
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      popups.forEach((popup) => popup.close());
    });
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.tagName.toLowerCase() === 'dialog') {
      popups.forEach((popup) => popup.close());
    }
  })
})()
