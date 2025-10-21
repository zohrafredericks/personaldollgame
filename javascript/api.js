// -------------------- ELEMENTS --------------------
const dollArea = document.querySelector(".doll-area");
const clothesArea = document.querySelector(".clothes-area");
const resetBtn = document.getElementById("resetBtn");
const girlBtn = document.getElementById("girlBtn");
const boyBtn = document.getElementById("boyBtn");
const doll = document.getElementById("doll");

// -------------------- CLOTHES ARRAYS --------------------
const girlClothes = [
  "dress.png",
  "browntop.png",
  "trouserb.png",
  "hatbrown.png",
  "lightbrownshoe.png",
  "greentee.png",
  "girlskirt1.png"
];

const boyClothes = [
  "boyshirt1.png",
  "boytrousers1.png",
  "boyshoelt.png",
  "boyshoert.png"
];

// -------------------- DRAGGABLE LOGIC --------------------
function addDragEvents(item) {
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", null);
    e.target.classList.add("dragging");
  });

  item.addEventListener("touchstart", () => {
    item.classList.add("dragging");
  });
}

function enableDragForAll() {
  const draggables = document.querySelectorAll(".draggable");
  draggables.forEach((item) => addDragEvents(item));
}

dollArea.addEventListener("dragover", (e) => e.preventDefault());

dollArea.addEventListener("drop", (e) => {
  e.preventDefault();
  const dragging = document.querySelector(".dragging");
  if (dragging) {
    const rect = dollArea.getBoundingClientRect();
    const x = e.clientX - rect.left - dragging.width / 2;
    const y = e.clientY - rect.top - dragging.height / 2;
    const clone = dragging.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.left = `${x}px`;
    clone.style.top = `${y}px`;
    clone.classList.remove("dragging");
    dollArea.appendChild(clone);
  }
});

document.addEventListener("dragend", () => {
  const dragging = document.querySelector(".dragging");
  if (dragging) dragging.classList.remove("dragging");
});

// -------------------- LOAD CLOTHES --------------------
function loadClothes(clothesArray) {
  clothesArea.innerHTML = ""; // Clear existing clothes
  clothesArray.forEach((img) => {
    const el = document.createElement("img");
    el.src = `images/${img}`;
    el.classList.add("draggable");
    el.alt = img;
    clothesArea.appendChild(el);
    addDragEvents(el);
  });
}

// -------------------- RESET FUNCTION --------------------
resetBtn.addEventListener("click", () => {
  document
    .querySelectorAll(".doll-area img:not(#doll)")
    .forEach((item) => item.remove());
});

// -------------------- TOGGLE DOLLS --------------------
girlBtn.addEventListener("click", () => {
  doll.src = "images/lightgirl.png";
  girlBtn.classList.add("active");
  boyBtn.classList.remove("active");
  loadClothes(girlClothes);
  resetBtn.click();
});

boyBtn.addEventListener("click", () => {
  doll.src = "images/boy1.png";
  boyBtn.classList.add("active");
  girlBtn.classList.remove("active");
  loadClothes(boyClothes);
  resetBtn.click();
});

// -------------------- INITIAL LOAD --------------------
loadClothes(girlClothes); // default to girl
