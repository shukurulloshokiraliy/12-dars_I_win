import { elTodoInput, elTodoInputdes } from "./html-elements.js";
import { initThemeSwitcher } from "./theme.js";
import { initFilters } from "./ui-changer.js";
import { createCard } from "./cards.js";


initThemeSwitcher();
initFilters();


const elForm = document.getElementById("todoForm");
elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = elTodoInput.value.trim();
  const desc = elTodoInputdes.value.trim();
  if (!title || !desc) return;

  createCard(title, desc);
  elForm.reset();
});
