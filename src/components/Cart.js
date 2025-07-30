// Cart.js

/**
 * This component renders the shopping cart. It displays a list of items added to the cart
 * and shows the total price. Each item in the cart is rendered as a CartItem component.
 */

import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cartItems, onRemove }) => {
  /**
   * Calculates the total price of items in the cart.
   * @returns {number} Total price of all items in the cart.
   */
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>

      {/* If there are items in the cart, render CartItem components; otherwise, display an empty cart message */}
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div className="fade-in" key={item.id}>
            <CartItem product={item} onRemove={onRemove} />
          </div>
        ))
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
      
      {/* Display the total price of items in the cart, formatted to two decimal places */}
      <div className="total">Total (in cart): ${getTotalPrice().toFixed(2)}</div>
    </div>
  );
};

export default Cart;
