const dollGirl = document.getElementById("doll-girl");
const dollBoy = document.getElementById("doll-boy");
const dollArea = document.querySelector(".doll-area");
const clothesArea = document.querySelector(".clothes-area");
const resetBtn = document.getElementById("resetBtn");
const girlBtn = document.getElementById("girlBtn");
const boyBtn = document.getElementById("boyBtn");

// -------------------- DRAG & DROP --------------------
function addDragEvents(item) {
  item.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", null);
    item.classList.add("dragging");
  });
  item.addEventListener("touchstart", () => item.classList.add("dragging"));
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

dollArea.addEventListener("dragover", e => e.preventDefault());
dollArea.addEventListener("drop", e => {
  e.preventDefault();
  dropItem(e.clientX, e.clientY);
});
dollArea.addEventListener("touchend", e => {
  const touch = e.changedTouches[0];
  dropItem(touch.clientX, touch.clientY);
});

// Enable dragging for all clothes in HTML
document.querySelectorAll(".draggable").forEach(addDragEvents);

// -------------------- RESET --------------------
resetBtn.addEventListener("click", () => {
  document.querySelectorAll(".doll-area img:not(#doll-girl):not(#doll-boy)").forEach(i => i.remove());
});

// -------------------- TOGGLE DOLLS --------------------
girlBtn.addEventListener("click", () => {
  dollGirl.style.display = "block";
  dollBoy.style.display = "none";
  girlBtn.classList.add("active");
  boyBtn.classList.remove("active");
});

boyBtn.addEventListener("click", () => {
  dollGirl.style.display = "none";
  dollBoy.style.display = "block";
  boyBtn.classList.add("active");
  girlBtn.classList.remove("active");
});


