// -------------------- ELEMENTS --------------------
const dollArea = document.querySelector(".doll-area");
const clothesArea = document.querySelector(".clothes-area");
const resetBtn = document.getElementById("resetBtn");
const girlBtn = document.getElementById("girlBtn");
const boyBtn = document.getElementById("boyBtn");
const doll = document.getElementById("doll");

// -------------------- CLOTHES ARRAYS --------------------
const girlClothes = [
  "dress.png","browntop.png","trouserb.png","hatbrown.png",
  "lightbrownshoe.png","greentee.png","girlskirt1.png",
  "top.png","top1.png","ballgown1.png","brownjersey1.png"
];

const boyClothes = [
  "boyshirt1.png","boytrousers1.png","boyshoelt.png","boyshoert.png",
  "jerseygreen.png","darkbrownshoe1.png","darkbrownshoe2.png",
  "darkbrownshoe3.png","darkbrownshoe4.png","applet.png","onez.png","brownt.png"
];

// -------------------- DRAGGABLE LOGIC --------------------
function addDragEvents(item) {
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", null);
    item.classList.add("dragging");
  });
  item.addEventListener("touchstart", () => {
    item.classList.add("dragging");
  });
}

function enableDragForAll() {
  const draggables = document.querySelectorAll(".draggable");
  draggables.forEach((item) => addDragEvents(item));
}

// -------------------- DROP AREA --------------------
dollArea.addEventListener("dragover", (e) => e.preventDefault());

dollArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropItem(e.clientX, e.clientY);
});

dollArea.addEventListener("touchend", (e) => {
  const touch = e.changedTouches[0];
  dropItem(touch.clientX, touch.clientY);
});

function dropItem(x, y){
  const dragging = document.querySelector(".dragging");
  if(dragging){
    const rect = dollArea.getBoundingClientRect();
    const clone = dragging.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.left = `${x - rect.left - dragging.width/2}px`;
    clone.style.top = `${y - rect.top - dragging.height/2}px`;
    clone.classList.remove("dragging");
    dollArea.appendChild(clone);
  }
}

// -------------------- HIGHLIGHT DOLL AREA --------------------
dollArea.addEventListener("dragenter", () => {
  dollArea.style.borderColor = "#c94e8a";
  dollArea.style.background = "#fff0f8";
});

dollArea.addEventListener("dragleave", () => {
  dollArea.style.borderColor = "#aaa";
  dollArea.style.background = "#fff";
});

document.addEventListener("touchmove", (e) => {
  const dragging = document.querySelector(".dragging");
  if (!dragging) return;
  const touch = e.touches[0];
  const rect = dollArea.getBoundingClientRect();
  if(touch.clientX > rect.left && touch.clientX < rect.right &&
     touch.clientY > rect.top && touch.clientY < rect.bottom){
    dollArea.style.borderColor = "#c94e8a";
    dollArea.style.background = "#fff0f8";
  } else {
    dollArea.style.borderColor = "#aaa";
    dollArea.style.background = "#fff";
  }
});

// Reset highlight on drop
dollArea.addEventListener("drop", () => {
  dollArea.style.borderColor = "#aaa";
  dollArea.style.background = "#fff";
});

// -------------------- LOAD CLOTHES --------------------
function loadClothes(clothesArray){
  clothesArea.innerHTML = "";
  clothesArray.forEach((img)=>{
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
  document.querySelectorAll(".doll-area img:not(#doll)").forEach(i=>i.remove());
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
loadClothes(girlClothes);




