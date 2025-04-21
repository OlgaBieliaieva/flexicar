(() => {
  const menuBtn = document.querySelector(".js-toggle-menu");
  const mobileMenu = document.querySelector(".js-menu-container");
  const menuIcon = menuBtn.querySelector("use");

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", isOpen);

    const iconId = isOpen ? "#icon-close" : "#icon-burger-menu";
    menuIcon.setAttribute("href", `./assets/icons/icons-sprite.svg${iconId}`);

    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  menuBtn.addEventListener("click", toggleMenu);

  window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
    if (!e.matches) return;
    mobileMenu.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", false);
    menuIcon.setAttribute(
      "href",
      `./assets/icons/icons-sprite.svg#icon-burger-menu`
    );
    document.body.classList.remove("no-scroll");
  });
})();
