// Header.js

/**
 * Header component that displays the company logo, name, navigation links, and a cart icon.
 * The cart icon shows the number of items in the cart and links to the Cart page.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartItems }) => {
  // Calculate the total number of items in the cart
  const cartCount = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <>
      {/* Main header section displaying logo and cart icon */}
      <header className="header">
        <div className="logo-name">
          {/* Link to home page through the logo */}
          <Link to="/" className="logo-link">
            <img src="/images/logo.png" alt="Logo" className="logo" />
          </Link>
        </div>
        
        {/* Cart icon with item count overlay */}
        <div className="cart-icon">
          <Link to="/cart">
            <img src="/images/cart-icon.webp" alt="Cart" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </header>

      {/* Navigation bar for main page links */}
      <div className="navigation-container">
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </>
  );
};

export default Header;
