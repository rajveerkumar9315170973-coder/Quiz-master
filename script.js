// ---- Quiz data ----
var questions = [
  { q: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Mark Language"], answer: 0 },
  { q: "Which tag creates the largest heading?",
    options: ["<head>", "<h6>", "<h1>", "<heading>"], answer: 2 },
  { q: "Which CSS property changes the text color?",
    options: ["font-color", "color", "text-style", "background"], answer: 1 },
  { q: "Which symbol is used for an ID selector in CSS?",
    options: [".", "*", "&", "#"], answer: 3 },
  { q: "Which keyword creates a variable in modern JavaScript?",
    options: ["let", "var1", "int", "dim"], answer: 0 },
  { q: "Which HTML tag is used to link a JavaScript file?",
    options: ["<link>", "<script>", "<js>", "<style>"], answer: 1 },
  { q: "Which CSS property makes the corners of a box round?",
    options: ["corner-style", "round", "border-radius", "box-curve"], answer: 2 },
  { q: "Which method shows a message in the browser console?",
    options: ["console.log()", "print()", "alert.log()", "echo()"], answer: 0 }
];

// ---- State ----
var currentIndex = 0;
var score = 0;
var playerName = "";

// ---- Elements ----
var pages = document.querySelectorAll(".page");
var nameInput = document.getElementById("playerName");
var nameError = document.getElementById("nameError");
var optionsBox = document.getElementById("options");
var nextBtn = document.getElementById("nextBtn");
var feedback = document.getElementById("feedback");

function showPage(id) {
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove("active");
  }
  document.getElementById(id).classList.add("active");
}

function startQuiz() {
  var name = nameInput.value.trim();
  if (name === "") {
    nameError.textContent = "Please enter your name to start.";
    return;
  }
  nameError.textContent = "";
  playerName = name;
  currentIndex = 0;
  score = 0;
  showPage("quiz");
  showQuestion();
}

function showQuestion() {
  var item = questions[currentIndex];
  document.getElementById("questionCount").textContent =
    "Question " + (currentIndex + 1) + " of " + questions.length;
  document.getElementById("liveScore").textContent = "Score: " + score;
  document.getElementById("progressBar").style.width =
    (currentIndex / questions.length) * 100 + "%";
  document.getElementById("questionText").textContent = item.q;
  feedback.textContent = "";
  nextBtn.disabled = true;
  nextBtn.textContent = currentIndex === questions.length - 1 ? "See results" : "Next question";
  optionsBox.innerHTML = "";

  for (var i = 0; i < item.options.length; i++) {
    var btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = item.options[i];
    btn.setAttribute("data-index", i);
    btn.addEventListener("click", chooseAnswer);
    optionsBox.appendChild(btn);
  }
}

function chooseAnswer(event) {
  var chosen = Number(event.target.getAttribute("data-index"));
  var correct = questions[currentIndex].answer;
  var buttons = optionsBox.querySelectorAll(".option");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
  buttons[correct].classList.add("correct");

  if (chosen === correct) {
    score++;
    feedback.textContent = "Correct!";
    feedback.style.color = "#1f9d68";
  } else {
    buttons[chosen].classList.add("wrong");
    feedback.textContent = "Not quite. The right answer is highlighted.";
    feedback.style.color = "#d64545";
  }
  document.getElementById("liveScore").textContent = "Score: " + score;
  nextBtn.disabled = false;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  var percent = Math.round((score / questions.length) * 100);
  var message;
  if (percent >= 80) {
    message = "Excellent work, " + playerName + "! You know your web basics.";
  } else if (percent >= 50) {
    message = "Good effort, " + playerName + "! A little more practice and you will get there.";
  } else {
    message = "Keep going, " + playerName + "! Try again to improve your score.";
  }
  document.getElementById("resultTitle").textContent = "Quiz complete";
  document.getElementById("resultScore").textContent =
    score + " / " + questions.length + " (" + percent + "%)";
  document.getElementById("resultMessage").textContent = message;
  showPage("result");
}

function goHome() {
  showPage("welcome");
}

// ---- Events ----
document.getElementById("startBtn").addEventListener("click", startQuiz);
nameInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") { startQuiz(); }
});
nextBtn.addEventListener("click", nextQuestion);
document.getElementById("restartBtn").addEventListener("click", startQuiz);
document.getElementById("homeBtn").addEventListener("click", goHome);
document.getElementById("navHome").addEventListener("click", goHome);
document.getElementById("logo").addEventListener("click", function (e) { e.preventDefault(); goHome(); });
document.getElementById("navAbout").addEventListener("click", function () { showPage("about"); });
document.getElementById("aboutBack").addEventListener("click", goHome);
