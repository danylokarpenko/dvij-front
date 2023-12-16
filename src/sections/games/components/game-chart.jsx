import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Chart, { useChart } from '../../../components/chart';

export default function GameChart({ game }) {
  const { gameStatistics } = game;

  const statKeys = ['cpi', 'pt', 'd1', 'd7', 'pt'];

  const data = gameStatistics.map((statObj) => {
    const values = statKeys.map((key) => statObj[key]);
    return values;
  });
  const { labels, colors, series, options } = {
    labels: statKeys,
    series: [
      {
        type: 'line',
        fill: 'solid',
        data: data[0] || [],
      },
      {
        type: 'line',
        fill: 'solid',
        data: data[1] || [],
      },
    ],
  };

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'string',
      show: true,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)}`;
          }
          return value;
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: undefined,
      },
      background: {
        enabled: false,
      },
    },
    ...options,
  });

  return (
    <Box sx={{ pr: 1 }}>
      <Chart
        dir="ltr"
        type="line"
        series={series}
        options={chartOptions}
        height={150}
      />
    </Box>
  );
}

GameChart.propTypes = {
  game: PropTypes.object,
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
