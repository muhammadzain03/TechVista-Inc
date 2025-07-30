// CartItem.js

/**
 * This component represents a single item in the shopping cart.
 * It displays the item's image, name, quantity, individual price, and total price.
 * Users can remove this item from the cart by clicking the "Remove" button.
 */

import React, { useState } from 'react';

const CartItem = ({ product, onRemove }) => {
  // Destructure product properties for easier access
  const { id, name, price, image, quantity } = product;
  
  // State for handling removal animation
  const [isRemoving, setIsRemoving] = useState(false);

  // Handle remove with animation
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(id);
    }, 300); // Wait for animation to complete
  };

  return (
    <div className={`cart-item ${isRemoving ? 'removing' : ''}`}>
      {/* Product image with enhanced styling */}
      <div className="cart-item-image-container">
        <img src={image} alt={name} className="cart-item-image" />
      </div>

      {/* Display item details with enhanced layout */}
      <div className="cart-item-details">
        <div className="cart-item-header">
          <h3 className="cart-item-name">{name}</h3>
          <div className="cart-item-price-badge">${price}</div>
        </div>
        
        <div className="cart-item-meta">
          <div className="quantity-info">
            <span className="quantity-label">Qty:</span>
            <span className="quantity-value">{quantity}</span>
          </div>
          
          <div className="total-info">
            <span className="total-label">Subtotal:</span>
            <span className="total-value">${(price * quantity).toFixed(2)}</span>
          </div>
        </div>
        
        <div className="cart-item-actions">
          <button 
            className="update-quantity-btn decrease"
            onClick={() => onRemove(id)}
            title="Decrease quantity"
          >
            -
          </button>
          
          <button 
            className="remove-button"
            onClick={handleRemove}
            disabled={isRemoving}
          >
            {isRemoving ? (
              <span className="removing-text">Removing...</span>
            ) : (
              <>
                <span className="remove-icon">🗑️</span>
                <span className="remove-text">Remove</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
