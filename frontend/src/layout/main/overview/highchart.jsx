import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import addHighchartsMore from "highcharts/highcharts-more";
import React from "react";
import { useSelector } from "react-redux";
import { angular, lineChart } from "./highchartOptions";
addHighchartsMore(Highcharts);
const OverviewEditor = ({ highchartProps, width, height }) => {
  const chartType = {
    "Gauge(Angular)[Highchart]": angular,
    LineCharts: lineChart,
  };
  const options = chartType[highchartProps.Type](highchartProps);

  if (highchartProps.Name !== "") {
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
  }
  return <></>;
};

export default OverviewEditor;
