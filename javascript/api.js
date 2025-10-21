const draggables = document.querySelectorAll(".draggable");
const dollArea = document.querySelector(".doll-area");
const resetBtn = document.getElementById("resetBtn");
const girlBtn = document.getElementById("girlBtn");
const boyBtn = document.getElementById("boyBtn");
const doll = document.getElementById("doll");

// ----------- DRAG & DROP LOGIC -----------
draggables.forEach((item) => {
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", null);
    e.target.classList.add("dragging");
  });

  item.addEventListener("touchstart", () => {
    item.classList.add("dragging");
  });
});

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

resetBtn.addEventListener("click", () => {
  document
    .querySelectorAll(".doll-area img:not(#doll)")
    .forEach((item) => item.remove());
});

// ----------- TOGGLE BETWEEN DOLLS -----------
girlBtn.addEventListener("click", () => {
  doll.src = "images/lightgirl.png";
  girlBtn.classList.add("active");
  boyBtn.classList.remove("active");
  resetBtn.click(); // Clear clothes when switching
});

boyBtn.addEventListener("click", () => {
  doll.src = "images/boy1.png";
  boyBtn.classList.add("active");
  girlBtn.classList.remove("active");
  resetBtn.click(); // Clear clothes when switching
});

  
     
       
    

