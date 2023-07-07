import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement, TimeScale, TimeSeriesScale } from 'chart.js';
import dayjs from 'dayjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-adapter-dayjs';
import FilterComponent from './FilterComponent';

Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement, TimeScale, TimeSeriesScale, ChartDataLabels);

const NewsEmotionsSingleGraph = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getNewsEmotionsSingleGraphDB');
        const responseData = await response.json();
        setData(responseData);
        setFilteredData(responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (filterData) => {
    // Apply the filtering logic based on the filterData
    // Update the filteredData state with the filtered data

    // Example filtering logic:
    const filtered = data.filter((item) => {
      const matchDate = filterData.date ? dayjs(item.date).format('YYYY-MM-DD') === filterData.date : true;
      const matchNewsSource = filterData.newsSource ? item.newsSource === filterData.newsSource : true;
      const matchCompound = filterData.compound ? item.compound === parseFloat(filterData.compound) : true;

      return matchDate && matchNewsSource && matchCompound;
    });

    setFilteredData(filtered);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'YYYY-MM-DD'
          }
        },
        ticks: {
          source: 'labels'
        }
      },
      y: {
        min: -1,
        max: 1,
        ticks: {
          stepSize: 0.2,
          callback: (value) => {
            return value.toFixed(2);
          }
        }
      }
    },
    plugins: {
      datalabels: {
        display: true,
        color: 'white'
      }
    }
  };

  return (
    <div>
      <FilterComponent onFilter={handleFilter} />

      {/* Render the chart using the filteredData */}
      {filteredData && Object.entries(filteredData).map(([newsSource, emotionData]) => (
        <div key={newsSource}>
          <h2>{newsSource}</h2>
          <Line
            data={{
              labels: emotionData.date.map(date => dayjs(date).format('YYYY-MM-DD')),
              datasets: [{
                label: newsSource,
                data: emotionData.compound,
                fill: false,
                borderColor: getRandomColor(),
                tension: 0.1
              }]
            }}
            options={options}
          />
        </div>
      ))}
    </div>
  );
};

export default NewsEmotionsSingleGraph;
