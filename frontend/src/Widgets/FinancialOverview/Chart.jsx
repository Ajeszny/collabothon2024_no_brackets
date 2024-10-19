import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

//const data = [{ name: "Trochę tu", value: 800 },{ name: "trochę tam", value: 300 },{ name: "800+", value: 300 },{ name: "mops", value: 200 },{ name: "fein", value: 300 },{ name: "fraud", value: 200 },];

const COLORS = ["#333d39", "#355046", "#3d7a64", "#37a57d", "#23d191", "#80BEA5"];

const InteractivePieChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  const renderLegendText = (value) => <span style={{ color: 'black' }}>{value}</span>;

  let sum = 0;

  for (let index = 0; index < data.length; index++) {
    sum += data[index].value;
    
  }

  return (
    !data ? 
    <></> :
    <PieChart width={340} height={240} key={JSON.stringify(data)}>
      <Pie
        data={data}
        innerRadius={80}
        outerRadius={90}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
        onMouseLeave={onPieLeave}
        animationBegin={0}
        animationDuration={1000}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            stroke={activeIndex === index ? "#000000" : ""}
            strokeWidth={1} // Highlight with a thicker border
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend 
      layout="vertical"
      verticalAlign="middle"
      align="right"
      wrapperStyle={{
        width: '120px',
        padding: '10px',
        color: 'black',
      }}
      formatter={renderLegendText}
      />
      <text 
      x={100}
      y={124}
      textAnchor="middle"
      style={{ fontSize: '16px' }}
      >{sum}</text>
    </PieChart>
  );
};

export default InteractivePieChart;
