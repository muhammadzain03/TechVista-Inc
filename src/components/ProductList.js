// ProductList.js

/**
 * ProductList component fetches and displays a list of products from the backend.
 * It manages loading state while fetching data and renders individual Product components.
 * Users can add products to the cart through each Product component.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Product from './Product';

const ProductList = ({ onAddToCart, isLoggedIn }) => {
  // State to store the list of products fetched from the server
  const [products, setProducts] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to manage error status
  const [error, setError] = useState(null);

  // Fetch products from the backend API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://127.0.0.1:5000/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        
        // Add a small delay to show the loading animation
        setTimeout(() => {
          setProducts(data);
          setLoading(false);
        }, 800);
        
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="product-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-text skeleton-title"></div>
      <div className="skeleton-text skeleton-price"></div>
      <div className="skeleton-button"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="product-list-container">
        {!isLoggedIn && (
          <div className="guest-banner">
            <div className="guest-banner-content">
              <h3>Welcome to TechVista Inc.! 👋</h3>
              <p>Browse our amazing products below. <Link to="/login" className="login-link">Login</Link> to start adding items to your cart!</p>
            </div>
          </div>
        )}
        <div className="product-list">
          {/* Show 6 skeleton cards while loading */}
          {Array(6).fill(0).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {/* Show guest banner if user is not logged in */}
      {!isLoggedIn && (
        <div className="guest-banner">
          <div className="guest-banner-content">
            <h3>Welcome to TechVista Inc.! 👋</h3>
            <p>Browse our amazing products below. <Link to="/login" className="login-link">Login</Link> to start adding items to your cart!</p>
          </div>
        </div>
      )}
      
      <div className="product-list">
        {/* Display message or map over products array to render each Product component */}
        {products.length > 0 ? (
          products.map((product, index) => (
            <div 
              key={product.id} 
              className="product-wrapper"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Product 
                product={product} 
                onAddToCart={onAddToCart} 
                isLoggedIn={isLoggedIn}
              />
            </div>
          ))
        ) : (
          <div className="no-products">
            <h3>No products available</h3>
            <p>Check back later for new items!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
