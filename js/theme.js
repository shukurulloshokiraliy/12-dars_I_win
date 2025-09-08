import { elLight, elSwitchbutton, elTodosContainer, elBody, elTodoInput, elTodoInputdes, cardsContainer } from "./html-elements.js";

export function initThemeSwitcher() {
  // Sahifa yuklanganda localStorage dan o'qib, theme ni set qilish
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    applyDarkMode();
  } else {
    applyLightMode();
  }

  elSwitchbutton.addEventListener("click", () => {
    if (elLight.src.includes("night_button.svg")) {
      applyDarkMode();
      localStorage.setItem("theme", "dark"); // LocalStorage ga saqlash
    } else {
      applyLightMode();
      localStorage.setItem("theme", "light"); // LocalStorage ga saqlash
    }
  });

  function applyDarkMode() {
    elLight.src = "./images/light_button.svg";

    // Todos container
    elTodosContainer.classList.remove("bg-[url('../images/light_mode.svg')]");
    elTodosContainer.classList.add("bg-[url('../images/night_mode.svg')]");

    // Body
    elBody.classList.remove("light-body");
    elBody.classList.add("dark-body");

    // Todo input
    [elTodoInput].forEach((el) => {
      el.classList.remove("light");
      el.classList.add("dark");
      el.classList.remove("bg-[url('../images/Oval.svg')]");
      el.classList.add("bg-[url('../images/Oval_dark.svg')]");
    });

    [elTodoInputdes].forEach((el) => {
      el.classList.remove("light");
      el.classList.add("dark");
    });

    // Cardlar
    cardsContainer.querySelectorAll(".card").forEach((card) => {
      const checkbox = card.querySelector("input[type='checkbox']");
      card.classList.remove("bg-white");
      card.classList.add("dark-card");

      checkbox.classList.remove("bg-[url('../images/Oval.svg')]");
      checkbox.classList.add("bg-[url('../images/Oval_dark.svg')]");
    });
  }

  function applyLightMode() {
    elLight.src = "./images/night_button.svg";

    // Todos container
    elTodosContainer.classList.remove("bg-[url('../images/night_mode.svg')]");
    elTodosContainer.classList.add("bg-[url('../images/light_mode.svg')]");

    // Body
    elBody.classList.remove("dark-body");
    elBody.classList.add("light-body");

    // Todo input
    [elTodoInput].forEach((el) => {
      el.classList.remove("dark");
      el.classList.add("light");
      el.classList.remove("bg-[url('../images/Oval_dark.svg')]");
      el.classList.add("bg-[url('../images/Oval.svg')]");
    });

    [elTodoInputdes].forEach((el) => {
      el.classList.remove("dark");
      el.classList.add("light");
    });

    // Cardlar
    cardsContainer.querySelectorAll(".card").forEach((card) => {
      const checkbox = card.querySelector("input[type='checkbox']");
      card.classList.remove("dark-card");
      card.classList.add("bg-white");

      checkbox.classList.remove("bg-[url('../images/Oval_dark.svg')]");
      checkbox.classList.add("bg-[url('../images/Oval.svg')]");
    });
  }
}
