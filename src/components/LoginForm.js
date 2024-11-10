// LoginForm.js

/**
 * LoginForm component allows users to log in by providing their username and password.
 * It includes a form for input, handles login validation via a backend API request,
 * and provides a toggle option to switch to the Signup form if the user doesn't have an account.
 */

import React, { useState } from 'react';

const LoginForm = ({ onToggle, setIsLoggedIn }) => {
  // State variables for handling form input values and loading status
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle form submission for login
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Send login request to the backend API
    const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    // Handle response: success sets login status, failure shows an alert
    if (response.ok) {
      setIsLoggedIn(true);
      alert("Login successful!");
    } else {
      alert("Failed to log in. Please check your credentials.");
    }

    setLoading(false); // Reset loading status
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Username Input */}
        <div>
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        {/* Password Input */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        {/* Login Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      
      {/* Signup Toggle */}
      <p>
        Don't have an account? <button onClick={onToggle}>Signup</button>
      </p>
    </div>
  );
};

export default LoginForm;
