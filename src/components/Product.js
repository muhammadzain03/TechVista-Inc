// Product.js

/**
 * Product component renders individual product details including name, price, image, and a brief description.
 * Users can view more details by hovering over the product name and add items to the cart with a specified quantity.
 * The component maintains local state for showing details and quantity of items to add to the cart.
 */

import React, { useState } from 'react';

const Product = ({ product, onAddToCart }) => {
  const { id, name, price, image, description } = product;

  // State to control the visibility of product details on hover
  const [showDetails, setShowDetails] = useState(false);
  // State to manage quantity to be added to the cart
  const [quantity, setQuantity] = useState(1);

  // Handles adding product to cart with the specified quantity
  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
    setQuantity(quantity + 1); // Increment quantity after adding to cart
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
        {/* Add to Cart button */}
        <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
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
