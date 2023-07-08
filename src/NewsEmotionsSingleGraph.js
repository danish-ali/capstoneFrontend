import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement, TimeScale, TimeSeriesScale } from 'chart.js';
import dayjs from 'dayjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-adapter-dayjs';

Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement, TimeScale, TimeSeriesScale, ChartDataLabels);

const NewsEmotionsSingleGraph = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filterData, setFilterData] = useState({
    date: '',
    newsSource: '',
    compoundValue: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:5000/getNewsEmotionsSingleGraphDB';
        const params = new URLSearchParams(filterData);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await fetch(url);
        const responseData = await response.json();
        setData(responseData);
        setFilteredData(responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [filterData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFilter = () => {
    // Perform filtering logic here if needed
    // You can update the fetchData function to use the filtered data in the request
    // For example, you can set the filterData state and let the useEffect fetch the filtered data
    setFilteredData(data);
  };

  const handleReset = () => {
    setFilterData({
      date: '',
      newsSource: '',
      compoundValue: ''
    });
    setFilteredData(data);
  };

  const createChartData = () => {
    if (!filteredData) return null;

    const chartData = {
      labels: [], // Dates
      datasets: [] // Emotion datasets for each news source
    };

    for (const newsSource in filteredData) {
      const emotionData = filteredData[newsSource];

      const emotionDataset = {
        label: newsSource,
        data: emotionData.compound,
        fill: false,
        borderColor: getRandomColor(),
        tension: 0.1
      };

      chartData.datasets.push(emotionDataset);
    }

    const firstNewsSource = Object.keys(filteredData)[0];
    const firstEmotionData = filteredData[firstNewsSource];
    chartData.labels = firstEmotionData.date.map(date => dayjs(date).format('YYYY-MM-DD'));

    return chartData;
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
        beginAtZero: false, // Remove the beginAtZero option
        min: -1, // Set the minimum value of the scale to -1
        max: 1, // Set the maximum value of the scale to 1
        ticks: {
          stepSize: 0.2, // Set the step size of the ticks to 0.2
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
      <div>
        <h3>Filter</h3>
        <div>
          <label>Date:</label>
          <input type="text" name="date" value={filterData.date} onChange={handleInputChange} />
        </div>
        <div>
          <label>News Source:</label>
          <input type="text" name="newsSource" value={filterData.newsSource} onChange={handleInputChange} />
        </div>
        <div>
          <label>Compound Value:</label>
          <input type="text" name="compoundValue" value={filterData.compoundValue} onChange={handleInputChange} />
        </div>
        <button onClick={handleFilter}>Apply Filter</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {filteredData && Object.entries(filteredData).map(([newsSource, emotionData]) => (
        <div key={newsSource}>
          <h2>{newsSource}</h2>
          <Line
            data={createChartData()}
            options={options}
          />
        </div>
      ))}
    </div>
  );
};

export default NewsEmotionsSingleGraph;
