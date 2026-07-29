(() => {
  const header = document.querySelector(".header");
  if (!header) return;

  const toggleSticky = () => {
    header.classList.toggle("header__sticky", window.scrollY > 10);
  };

  window.addEventListener("scroll", toggleSticky);
  toggleSticky();
})();

(() => {
  const tabbar = document.querySelector(".tabbar");
  if (!tabbar) return;

  const toggleSticky = () => {
    tabbar.classList.toggle("tabbar__sticky", window.scrollY > 10);
  };

  window.addEventListener("scroll", toggleSticky);
  toggleSticky();
})();
