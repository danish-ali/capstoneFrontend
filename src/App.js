import React from 'react';
import Heading from './Heading';
import NewsEmotionsSingleGraph from './NewsEmotionsSingleGraph';
import TopTrendingTopics from './TopTrendingTopics';

const App = () => {
  return (
    <div>
      <Heading />
      
      <NewsEmotionsSingleGraph />

      <TopTrendingTopics/>
    </div>
  );
};

export default App;