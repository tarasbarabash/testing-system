import React from "react";
import "../../styles/scss/chart.scss";

const CircleChart = ({ percentage, className, showPercentage, height }) => {
  const radius = 100 / (2 * Math.PI);
  const diameter = radius * 2;
  const x = 36 / 2;
  const y = (36 - diameter) / 2;

  const circleString = `M${x} ${y}
          a ${radius} ${radius} 0 0 1 0 ${diameter}
          a ${radius} ${radius} 0 0 1 0 -${diameter}`;
  return (
    <svg viewBox="0 0 36 36" className="circular-chart" height={height}>
      <defs>
        <linearGradient id="grad">
          <stop id="stop1" offset="0%" />
          <stop id="stop2" offset="100%" />
        </linearGradient>
      </defs>
      <path className="circle-bg" d={circleString} />
      <path
        stroke="url(#grad)"
        className={`circle ${className}`}
        strokeDasharray={`${percentage}, 100`}
        d={circleString}
      />
      <text
        x={x + 1}
        y={y + x + 1}
        className={`percentage ${!showPercentage && "hidden"}`}
      >
        {parseInt(percentage)}%
      </text>
    </svg>
  );
};

export default CircleChart;
