import React, { useState, useEffect } from 'react';


function TopTrendingTopics() {
  const [trendingTopics, setTrendingTopics] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/topTrendingTopics')
      .then(response => response.json())
      .then(data => {
        setTrendingTopics(data);
      })
      .catch(error => {
        console.error('Error fetching trending topics:', error);
      });
  }, []);

  const getEmotionLevel = sentiment => {
    if (sentiment > 0.1) {
      return 'Positive';
    } else if (sentiment < -0.1) {
      return 'Negative';
    } else {
      return 'Neutral';
    }
  };

  const getEmotionColor = sentiment => {
    if (sentiment > 0.1) {
      return 'lightgreen';
    } else if (sentiment < -0.1) {
      return 'lightcoral';
    } else {
      return 'white';
    }
  };

  return (
    <div className="top-trending-topics">
      <h1>Top Trending Topics</h1>
      {Object.entries(trendingTopics).map(([topic, articles], index) => (
        <div key={topic} className="topic-container">
          <h2>{index + 1}. {topic}</h2>
          {articles.length > 0 ? (
            <table className="article-table">
              <thead>
                <tr>
                  <th>News Source</th>
                  <th>Content</th>
                  <th>Emotion Level</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(article => (
                  <tr key={article.publishedAt}>
                    <td>{article.source.name}</td>
                    <td>{article.title}</td>
                    <td style={{ backgroundColor: getEmotionColor(article.sentiment) }}>
                      {getEmotionLevel(article.sentiment)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No news available for this topic.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default TopTrendingTopics;
