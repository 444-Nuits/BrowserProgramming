console.log("Page loaded");

// STATE
let isLightTheme = false;
let clickCount = 0;

// ELEMENTS
const skipLink = document.getElementById("skip");
const themeButton = document.getElementById("theme");

// FUNCTIONS
function handleSkip() {
  console.log("Skipped to content!");
}

function toggleTheme() {
  isLightTheme = !isLightTheme;
  document.body.classList.toggle("light-theme");
  console.log("Theme toggled. Light mode:", isLightTheme);
}

function countClicks() {
  clickCount++;
  console.log("Theme button clicked", clickCount, "times");
}

// EVENTS
skipLink.addEventListener("click", handleSkip);

themeButton.addEventListener("click", () => {
  toggleTheme();
  countClicks();
});
