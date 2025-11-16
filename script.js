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

   // Display result
   function showResult(reg, user) {
     loginForm.style.display = "none";
     resultView.style.display = "block";
     nameSpan.textContent = user.name;
     regSpan.textContent = reg;
     programSpan.textContent = user.program;
     // Format GPA to 3 decimal places
     gpaSpan.textContent = parseFloat(user.gpa).toFixed(3);
     classSpan.textContent = user["class"];
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
