const undoStack = [];
const redoStack = [];
const counter = document.getElementById("counter");

document.body.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") return;

  const circle = document.createElement("div");
  circle.className = "circle";
  circle.style.left = `${e.clientX - 25}px`;
  circle.style.top = `${e.clientY - 25}px`;
  circle.style.backgroundColor = getRandomColor();
  document.body.appendChild(circle);

  undoStack.push(circle);
  redoStack.length = 0;
  updateCounter();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  undoStack.forEach(c => c.remove());
  undoStack.length = 0;
  redoStack.length = 0;
  updateCounter();
});

document.getElementById("undoBtn").addEventListener("click", () => {
  if (undoStack.length > 0) {
    const circle = undoStack.pop();
    redoStack.push(circle);
    circle.remove();
    updateCounter();
  }
});

document.getElementById("redoBtn").addEventListener("click", () => {
  if (redoStack.length > 0) {
    const circle = redoStack.pop();
    document.body.appendChild(circle);
    undoStack.push(circle);
    updateCounter();
  }
});

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
}

function updateCounter() {
  counter.textContent = `Circles: ${undoStack.length}`;
}