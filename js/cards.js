import { cardTemplate, cardsContainer, elTodoInput, elTodoInputdes, elsee } from "./html-elements.js";
import { filterCards } from "./ui-changer.js";

const editAddButton = document.getElementById("editAddButton");
let currentEditCard = null; // Hozir tahrirlanayotgan card
let todos = []; // Barcha todo cardlar

// LocalStorage dan yuklash
if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((todo) => createCard(todo.title, todo.desc, todo.id));
}

// Checkbox holatini style bilan boshqarish
function handleCheckboxChange(checkbox) {
  if (checkbox.checked) {
    checkbox.classList.replace("bg-[url('../images/Oval.svg')]", "bg-[url('../images/check-oval.svg')]");
    checkbox.classList.replace("bg-[url('../images/Oval_dark.svg')]", "bg-[url('../images/check-oval.svg')]");
  } else {
    checkbox.classList.replace("bg-[url('../images/check-oval.svg')]", "bg-[url('../images/Oval.svg')]");
  }
}

// ID generatsiya qilish
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Card yaratish funksiyasi
export function createCard(title, desc, id = null) {
  const clone = cardTemplate.content.cloneNode(true);
  const card = clone.querySelector(".card");
  const h5 = card.querySelector("h5");
  const p = card.querySelector("p");
  const checkbox = card.querySelector("input[type='checkbox']");
  const deleteBtn = card.querySelector(".delete");
  const editBtn = card.querySelector(".edit");
  const seeBtn = card.querySelector("button[title='Ko\\'rish']") || elsee;

  const todoId = id || generateId();

  h5.textContent = title;
  p.textContent = desc;

  // Checkbox event
  checkbox.addEventListener("change", () => handleCheckboxChange(checkbox));
  handleCheckboxChange(checkbox);

  // Edit button
  editBtn.addEventListener("click", () => {
    currentEditCard = card;
    elTodoInput.value = h5.textContent;
    elTodoInputdes.value = p.textContent;
    editAddButton.textContent = "Tahrirlash";
  });

  // Delete button
  deleteBtn.addEventListener("click", () => {
    card.remove();
    todos = todos.filter((t) => t.id !== todoId);
    localStorage.setItem("todos", JSON.stringify(todos));
    filterCards("all");
  });

  // See button → alert bilan ma’lumotni ko‘rsatish
  seeBtn.addEventListener("click", () => {
    alert(`Title: ${h5.textContent}\nDescription: ${p.textContent}`);
  });

  // Show/hide delete button on hover
  card.addEventListener("mouseenter", () => deleteBtn.classList.remove("hidden"));
  card.addEventListener("mouseleave", () => deleteBtn.classList.add("hidden"));

  cardsContainer.appendChild(clone);
  filterCards("all");

  // Yangi card bo‘lsa, localStorage ga saqlash
  if (!id) {
    todos.push({ id: todoId, title, desc });
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

// Form submit (add yoki edit)
const elForm = document.getElementById("todoForm");
elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = elTodoInput.value.trim();
  const desc = elTodoInputdes.value.trim();
  if (!title || !desc) return;

  if (currentEditCard) {
    const h5 = currentEditCard.querySelector("h5");
    const p = currentEditCard.querySelector("p");

    // Old value saqlab, keyin yangilash
    const oldId = todos.find((t) => t.id === currentEditCard.dataset.id)?.id;

    h5.textContent = title;
    p.textContent = desc;

    if (oldId) {
      todos = todos.map((t) =>
        t.id === oldId ? { ...t, title, desc } : t
      );
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    editAddButton.textContent = "Tasdiqlash";
    currentEditCard = null;
    elForm.reset();
  } else {
    createCard(title, desc);
    elForm.reset();
  }
});
