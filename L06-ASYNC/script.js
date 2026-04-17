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


// ════════════════════════════════════════════════════════
// ── EXTERNAL DATA DEMO ──
// ════════════════════════════════════════════════════════

// Why do we use async/await?
// async/await lets us write asynchronous code (like network requests) in a
// linear, readable style — without deeply nested .then() chains. It pauses
// execution at each "await" until the Promise resolves, making the flow easy
// to follow while keeping the page responsive.

// Why do we check response.ok?
// fetch() does NOT throw an error for HTTP error codes like 404 or 500.
// It only rejects if the network itself fails. Checking response.ok (which is
// true for status codes 200–299) lets us catch server-side errors and handle
// them gracefully instead of trying to parse a broken response.

// Why do we use try/catch?
// Network requests can fail for many reasons: no internet, server down, timeout.
// try/catch intercepts any thrown error (including ones we throw manually after
// a failed response.ok check) so we can show the user a friendly error message
// instead of a silent crash.

const loadDataBtn = document.getElementById("load-data-btn");
const apiStatus   = document.getElementById("api-status");
const apiResult   = document.getElementById("api-result");
const apiName     = document.getElementById("api-name");
const apiEmail    = document.getElementById("api-email");
const apiCompany  = document.getElementById("api-company");

async function loadUserData() {
  // Show loading state
  apiStatus.textContent = "Loading…";
  apiStatus.className = "api-status loading";
  apiResult.hidden = true;
  loadDataBtn.disabled = true;

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

    // Check response.ok — fetch does not throw on 4xx/5xx by itself
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const user = await response.json();

    // Populate the result card
    apiName.textContent    = user.name;
    apiEmail.textContent   = user.email;
    apiCompany.textContent = user.company.name;

    apiStatus.textContent = "Data loaded successfully.";
    apiStatus.className = "api-status success";
    apiResult.hidden = false;

  } catch (error) {
    // Handle any network or parsing error
    apiStatus.textContent = "Error loading data";
    apiStatus.className = "api-status error";
    console.error("Fetch failed:", error);
  } finally {
    loadDataBtn.disabled = false;
  }
}

loadDataBtn.addEventListener("click", loadUserData);