import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import addHighchartsMore from "highcharts/highcharts-more";
import React from "react";
import { useSelector } from "react-redux";
import { angular, lineChart } from "./highchartOptions";
addHighchartsMore(Highcharts);
const OverviewEditor = ({ highchartProps }) => {
  console.log(highchartProps);
  const chartType = {
    "Gauge(Angular)[Highchart]": angular,
    LineCharts: lineChart,
  };
  const options = chartType[highchartProps.Type](highchartProps);

  if (highchartProps.Name !== "") {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    );
  }
  return <></>;
};

export default OverviewEditor;
