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
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i} aria-label="star">&#9733;</span>); // Unicode for star character
    }
    return stars;
  };

  return (
    <main>
      {/* About Us section */}
      <section className="Home-Main-Section">
        <h2>About Us</h2>
        <p>
          Welcome to our online store! We are passionate about providing high-quality products and exceptional customer service.
          Learn more about our story and commitment to your satisfaction.
        </p>
        {/* Link to Products page */}
        <Link to="/products">
          <button>Shop Now</button>
        </Link>
      </section>

      {/* Customer Reviews section */}
      <section className="Review">
        <h2>Customer Reviews</h2>
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            <p><strong>{review.customerName}</strong></p>
            <p>{review.reviewContent}</p>
            <p>Rating: {renderStars(review.stars)}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default HomeMainSection;
