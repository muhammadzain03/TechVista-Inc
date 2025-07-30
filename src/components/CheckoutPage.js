// CheckoutPage.js

/**
 * CheckoutPage component displays an under construction message
 * for the checkout functionality that hasn't been built yet.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const CheckoutPage = ({ cartItems }) => {
  const cartTotal = Array.isArray(cartItems) 
    ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="construction-message">
          <div className="construction-icon">🚧</div>
          <h1>Checkout Under Construction</h1>
          <p>We're working hard to bring you a seamless checkout experience!</p>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Items in cart:</span>
                <span>{cartItems.length} products</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="construction-features">
            <h4>Coming Soon:</h4>
            <ul>
              <li>✓ Secure Payment Processing</li>
              <li>✓ Multiple Payment Methods</li>
              <li>✓ Order Tracking</li>
              <li>✓ Email Confirmations</li>
              <li>✓ Shipping Options</li>
            </ul>
          </div>

          <div className="action-buttons">
            <Link to="/cart" className="back-to-cart-btn">
              ← Back to Cart
            </Link>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>

          <div className="contact-info">
            <p>Questions? Contact us at <strong>support@techvista-inc.com</strong></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage; 