import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import addHighchartsMore from "highcharts/highcharts-more";
import React from "react";
import { useSelector } from "react-redux";
import { angular, LineChart, solid } from "./charts";

addHighchartsMore(Highcharts);
const Highchart = ({ highchartProps, width, height }) => {
  const chartType = {
    "Gauge(Angular)[Highchart]": angular,
    Linechart: LineChart,
    "Gauge(Solid)[Highchart]": solid,
  };

  const options = chartType[highchartProps.Type](highchartProps);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        ...options,
        chart: {
          ...options.chart,
          width: width,
          height: height,
        },
      }}
    />
  );
  return <></>;
};

export default Highchart;
