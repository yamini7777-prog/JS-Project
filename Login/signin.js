document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const emailInput = document.getElementById("email");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const errorMessage = document.getElementById("error-message");
  
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const email = emailInput.value.trim();
      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
  
      // Validate fields
      if (!email || !username || !password || !confirmPassword) {
        errorMessage.textContent = "All fields are required!";
        errorMessage.style.display = "block";
        return;
      }
  
      // Validate passwords match
      if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        errorMessage.style.display = "block";
        return;
      }
  
      // Prepare new user data
      const newUser = { email, username, password };
  
      // Retrieve existing users from local storage
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  
      // Check if email or username already exists
      const isExistingUser = existingUsers.some(
        (user) => user.email === email || user.username === username
      );
  
      if (isExistingUser) {
        errorMessage.textContent = "Email or username already exists!";
        errorMessage.style.display = "block";
        return;
      }
  
      // Add new user to the list
      existingUsers.push(newUser);
  
      // Save updated users list to local storage
      localStorage.setItem("users", JSON.stringify(existingUsers));
  
      alert("User registered successfully!");
  
      // Clear form fields
      emailInput.value = "";
      usernameInput.value = "";
      passwordInput.value = "";
      confirmPasswordInput.value = "";
      errorMessage.style.display = "none";
  
      // Redirect to the login page
      window.location.href = "./login.html";
    });
  });
  