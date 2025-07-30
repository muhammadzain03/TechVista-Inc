// Header.js

/**
 * Header component that displays the company logo, name, navigation links, and a cart icon.
 * The cart icon shows the number of items in the cart and links to the Cart page.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartItems, isLoggedIn, currentUser, onLogout }) => {
  // Calculate the total number of items in the cart
  const cartCount = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  const [bounce, setBounce] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const prevCount = useRef(cartCount);

  useEffect(() => {
    if (cartCount !== prevCount.current) {
      setBounce(true);
      setTimeout(() => setBounce(false), 500);
      prevCount.current = cartCount;
    }
  }, [cartCount]);

  // Calculate cart total
  const cartTotal = Array.isArray(cartItems) 
    ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  return (
    <header className="header">
      {/* Left side - User Profile (when logged in) or Logo */}
      <div className="header-left">
        {isLoggedIn ? (
          <div 
            className="user-profile"
            onMouseEnter={() => setShowUserDropdown(true)}
            onMouseLeave={() => setShowUserDropdown(false)}
          >
            <div className="user-avatar">
              <span className="user-icon">👤</span>
              <span className="user-name">{currentUser || 'User'}</span>
              <span className="dropdown-arrow">▼</span>
            </div>
            
            {showUserDropdown && (
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <h4>Quick Cart View</h4>
                </div>
                <div className="dropdown-cart">
                  {cartItems.length > 0 ? (
                    <>
                      <div className="dropdown-cart-items">
                        {cartItems.slice(0, 3).map((item) => (
                          <div key={item.id} className="dropdown-cart-item">
                            <img src={item.image} alt={item.name} className="dropdown-item-image" />
                            <div className="dropdown-item-details">
                              <span className="dropdown-item-name">{item.name}</span>
                              <span className="dropdown-item-price">${item.price} x {item.quantity}</span>
                            </div>
                          </div>
                        ))}
                        {cartItems.length > 3 && (
                          <div className="dropdown-more">+{cartItems.length - 3} more items</div>
                        )}
                      </div>
                      <div className="dropdown-cart-total">
                        <strong>Total: ${cartTotal.toFixed(2)}</strong>
                      </div>
                      <Link to="/cart" className="dropdown-view-cart">
                        View Full Cart ({cartCount} items)
                      </Link>
                    </>
                  ) : (
                    <div className="dropdown-empty-cart">
                      <p>Your cart is empty</p>
                      <Link to="/products" className="dropdown-shop-now">Shop Now</Link>
                    </div>
                  )}
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-actions">
                  <button onClick={onLogout} className="logout-btn">Logout</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/" className="logo-link">
            <div className="text-logo">
              <span className="logo-icon">🏢</span>
              <span className="company-name">TechVista Inc.</span>
            </div>
          </Link>
        )}
      </div>

      {/* Center - Navigation */}
      <nav className="header-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
        {!isLoggedIn && <Link to="/login" className="nav-link">Login</Link>}
      </nav>

      {/* Right side - Cart icon (always visible) */}
      <div className={`header-right ${bounce ? 'bounce' : ''}`}>
        <Link to="/cart" className="cart-link">
          <span className="cart-icon-text">🛒</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
