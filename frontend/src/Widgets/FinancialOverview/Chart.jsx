import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

//const data = [
 // { name: "Trochę tu", value: 800 },
 // { name: "trochę tam", value: 300 },
 // { name: "800+", value: 300 },
 // { name: "mops", value: 200 },
 // { name: "fein", value: 300 },
 // { name: "fraud", value: 200 },
//];

const COLORS = ["#333d39", "#355046", "#3d7a64", "#37a57d", "#23d191", "#80BEA5"];

const InteractivePieChart = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:8000/get_balance?currency=EUR", {method: "GET"});
      const json = await data.json();
      setTransactions(json);
      //console.log({ json });
    };

    fetchData()
      .catch(err => {
        console.error({ err });
      });
  }, []);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  const renderLegendText = (value) => <span style={{ color: 'black' }}>{value}</span>;

  return (
    <PieChart width={340} height={240}>
      <Pie
        data={data}
        innerRadius={80}
        outerRadius={90}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
        onMouseLeave={onPieLeave}
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
      >748348,73</text>
    </PieChart>
  );
};

export default InteractivePieChart;
