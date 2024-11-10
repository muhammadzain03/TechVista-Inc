// ProductList.js

/**
 * ProductList component fetches and displays a list of products from the backend.
 * It manages loading state while fetching data and renders individual Product components.
 * Users can add products to the cart through each Product component.
 */

import React, { useState, useEffect } from 'react';
import Product from './Product';

const ProductList = ({ onAddToCart }) => {
  // State to store the list of products fetched from the server
  const [products, setProducts] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Fetch products from the backend API when the component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:5000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data); // Set fetched products to state
        setLoading(false); // Update loading status
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false); // Stop loading in case of an error
      });
  }, []);

  return (
    <div className="product-list">
      {/* Display loading message or map over products array to render each Product component */}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        products.map(product => (
          <Product key={product.id} product={product} onAddToCart={onAddToCart} />
        ))
      )}
    </div>
  );
};

export default ProductList;
