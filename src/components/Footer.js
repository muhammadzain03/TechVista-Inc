// Footer.js

/**
 * This component renders the footer section displayed at the bottom of every page.
 * It includes the company name, TechVista Inc., and dynamically displays the current year.
 */

import React from 'react';

const Footer = () => {
  // Get the current year to display in the footer
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Display copyright information with dynamic year */}
      <p>&copy; {currentYear} TechVista Inc. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
