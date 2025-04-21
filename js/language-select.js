const languageSelects = document.querySelectorAll(".language-select");

languageSelects.forEach((select) => {
  const trigger = select.querySelector(".select-trigger");
  const langList = select.querySelector(".language-list");
  const selectedLang = select.querySelector(".selected-language");
  const items = langList.querySelectorAll("li");

  const defaultLang = "EN";
  selectedLang.textContent = defaultLang;

  items.forEach((item) => {
    const lang = item.getAttribute("data-lang");
    if (lang === defaultLang) {
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
  });

  trigger.addEventListener("click", () => {
    langList.classList.toggle("show");
  });

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const lang = item.getAttribute("data-lang");
      selectedLang.textContent = lang;

      items.forEach((li) => li.classList.remove("selected"));
      item.classList.add("selected");

      langList.classList.remove("show");
    });
  });

  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      langList.classList.remove("show");
    }
  });
});
