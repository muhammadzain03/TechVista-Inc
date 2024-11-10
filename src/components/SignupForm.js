// SignupForm.js

/**
 * SignupForm component handles user registration.
 * It collects the username, password, confirm password, and email.
 * On successful submission, it posts the data to the backend server and alerts the user.
 * If passwords don't match, it alerts the user.
 * An option to toggle between Login and Signup forms is also provided.
 */

import React, { useState } from 'react';

const SignupForm = ({ onToggle }) => {
  // State variables to track input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  // Handles form submission for signup
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match before submission
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Send user data to the backend for registration
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        alert("Signup successful!");
        onToggle(); // Switch to Login form on success
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-form">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <button onClick={onToggle}>Login</button></p>
    </div>
  );
};

export default SignupForm;
