/*
 * Script to handle the login and result display for the student portal.
 *
 * This file assumes a global `users` object is defined in users.js.
 * The `users` object maps registration numbers to user records
 * containing a password, name, program, GPA, class award, and grades.
 */

document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("login-btn");
  const errorMsg = document.getElementById("error-msg");
  const loginForm = document.getElementById("login-form");
  const resultView = document.getElementById("result-view");
  const nameSpan = document.getElementById("student-name");
  const regSpan = document.getElementById("student-reg");
  const programSpan = document.getElementById("student-program");
  const gpaSpan = document.getElementById("student-gpa");
  const classSpan = document.getElementById("student-class");
  const logoutBtn = document.getElementById("logout-btn");

  // Elements for full results
  const viewFullBtn = document.getElementById("view-full-btn");
  const fullResultsContainer = document.getElementById("full-results");
  // We'll obtain the table body lazily to avoid null errors when DOMContentLoaded fires
  let fullResultsTableBody = null;

  // Handle login button click
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim().toUpperCase();
    const password = passwordInput.value.trim();
    // Validate credentials
    if (!username || !password) {
      errorMsg.textContent = "Please enter both fields.";
      return;
    }
    const user = users[username];
    if (user && user.password === password) {
      // Successful login
      errorMsg.textContent = "";
      showResult(username, user);
    } else {
      errorMsg.textContent = "Invalid registration number or password.";
    }
  });

  // Toggle full results display on button click
  if (viewFullBtn) {
    viewFullBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // If currently hidden, build and show; else hide
      if (fullResultsContainer.style.display === "none") {
        const reg = regSpan.textContent.trim();
        const user = users[reg];
        if (user) {
          buildFullResults(user);
        }
        fullResultsContainer.style.display = "block";
        viewFullBtn.textContent = "Hide Full Results";
      } else {
        fullResultsContainer.style.display = "none";
        viewFullBtn.textContent = "View Full Results";
      }
    });
  }

  // Display result summary
  function showResult(reg, user) {
    loginForm.style.display = "none";
    resultView.style.display = "block";
    nameSpan.textContent = user.name;
    regSpan.textContent = reg;
    programSpan.textContent = user.program;
    // Format GPA to 3 decimal places
    gpaSpan.textContent = parseFloat(user.gpa).toFixed(3);
    classSpan.textContent = user["class"];
    // Reset full results section
    if (fullResultsContainer && viewFullBtn) {
      fullResultsContainer.style.display = "none";
      viewFullBtn.textContent = "View Full Results";
    }
  }

  // Build the full results table for a user
  function buildFullResults(user) {
    // Lazily acquire the table body element when first needed
    if (!fullResultsTableBody) {
      const table = document.getElementById("full-results-table");
      if (table) {
        fullResultsTableBody = table.querySelector("tbody");
      }
    }
    if (!fullResultsTableBody) return;
    // Clear previous rows
    fullResultsTableBody.innerHTML = "";
    const grades = user.grades || {};
    Object.keys(grades).forEach((subject) => {
      const grade = grades[subject];
      const row = document.createElement("tr");
      const subjCell = document.createElement("td");
      subjCell.textContent = subject;
      const gradeCell = document.createElement("td");
      gradeCell.textContent = grade;
      row.appendChild(subjCell);
      row.appendChild(gradeCell);
      fullResultsTableBody.appendChild(row);
    });
  }

  // Handle logout button click
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Reset fields and views
    usernameInput.value = "";
    passwordInput.value = "";
    errorMsg.textContent = "";
    resultView.style.display = "none";
    loginForm.style.display = "block";
  });
});