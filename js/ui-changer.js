import { allBtn, activeBtn, completedBtn, elclear, cardsContainer } from "./html-elements.js";

let noDataEl = document.createElement("p");
noDataEl.textContent = "No data";
noDataEl.className = "text-center text-gray-500 dark:text-gray-400 mt-4 hidden";
cardsContainer.after(noDataEl);

export function filterCards(status) {
  let visibleCount = 0;
  const cards = cardsContainer.querySelectorAll(".card");

  cards.forEach((card) => {
    const checkbox = card.querySelector("input[type='checkbox']");
    const isChecked = checkbox.checked;

    let show = status === "all" || (status === "active" && !isChecked) || (status === "completed" && isChecked);

    card.style.display = show ? "flex" : "none";
    if (show) visibleCount++;
  });

  noDataEl.style.display = visibleCount === 0 ? "block" : "none";

  [allBtn, activeBtn, completedBtn].forEach((btn) => btn.classList.remove("text-blue-600"));
  if (status === "all") allBtn.classList.add("text-blue-600");
  if (status === "active") activeBtn.classList.add("text-blue-600");
  if (status === "completed") completedBtn.classList.add("text-blue-600");
}

export function initFilters() {
  allBtn.addEventListener("click", () => filterCards("all"));
  activeBtn.addEventListener("click", () => filterCards("active"));
  completedBtn.addEventListener("click", () => filterCards("completed"));

  elclear.addEventListener("click", () => {
    cardsContainer.querySelectorAll(".card").forEach((card) => {
      if (card.querySelector("input[type='checkbox']").checked) {
        card.remove();
      }
    });
    filterCards("completed");
  });
}
