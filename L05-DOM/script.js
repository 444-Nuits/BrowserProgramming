console.log("Page loaded");

// ── STATE ──
let isDark = true; // default: dark theme
let clickCount = 0;

// ── ELEMENTS ──
const skipLink = document.getElementById("skip");
const themeToggle = document.getElementById("theme-toggle");
const lastUpdatedEl = document.getElementById("last-updated");

// ── THEME: Load saved preference from localStorage ──
const savedTheme = localStorage.getItem("portfolio_theme");
if (savedTheme === "light") {
  isDark = false;
  document.body.classList.add("light");
}

// ── FUNCTIONS ──
function handleSkip() {
  console.log("Skipped to content!");
}

function toggleTheme() {
  isDark = !isDark;

  if (isDark) {
    document.body.classList.remove("light");
    localStorage.setItem("portfolio_theme", "dark");
  } else {
    document.body.classList.add("light");
    localStorage.setItem("portfolio_theme", "light");
  }

  console.log("Theme toggled. Dark mode:", isDark);
}

function countClicks() {
  clickCount++;
  console.log("Theme button clicked", clickCount, "times");
}

// ── LAST UPDATED ──
function setLastUpdated() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  lastUpdatedEl.textContent = `Last updated: ${yyyy}-${mm}-${dd}`;
}

setLastUpdated();

// ── EVENTS ──
skipLink.addEventListener("click", handleSkip);

themeToggle.addEventListener("click", () => {
  toggleTheme();
  countClicks();
});
