// -------------------- ELEMENTS --------------------
const dollArea = document.querySelector(".doll-area");
const clothesArea = document.querySelector(".clothes-area");
const resetBtn = document.getElementById("resetBtn");
const girlBtn = document.getElementById("girlBtn");
const boyBtn = document.getElementById("boyBtn");
const doll = document.getElementById("doll");

// -------------------- UNISEX CLOTHES --------------------
const unisexClothes = [
  "dress.png","browntop.png","trouserb.png","hatbrown.png",
  "lightbrownshoe.png","lightbrownshoe2.png","greentee.png",
  "girlskirt1.png","top.png","top1.png","ballgown1.png",
  "brownjersey1.png","blueshirt1.png","jerseygreen.png",
  "boyshoelt.png","boyshoert.png","applet.png","onez.png",
  "brownt.png","darkbrownshoe1.png","darkbrownshoe2.png",
  "darkbrownshoe3.png","darkbrownshoe4.png"
];

// -------------------- DRAG & DROP --------------------
function addDragEvents(item) {
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", null);
    item.classList.add("dragging");
  });
  item.addEventListener("touchstart", () => item.classList.add("dragging"));
}

function enableDragForAll() {
  document.querySelectorAll(".draggable").forEach(addDragEvents);
}

function dropItem(x, y) {
  const dragging = document.querySelector(".dragging");
  if (!dragging) return;
  const rect = dollArea.getBoundingClientRect();
  const clone = dragging.cloneNode(true);
  clone.style.position = "absolute";
  clone.style.left = `${x - rect.left - dragging.width/2}px`;
  clone.style.top = `${y - rect.top - dragging.height/2}px`;
  clone.classList.remove("dragging");
  dollArea.appendChild(clone);
}

dollArea.addEventListener("dragover", (e) => e.preventDefault());
dollArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropItem(e.clientX, e.clientY);
});
dollArea.addEventListener("touchend", (e) => {
  const touch = e.changedTouches[0];
  dropItem(touch.clientX, touch.clientY);
});

// -------------------- LOAD CLOTHES --------------------
function loadClothes(clothesArray) {
  clothesArea.innerHTML = "";
  clothesArray.forEach((img) => {
    const el = document.createElement("img");
    el.src = `images/${img}`;
    el.alt = img;
    el.classList.add("draggable");
    clothesArea.appendChild(el);
    addDragEvents(el);
  });
  enableDragForAll();
}

// -------------------- RESET FUNCTION --------------------
resetBtn.addEventListener("click", () => {
  document.querySelectorAll(".doll-area img:not(#doll)").forEach(i => i.remove());
});

// -------------------- TOGGLE DOLLS --------------------
girlBtn.addEventListener("click", () => {
  doll.src = "images/lightgirl.png";
  girlBtn.classList.add("active");
  boyBtn.classList.remove("active");
});

boyBtn.addEventListener("click", () => {
  doll.src = "images/boy1.png";
  boyBtn.classList.add("active");
  girlBtn.classList.remove("active");
});

// -------------------- INITIAL LOAD --------------------
loadClothes(unisexClothes); // single clothes panel for both dolls


