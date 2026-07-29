const menu = document.getElementById('burger-menu');
const menu1level = document.getElementById('burger-menu-1-level');
const menu2level = document.getElementById('burger-menu-2-level');
const openBurgerBtn = document.getElementById('burger-open');
const overlay = document.getElementById('overlay');

let isMenuOpen = false;
let currMenuLevel = 1;

function openMenu() {

  menu.classList.add("menu__open");
  overlay.classList.add("active");

  document.body.classList.add('no-scroll');

  isMenuOpen = true;
}

function closeMenu() {
  menu.classList.remove("menu__open");
  overlay.classList.remove("active");

  document.body.classList.remove('no-scroll');

  isMenuOpen = false;
}

function changeMenuLevel() {
  if (currMenuLevel === 1) {
    currMenuLevel = 2;
    menu1level.classList.add('level-2-active');
    menu1level.classList.remove('level-1-active');

    menu2level.classList.add('level-2-active');
    menu2level.classList.remove('level-1-active');
  } else if (currMenuLevel === 2) {
    currMenuLevel = 1;
    menu1level.classList.add('level-1-active');
    menu1level.classList.remove('level-2-active');

    menu2level.classList.add('level-1-active');
    menu2level.classList.remove('level-2-active');
  }
}

openBurgerBtn.addEventListener("click", openMenu);

document.addEventListener("click", (event) => {
  const target = event.target;

  if (
    isMenuOpen &&
    (
      target.classList.contains("header__overlay") ||
      target.classList.contains("menu__close") ||
      target.closest(".menu__close")
    )
  ) {
    closeMenu();
  }

  if (target.closest(".toggle-level-menu")) {
    changeMenuLevel();
  }
});