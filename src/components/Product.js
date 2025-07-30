// Product.js

/**
 * Product component renders individual product details including name, price, image, and a brief description.
 * Users can view more details by hovering over the product name and add items to the cart with a specified quantity.
 * The component maintains local state for showing details and quantity of items to add to the cart.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product, onAddToCart, isLoggedIn }) => {
  const { id, name, price, image, description } = product;

  // State to control the visibility of product details on hover
  const [showDetails, setShowDetails] = useState(false);
  // State to manage quantity to be added to the cart
  const [quantity, setQuantity] = useState(1);
  // State for button animation and feedback
  const [added, setAdded] = useState(false);
  // State for showing login prompt
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Handles adding product to cart with the specified quantity
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      // Show login prompt if user is not logged in
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000); // Hide after 3 seconds
      return;
    }

    onAddToCart({ ...product, quantity });
    setQuantity(quantity + 1); // Increment quantity after adding to cart
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="product">
      {/* Product image section */}
      <div className="image">
        <img src={image} alt={name} className="product-image" />
      </div>
      
      {/* Product information section */}
      <div className="info">
        {/* Product name with hover effect to show details */}
        <div 
          className="name" 
          onMouseEnter={() => setShowDetails(true)} 
          onMouseLeave={() => setShowDetails(false)}
        >
          {name}
        </div>
        
        {/* Product price */}
        <div className="price">Price: ${price}</div>
        
        {/* Add to Cart button or Login prompt */}
        {isLoggedIn ? (
          <button
            className={`add-to-cart${added ? ' added' : ''}`}
            onClick={handleAddToCart}
            disabled={added}
          >
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        ) : (
          <div className="login-required-section">
            <button
              className={`add-to-cart guest-button${showLoginPrompt ? ' prompt-shown' : ''}`}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            {showLoginPrompt && (
              <div className="login-prompt">
                <p>Please <Link to="/login" className="login-prompt-link">login</Link> to add items to cart</p>
              </div>
            )}
          </div>
        )}
        
        {/* Display additional details on hover */}
        {showDetails && (
          <div className="details">
            <div className="description">{description}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
