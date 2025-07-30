// HomeMainSection.js

/**
 * HomeMainSection component provides an introductory section for the homepage,
 * including an "About Us" area and a "Customer Reviews" section.
 * The reviews section displays a list of reviews with a star rating.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const HomeMainSection = ({ reviews }) => {
  // Function to render star icons based on the rating
  const renderStars = (rating) => {
    const stars = [];
    const totalStars = 5;
    
    for (let i = 0; i < totalStars; i++) {
      if (i < rating) {
        stars.push(
          <span key={i} className="star filled" aria-label="filled star">
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star empty" aria-label="empty star">
            &#9734;
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <main className="homepage-main">
      {/* Hero section with enhanced styling */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to TechVista Inc.</h1>
          <p className="hero-subtitle">
            Your premier destination for cutting-edge technology and innovative products
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.9</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Us section with enhanced design */}
      <section className="Home-Main-Section about-section">
        <div className="section-header">
          <h2 className="section-title">About Us</h2>
          <div className="section-underline"></div>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              At TechVista Inc., we're passionate about bringing you the latest in technology and innovation. 
              Our curated collection features premium products that enhance your digital lifestyle, from cutting-edge 
              electronics to essential accessories.
            </p>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🚚</div>
                <div className="feature-text">
                  <h4>Fast Shipping</h4>
                  <p>Free delivery on orders over $50</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <div className="feature-text">
                  <h4>Secure Payments</h4>
                  <p>Your data is safe with us</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💎</div>
                <div className="feature-text">
                  <h4>Premium Quality</h4>
                  <p>Only the best products make our cut</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced Shop Now button */}
        <div className="cta-container">
          <Link to="/products" className="cta-link">
            <button className="shop-now-btn">
              <span className="btn-text">Explore Our Products</span>
              <span className="btn-icon">→</span>
            </button>
          </Link>
        </div>
      </section>

      {/* Enhanced Customer Reviews section */}
      <section className="Review reviews-section">
        <div className="section-header">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="section-underline"></div>
        </div>
        <div className="reviews-container">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="review-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="review-header">
                <div className="customer-avatar">
                  {review.customerName.charAt(0).toUpperCase()}
                </div>
                <div className="customer-info">
                  <h4 className="customer-name">{review.customerName}</h4>
                  <div className="rating-container">
                    <div className="stars-wrapper">
                      {renderStars(review.stars)}
                    </div>
                    <span className="rating-text">({review.stars}/5)</span>
                  </div>
                </div>
              </div>
              <p className="review-content">"{review.reviewContent}"</p>
              <div className="review-date">
                <span>Verified Purchase</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomeMainSection;
