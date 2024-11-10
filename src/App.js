// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Productpage from './components/Productpage';
import LoginPage from './components/LoginPage';
import CartPage from './components/CartPage';
import './App.css';

const App = () => {
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // State to track items in the cart
  const [cartItems, setCartItems] = useState([]);

  /**
   * Function to add item to the cart
   * If the item exists, increment its quantity
   * Otherwise, add it to the cart with quantity 1
   */
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  /**
   * Function to remove item from the cart
   * If quantity is more than 1, decrement it
   * Otherwise, remove the item from the cart
   */
  const removeFromCart = (productId) => {
    setCartItems(cartItems
      .map(item => item.id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
      )
      .filter(item => item.quantity > 0)
    );
  };

  return (
    <Router>
      {/* Header is included here to display consistently across all pages */}
      <Header cartItems={cartItems} />
      <div>
        <Routes>
          {/* Route for the homepage */}
          <Route path="/" element={<Homepage />} />
          
          {/* Route for the product page */}
          <Route
            path="/products"
            element={isLoggedIn ? (
              <Productpage 
                cartItems={cartItems} 
                addToCart={addToCart} 
                removeFromCart={removeFromCart} 
              />
            ) : (
              <Navigate to="/login" />
            )}
          />

          {/* Route for the login page */}
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

          {/* Route for the Cart Page */}
          <Route 
            path="/cart" 
            element={<CartPage cartItems={cartItems} onRemove={removeFromCart} />} 
          />

          {/* Redirect unknown routes to the homepage */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
