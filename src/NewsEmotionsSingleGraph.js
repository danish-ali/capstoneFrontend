import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import dayjs from 'dayjs';
import FilterComponent from './FilterComponent';
import 'chartjs-adapter-dayjs';

const NewsEmotionsSingleGraph = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getNewsEmotionsSingleGraphDB');
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = async (filterData) => {
    try {
      const queryParams = {
        startDate: filterData.startDate || '',
        endDate: filterData.endDate || '',
        compoundValue: filterData.compoundValue || '',
        newsSources: encodeURIComponent(JSON.stringify(filterData.newsSources))
      };

      const queryString = Object.keys(queryParams)
        .map(key => `${key}=${queryParams[key]}`)
        .join('&');

      const url = `http://localhost:5000/getNewsEmotionsSingleGraphDB?${queryString}`;
      const response = await fetch(url);
      const responseData = await response.json();
      setFilteredData(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createChartData = () => {
    if (!filteredData) return null;

    const chartData = {};

    for (const newsSource in filteredData) {
      const emotionData = filteredData[newsSource];
      const positiveCount = emotionData.pos ? emotionData.pos.reduce((count, value) => count + value, 0) : 0;
      const negativeCount = emotionData.neg ? emotionData.neg.reduce((count, value) => count + value, 0) : 0;


      chartData[newsSource] = {
        labels: ['Positive', 'Negative'],
        datasets: [
          {
            data: [positiveCount, negativeCount],
            backgroundColor: ['#4CAF50', '#F44336'],
            hoverOffset: 4,
          },
        ],
      };
    }

    return chartData;
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Sentiment Distribution',
        font: { weight: 'bold' },
      },
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label;
            const value = context.raw;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <FilterComponent onFilter={handleFilter} />
      {filteredData &&
        Object.entries(filteredData).map(([newsSource, emotionData]) => (
          <div key={newsSource}>
            <h2>{newsSource}</h2>
            {emotionData && (
              <div style={{ maxWidth: '400px' }}>
                <Pie data={createChartData()[newsSource]} options={options} />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default NewsEmotionsSingleGraph;
