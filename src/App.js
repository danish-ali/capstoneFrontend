import React, { useState } from 'react';
import Heading from './Heading';
import NewsEmotionsSingleGraph from './NewsEmotionsSingleGraph';
import TopTrendingTopics from './TopTrendingTopics';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/system';

const StyledFormControl = styled(FormControl)`
  min-width: 200px;
  margin: 1rem;
`;

const StyledSelect = styled(Select)`
  background-color: #f5f5f5;
  padding: 8px;
`;

const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: #e0e0e0;
  }
`;

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState('NewsEmotionsSingleGraph');

  const handleComponentChange = (event) => {
    setSelectedComponent(event.target.value);
  };

  return (
    <div>
      <Heading />

      <StyledFormControl variant="outlined">
        <InputLabel id="component-select-label">Select Component</InputLabel>
        <StyledSelect
          labelId="component-select-label"
          id="component-select"
          value={selectedComponent}
          onChange={handleComponentChange}
          label="Select Component"
        >
          <StyledMenuItem value="NewsEmotionsSingleGraph">News Emotions Graph</StyledMenuItem>
          <StyledMenuItem value="TopTrendingTopics">Top Trending Topics</StyledMenuItem>
        </StyledSelect>
      </StyledFormControl>

      {selectedComponent === 'NewsEmotionsSingleGraph' ? (
        <NewsEmotionsSingleGraph />
      ) : (
        <TopTrendingTopics />
      )}
    </div>
  );
};

export default App;
