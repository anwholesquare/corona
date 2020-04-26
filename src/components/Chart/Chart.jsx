import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);
  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Cases', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['#035aa6', '#21bf73', '#fd5e53'],
              hoverBackgroundColor: ['#142850', '#06623b', '#c70039'],
              borderWidth: 2,
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Scenarios in ${country}` },
        }}
      />
    ) : null
  );

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Cases',
            borderColor: '#035aa6',
            backgroundColor: '#142850',
            fill: true,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: '#fd5e53',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
};

export default Chart;
