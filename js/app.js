const figurePat = document.querySelectorAll(".figure-part");
const wrongLetter = document.querySelector(".wrong-letters");
const word = document.querySelector(".word");
const popupCt = document.querySelector(".popup-container");
// const popup = document.querySelector(".popup");
const message = document.querySelector("#final-message");
const playAgain = document.querySelector(".play-again");
const notification = document.querySelector(".notification-container");
const words = [
  "programming",
  "website",
  "interface",
  "developer",
  "application",
  "exit",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correct = [];
const wrong = [];
console.log(selectedWord);
function displayWord() {
  const text = selectedWord.split("").map((cur) => {
    return `<span class="letter">${correct.includes(cur) ? cur : " "}</span>`;
  });
  word.innerHTML = text.join("");
  console.log(word.innerText.replace(/\n/g, "") == selectedWord);
  if (word.innerText.replace(/\n/g, "") == selectedWord) {
    message.innerText = "Congratulations! You won! 😃";
    popupCt.style.display = "flex";
  }
}
function shownotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 1000);
}
function updateWrongLetter() {
  wrongLetter.innerHTML = `
    ${wrong.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrong.map((letter) => `<span>${letter}</span>`)}
    `;
  if (wrong.length === figurePat.length) {
    message.innerText = "Unfortunately you lost. 😕";
    popupCt.style.display = "flex";
  }
  if (wrong.length < figurePat.length && wrong.length > 0) {
    figurePat[wrong.length - 1].style.display = "block";
  }
}
window.addEventListener("keydown", (e) => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    if (selectedWord.split("").includes(e.key)) {
      if (correct.includes(e.key)) {
        shownotification();
      } else {
        correct.push(e.key);
        displayWord();
      }
    } else {
      if (wrong.includes(e.key)) {
        shownotification();
      } else {
        wrong.push(e.key);
        updateWrongLetter();
      }
    }
  }
});
playAgain.addEventListener("click", (e) => {
  correct.splice(0);
  wrong.splice(0);
  figurePat.forEach((cur) => {
    cur.style.display = "none";
  });
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  popupCt.style.display = "none";
  updateWrongLetter();
});

displayWord();
