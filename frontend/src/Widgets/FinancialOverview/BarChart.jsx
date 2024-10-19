import React from 'react';
import {
  Bar, XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import { BarChart as RechartsBarChart } from 'recharts';

const data = [
  { name: 'Jan', income: 4000, expenses: 2400 },
  { name: 'Feb', income: 3000, expenses: 1398 },
  { name: 'Mar', income: 2000, expenses: 1500 },
];

const BarChart = () => {
  const renderLegendText = (value) => <span style={{ color: 'black' }}>{value}</span>;

  return (
    <RechartsBarChart
      data={data}
      width={340}
      height={240}
    >
      <XAxis dataKey="name" tick={{ fill: 'black' }} />
      <YAxis tick={{ fill: 'black' }} />
      <Tooltip />
      <Legend 
        formatter={renderLegendText}
      />
      <Bar dataKey="income" fill="#314C2B" />
      <Bar dataKey="expenses" fill="#743838" />
    </RechartsBarChart>
  );
}

export default BarChart;
