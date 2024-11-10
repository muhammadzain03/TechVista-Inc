// CartItem.js

/**
 * This component represents a single item in the shopping cart.
 * It displays the item's image, name, quantity, individual price, and total price.
 * Users can remove this item from the cart by clicking the "Remove" button.
 */

import React from 'react';

const CartItem = ({ product, onRemove }) => {
  // Destructure product properties for easier access
  const { id, name, price, image, quantity } = product;

  return (
    <div className="cart-item">
      {/* Display product image */}
      <img src={image} alt={name} className="cart-item-image" />

      {/* Display item details: name, quantity, price, and total cost */}
      <div className="cart-item-details">
        <div className="cart-item-name">{name}</div>
        <div className="cart-item-quantity">Quantity: {quantity}</div>
        <div className="cart-item-price">Price: ${price}</div>
        <div className="cart-item-total">Total: ${(price * quantity).toFixed(2)}</div>
      </div>

      {/* Remove button to delete item from the cart */}
      <button className="remove-button" onClick={() => onRemove(id)}>Remove</button>
    </div>
  );
};

export default CartItem;
