const texts = [
  "The fastest way to improve your typing is to practice regularly with accuracy and patience.",
  "Good typing skills help you work faster, communicate clearly, and save valuable time every day.",
  "Technology changes quickly, but strong keyboard skills remain useful for school, work, and creativity.",
  "Focus on accuracy first. Speed will naturally improve as your fingers become more familiar with the keyboard."
];

const quote = document.querySelector("#quote");
const input = document.querySelector("#input");
const timeEl = document.querySelector("#time");
const wpmEl = document.querySelector("#wpm");
const accEl = document.querySelector("#accuracy");
const errEl = document.querySelector("#errors");
const start = document.querySelector("#start");
const restart = document.querySelector("#restart");
const result = document.querySelector("#result");
const themeBtn = document.querySelector("#themeBtn");

let duration = 15;
let timeLeft = 15;
let running = false;
let startAt = 0;
let timer = null;
let text = "";

function reset() {
  clearInterval(timer);

  running = false;
  timeLeft = duration;

  timeEl.textContent = duration;
  wpmEl.textContent = "0";
  accEl.textContent = "100%";
  errEl.textContent = "0";

  input.value = "";
  input.disabled = false;

  result.classList.add("hidden");
  start.textContent = "Start Typing";

  text = texts[Math.floor(Math.random() * texts.length)];

  render();
}

function render() {
  const typed = input.value;

  quote.innerHTML = "";

  [...text].forEach((ch, i) => {
    const span = document.createElement("span");

    span.textContent = ch;

    if (i < typed.length) {
      span.className = typed[i] === ch ? "correct" : "wrong";
    } else if (i === typed.length) {
      span.className = "current";
    } else {
      span.className = "pending";
    }

    quote.appendChild(span);
  });
}

function update() {
  const typed = input.value;

  let correct = 0;

  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === text[i]) {
      correct++;
    }
  }

  const elapsed = Math.max(
    0.1,
    (Date.now() - startAt) / 1000
  );

  // Standard WPM calculation
  const wpm = Math.round(
    (correct / 5) / (elapsed / 60)
  );

  const accuracy = typed.length
    ? Math.round((correct / typed.length) * 100)
    : 100;

  const errors = Math.max(
    0,
    typed.length - correct
  );

  wpmEl.textContent = wpm;
  accEl.textContent = accuracy + "%";
  errEl.textContent = errors;

  render();
}

function finish() {
  clearInterval(timer);

  running = false;
  input.disabled = true;

  update();

  start.textContent = "Test Finished";

  const score = Number(wpmEl.textContent);
  const accuracy = accEl.textContent;
  const errors = errEl.textContent;

  let best = Number(
    localStorage.getItem("typingBest") || 0
  );

  let newBest = false;

  if (score > best) {
    best = score;

    localStorage.setItem(
      "typingBest",
      best
    );

    newBest = true;
  }

  result.innerHTML = `
    <h3>🏆 Final Result</h3>
    <p><strong>WPM:</strong> ${score}</p>
    <p><strong>Accuracy:</strong> ${accuracy}</p>
    <p><strong>Errors
