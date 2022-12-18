import Highcharts from "highcharts";
export const angular = (highchartProps) => {
    return {
        chart: {
            type: "gauge",
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: "80%",
        },

        title: {
            text: highchartProps.Name,
        },

        pane: {
            startAngle: -90,
            endAngle: 89.9,
            background: null,
            center: ["50%", "75%"],
            size: "110%",
        },

        // the value axis
        yAxis: {
            min: parseInt(highchartProps.Minumum),
            max: parseInt(highchartProps.Maximum),
            tickPixelInterval: 72,
            tickPosition: "inside",
            tickColor: Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
            tickLength: 20,
            tickWidth: 2,
            minorTickInterval: null,
            labels: {
                distance: 20,
                style: {
                    fontSize: "14px",
                },
            },
            plotBands: [
                {
                    from: parseInt(highchartProps["[0] Low"]),
                    to: parseInt(highchartProps["[0] High"]),
                    color: highchartProps["[0] Color"], // green
                    thickness: 20,
                },
                {
                    from: parseInt(highchartProps["[1] Low"]),
                    to: parseInt(highchartProps["[1] High"]),
                    color: highchartProps["[1] Color"], // yellow
                    thickness: 20,
                },
                {
                    from: highchartProps["[2] Low"],
                    to: highchartProps["[2] High"],
                    color: highchartProps["[2] Color"], // red
                    thickness: 20,
                },
                {
                    from: highchartProps["[3] Low"],
                    to: highchartProps["[3] High"],
                    color: highchartProps["[3] Color"], // red
                    thickness: 20,
                },
                {
                    from: highchartProps["[4] Low"],
                    to: highchartProps["[4] High"],
                    color: highchartProps["[4] Color"], // red
                    thickness: 20,
                },
            ],
        },

        series: [
            {
                name: "Speed",
                data: [80],
                tooltip: {
                    valueSuffix: " km/h",
                },
                dataLabels: {
                    format: "{y} km/h",
                    borderWidth: 0,
                    color:
                        (Highcharts.defaultOptions.title &&
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color) ||
                        "#333333",
                    style: {
                        fontSize: "10px",
                    },
                },
                dial: {
                    radius: "80%",
                    backgroundColor: "gray",
                    baseWidth: 12,
                    baseLength: "0%",
                    rearLength: "0%",
                },
                pivot: {
                    backgroundColor: "gray",
                    radius: 6,
                },
            },
        ],
    }
}


export const lineChart = (highchartProps) => {
    return {
        chart: {
            type: "spline",
            reflow: true,
        },
        title: {
            text: highchartProps.Name,
        },
        xAxis: {
            categories: ["20.10", "21.10", "22.10"],
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
            {
                name: "Vegetable",
                data: [2, 1, 4],
            },
        ],

    }
}