// CartPage.js

/**
 * This component represents the shopping cart page, displaying all items
 * currently added to the cart along with their details, subtotal, and an option
 * to proceed to checkout.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import Footer from './Footer';

const CartPage = ({ cartItems, onRemove }) => {
  // Function to calculate the total price of items in the cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      
      {/* Container for displaying all cart items */}
      <div className="cart-items-container">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem key={item.id} product={item} onRemove={onRemove} />
          ))
        ) : (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/products" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>

      {/* Summary section for subtotal and checkout button, only visible if cart has items */}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <div className="cart-total">Subtotal: ${getTotalPrice().toFixed(2)}</div>
          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>
        </div>
      )}
      
      <Footer /> {/* Footer component at the bottom of the cart page */}
    </div>
  );
};

export default CartPage;
