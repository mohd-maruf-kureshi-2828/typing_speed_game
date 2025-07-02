// script.js
window.onload = function () {
  const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Believe in yourself and all that you are.",
    "Code is like humor. When you have to explain it, it's bad.",
    "Push yourself, because no one else is going to do it for you.",
    "You miss 100% of the shots you don't take.",
    "Dream big and dare to fail.",
    "Typing fast is not enough, accuracy wins the game.",
    "The quick brown fox jumps over the lazy dog.",
    "Believe in yourself and all that you are.",
    "Success is not final, failure is not fatal.",
    "Code is like humor. When you have to explain it, it’s bad.",
    "Dream big and dare to fail.",
    "Life is short, make it sweet.",
    "You miss 100% of the shots you don’t take.",
    "JavaScript is the language of the web.",
    "Stay hungry, stay foolish.",
    "Simplicity is the soul of efficiency.",
    "First, solve the problem. Then, write the code.",
    "Clean code always looks like it was written by someone who cares.",
    "The best way to get started is to quit talking and begin doing.",
    "Don’t watch the clock; do what it does. Keep going.",
    "A smooth sea never made a skilled sailor.",
    "Great things never come from comfort zones.",
    "Push yourself, because no one else is going to do it for you.",
    "Typing fast is not enough, accuracy wins the game.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Learn the rules like a pro, so you can break them like an artist.",
    "Programming isn’t about what you know; it’s about what you can figure out.",
    "If you think math is hard, try web development.",
    "Experience is the name everyone gives to their mistakes.",
    "The only way to do great work is to love what you do.",
    "Debugging is like being the detective in a crime movie where you are also the murderer.",
    "You don't have to be great to start, but you have to start to be great.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can   understand.",
      "Knowledge is power, but enthusiasm pulls the switch.",
    "Creativity is intelligence having fun.",
    "Discipline is the bridge between goals and accomplishment.",
    "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
    "Do something today that your future self will thank you for.",
    "The expert in anything was once a beginner.",
    "Focus on being productive instead of busy.",
    "Talk is cheap. Show me the code.",
    "Your limitation—it’s only your imagination.",
    "Sometimes the simplest solution is the best one.",
    "A day without learning is a day wasted.",
    "Don't stop until you're proud.",
    "Build something today that makes you proud tomorrow.",
    "The best preparation for tomorrow is doing your best today."
  ];

  let startTime, endTime;
  let gameState = "start"; // "start", "check", "reset"

  const quoteDisplay = document.getElementById("quoteDisplay");
  const quoteInput = document.getElementById("quoteInput");
  const result = document.getElementById("result");
  const mainBtn = document.getElementById("startBtn");

  // Mistake Counter
  function countMistakes(str1, str2) {
    let mistakes = 0;
    for (let i = 0; i < Math.max(str1.length, str2.length); i++) {
      if (str1[i] !== str2[i]) mistakes++;
    }
    return mistakes;
  }

  // Load Random Quote
  function loadQuote() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.innerText = quotes[randomIndex];
  }

  // Start Game
  function startGame() {
    loadQuote();
    quoteInput.value = "";
    quoteInput.disabled = false;
    quoteInput.focus();
    result.innerHTML = "";
    startTime = new Date().getTime();
    mainBtn.innerText = "Check Result";
    gameState = "check";
  }

  // Check Result
  function checkResult() {
    let typedText = quoteInput.value.trim().toLowerCase();
    let originalText = quoteDisplay.innerText.trim().toLowerCase();
    

    if (typedText.length === 0) {
    result.innerHTML = `
      <p style="background:		rgba(128, 123, 123, 0.14) ;color:black; font-size: 19px; font-weight:900;">
        🤷‍♂️Please type the sentence before checking result!
      </p>`;
    return;
  }

  
   // Thiis is now ecaxt match case sensitive punctuation sensitive
 

    if (typedText !== originalText) {
    result.innerHTML = `
      <p style="background:		rgba(128, 123, 123, 0.14) ;color:black; font-size: 19px; font-weight: 900;">
        ❌ Typed sentence doesn't match. Try again carefully.
      </p>`;
    return;
  }
 
 
    endTime = new Date().getTime();

    let totalTime = (endTime - startTime) / 1000;
    let wordCount = originalText.split(" ").length;
    let expectedTime = (wordCount / 40) * 60;
    let speed = Math.round((typedText.length / 5) / (totalTime / 60));
    let mistakes = countMistakes(typedText, originalText);
    let accuracy = Math.max(0, 100 - Math.round((mistakes / originalText.length) * 100));

    let resultMessage = `
      <b>⏱ Time Taken:</b> ${totalTime.toFixed(2)} sec<br>
      <b>🎯 Expected Time:</b> ${expectedTime.toFixed(2)} sec<br>
      <b>⚡ Speed:</b> ${speed} WPM<br>
      <b>❌ Mistakes:</b> ${mistakes}<br>
      <b>✅ Accuracy:</b> ${accuracy}%<br>
    `;

    resultMessage += totalTime <= expectedTime
      ? `<p style="color: #00ff00; font-size: 19px; font-weight: 900;">🎉 You Win! Fast and accurate! 🏆</p>`
      : `<p style="color:rgb(138, 26, 26); font-size: 19px; font-weight: 900;">😔 You Lose! Try faster next time 💪</p>`;

    result.innerHTML = resultMessage;
    quoteInput.disabled = true;
    mainBtn.innerText = "Start Again";
    gameState = "reset";
  }

  // Detect first typing to change button text
  quoteInput.addEventListener("input", () => {
    if (gameState === "check" && quoteInput.value.trim().length > 0) {
      mainBtn.innerText = "Check Result";
    }
  });

  // Button Logic
  mainBtn.addEventListener("click", () => {
    if (gameState === "start" || gameState === "reset") {
      startGame();
    } else if (gameState === "check") {
      checkResult();
    }
  });

  // Initial Setup
  mainBtn.innerText = "Start Typing";
  
};