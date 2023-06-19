import React, { useEffect, useState } from 'react';
import { Chart, BarElement, LinearScale, CategoryScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import 'chartjs-adapter-luxon';
import 'chartjs-adapter-date-fns';
import axios from 'axios';

Chart.register(BarElement, LinearScale, CategoryScale);

const NewsGraph = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/newsService');
        const data = response.data;

        // Categorize the data using NLP or any other method
        const categorizedData = {
          happy: data.happy.length,
          sad: data.sad.length,
          angry: data.angry.length,
          optimistic: data.optimistic.length,
          pessimistic: data.pessimistic.length,
        };

        // Prepare chart data
        const chartData = {
          labels: ['Happy', 'Sad', 'Angry', 'Optimistic', 'Pessimistic'],
          datasets: [
            {
              label: 'News Sentiments',
              data: Object.values(categorizedData),
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.log('Error fetching news data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>News Graph</h2>
      {chartData && chartData.datasets && chartData.datasets[0] && (
        <Bar data={chartData} />
      )}
    </div>
  );
};

export default NewsGraph;