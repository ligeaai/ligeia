import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import addHighchartsMore from "highcharts/highcharts-more";
import React from "react";
import { useSelector } from "react-redux";
addHighchartsMore(Highcharts);
const OverviewEditor = () => {
  const chartType = useSelector((state) => state.highchart.chartType);
  const options = {
    chart: {
      type: chartType,
      reflow: true,
    },
    title: {
      text: "Highcharts responsive chart",
    },
    subtitle: {
      text: "Resize the frame to see subtitle and legend hide",
    },
    xAxis: {
      categories: ["Apples", "Oranges", "Bananas"],
    },
    yAxis: {
      title: {
        text: "Amount",
      },
    },
    series: [
      {
        name: "Fruits",
        data: [1, 4, 3],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            chart: {
              className: "small-chart",
            },
          },
        },
      ],
    },
  };
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "50%" } }}
      />
    </div>
  );
};

export default OverviewEditor;
