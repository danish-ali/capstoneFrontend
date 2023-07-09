import React from 'react';

const Heading = () => {
  const headingStyle = {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: 'blue',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    marginTop: '20px',
  };

  return (
    <h1 style={headingStyle}>Automated News Sentiment Analysis and Visualization System</h1>
  );
};

export default Heading;