import React, { useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export interface RadarChartProps {
  values: {
    [key: string]: {
      label: string, value: number
    }
  };
}

export const ReaderChart: React.FC<RadarChartProps> = (props) => {
  const labels: string[] = [];
  const data: number[] = [];

  Object.keys(props.values).forEach(key => {
    const dataset: { label: string; value: number } = props.values[key];
    labels.push(dataset.label);
    data.push(dataset.value);
  })

  // @ts-ignore
  return (
    <Radar data={{
      labels,
      datasets: [
        {
          data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    }}/>
  )
};

