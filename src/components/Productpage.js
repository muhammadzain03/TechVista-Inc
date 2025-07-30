// Productpage.js

/**
 * Productpage component serves as the main page for displaying products.
 * It renders a list of products and provides functionality to add items to the cart.
 * Footer component is included for consistent layout.
 */

import React from 'react';
import ProductList from './ProductList';
import Footer from './Footer';

const Productpage = ({ addToCart, isLoggedIn }) => {
  return (
    <div className="productpage">
      {/* Section to display the product list with an option to add items to the cart */}
      <div className="product-list-section">
        <ProductList onAddToCart={addToCart} isLoggedIn={isLoggedIn} />
      </div>

      {/* Footer for consistent layout */}
      <Footer />
    </div>
  );
};

export default Productpage;
