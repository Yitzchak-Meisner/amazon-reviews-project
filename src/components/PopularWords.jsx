import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopularWords = ({ popularWords }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Popular Words',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frequency'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Words'
        }
      }
    }
  };

  const data = {
    labels: Object.keys(popularWords),
    datasets: [
      {
        data: Object.values(popularWords),
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: '250px' }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default PopularWords;