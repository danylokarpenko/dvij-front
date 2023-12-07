import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chart, { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

export default function GameChart({ title, subheader, chart, ...other }) {
  const { labels, colors, series, options } = {
    labels: [
      '01/01/2003',
      '02/01/2003',
      '03/01/2003',
      '04/01/2003',
      '05/01/2003',
      '06/01/2003',
      '07/01/2003',
      '08/01/2003',
      '09/01/2003',
      '10/01/2003',
      '11/01/2003',
    ],
    series: [
      {
        name: 'cpi',
        type: 'line',
        fill: 'solid',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
      },
      {
        name: 'd1',
        type: 'line',
        fill: 'solid',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
      },
      {
        name: 'd7',
        type: 'line',
        fill: 'solid',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
      },
      {
        name: 'pt',
        type: 'line',
        fill: 'solid',
        data: [30, 55, 41, 21, 41, 35, 64, 13, 22, 37, 21],
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
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} visits`;
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
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
