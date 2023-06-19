import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';


const SentimentGraph = () => {
    const [sentimentScores, setSentimentScores] = useState([]);
    const [dates, setDates] = useState([]);
    const chartRef = useRef(null);
  
    useEffect(() => {
      const fetchSentimentScores = async () => {
        try {
          const response = await axios.get('http://localhost:5000/news');
          const { sentiment_scores, extracted_dates } = response.data;
          setSentimentScores(sentiment_scores);
          setDates(extracted_dates);
        } catch (error) {
          console.error('Error fetching sentiment scores:', error);
        }
      };
  
      fetchSentimentScores();
    }, []);
  
    useEffect(() => {
      // Create the chart once the sentiment scores are fetched
      if (sentimentScores.length > 0) {
        if (chartRef.current) {
          // Destroy the previous chart instance
          chartRef.current.destroy();
        }
  
        const ctx = document.getElementById('sentimentChart').getContext('2d');
  
        chartRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                label: 'Sentiment Score',
                data: sentimentScores,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                beginAtZero: true,
                display: true,
                title: {
                  display: true,
                  text: 'Sentiment Score',
                },
              },
            },
            // Your additional chart configuration options here
            // For example, tooltips, legend, etc.
          },
        });
      }
    }, [sentimentScores, dates]);
  
    return (
      <div>
        <canvas id="sentimentChart" />
      </div>
    );
  };
  
  export default SentimentGraph;