// Homepage.js

/**
 * Homepage component displays the main content for the landing page.
 * It includes the HomeMainSection with an "About Us" area and a random selection
 * of customer reviews, as well as the Footer component.
 */

import React, { useEffect, useState } from 'react';
import HomeMainSection from './HomeMainSection';
import Footer from './Footer';
import reviewsData from '../data/reviews';

const Homepage = () => {
  // State to hold randomly selected reviews for display
  const [randomReviews, setRandomReviews] = useState([]);

  // useEffect to select two random reviews from the reviews data
  useEffect(() => {
    const randomIndices = [];
    while (randomIndices.length < 2) {
      const randomIndex = Math.floor(Math.random() * reviewsData.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    // Map the selected indices to review objects
    const selectedReviews = randomIndices.map(index => reviewsData[index]);
    setRandomReviews(selectedReviews);
  }, []);

  return (
    <div>
      {/* Renders the main section and footer of the homepage */}
      <HomeMainSection reviews={randomReviews} />
      <Footer />
    </div>
  );
};

export default Homepage;
