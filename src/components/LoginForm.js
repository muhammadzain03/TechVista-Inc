// LoginForm.js

/**
 * LoginForm component allows users to log in by providing their username and password.
 * It includes a form for input, handles login validation via a backend API request,
 * and provides a toggle option to switch to the Signup form if the user doesn't have an account.
 */

import React, { useState } from 'react';

const LoginForm = ({ onToggle, setIsLoggedIn, onLogin }) => {
  // State variables for handling form input values and loading status
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to handle form submission for login
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Send login request to the backend API
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Handle response: success sets login status, failure shows an error
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        onLogin(username); // Pass username to App component
        alert("Login successful!");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to log in. Please check your credentials.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }

    setLoading(false); // Reset loading status
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Username Input */}
        <div>
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
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
            required
          />
        </div>
        
        {/* Login Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      
      {/* Demo credentials hint */}
      <div className="demo-hint">
        <p><small><strong>Demo:</strong> Use any username/password to login</small></p>
      </div>
      
      {/* Signup Toggle */}
      <p>
        Don't have an account? <button type="button" onClick={onToggle}>Signup</button>
      </p>
    </div>
  );
};

export default LoginForm;
