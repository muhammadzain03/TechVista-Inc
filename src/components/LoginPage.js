// LoginPage.js

/**
 * LoginPage component serves as a container for the Login and Signup forms.
 * It allows toggling between LoginForm and SignupForm, passing necessary props
 * to each component. The component also includes a Footer for consistent page structure.
 */

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Footer from './Footer';

const LoginPage = ({ setIsLoggedIn, onLogin }) => {
  // State to toggle between login and signup views
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {/* Centered container for login/signup form */}
      <div className="centered-container">
        <div className="auth-form">
          {/* Conditionally render LoginForm or SignupForm based on showLogin state */}
          {showLogin ? (
            <LoginForm 
              onToggle={() => setShowLogin(false)} // Switch to signup view
              setIsLoggedIn={setIsLoggedIn} // Pass function to update login status
              onLogin={onLogin} // Pass function to handle user login
            />
          ) : (
            <SignupForm 
              onToggle={() => setShowLogin(true)} // Switch to login view
            />
          )}
        </div>
      </div>
      {/* Footer for consistent layout */}
      <Footer />
    </>
  );
};

export default LoginPage;
