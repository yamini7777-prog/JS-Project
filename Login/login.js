// Check login status on page load

  
  // Get references to form inputs and buttons
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginButton = document.getElementById('loginButton');
  const errorMessage = document.getElementById('error-message');
  
  // Handle login button click
  loginButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form from submitting
  
    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value.trim();
  
    // Retrieve users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  
    // Find the user with matching credentials
    const user = storedUsers.find(
      (u) => u.username === enteredUsername && u.password === enteredPassword
    );
  
    if (user) {
      // Credentials are valid, set login state and navigate to autoMobile.html
      localStorage.setItem('isLoggedIn', 'true');
      alert('Login successful!');
      window.location.href = './autoMobile.html'; // Redirect to automobile page
    } else {
      // Invalid credentials, show error message
      errorMessage.textContent = 'Invalid username or password.';
      errorMessage.style.color = 'red';
    }
  });
  