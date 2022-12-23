import Highcharts from "highcharts";
import React from "react";
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


export const LineChart = (highchartProps) => {
    const [categories, setCategories] = React.useState([])
    const [quality, setQuality] = React.useState([])
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var W3CWebSocket = require("websocket").w3cwebsocket;

        var client = new W3CWebSocket("ws://34.125.220.112:8001/ws/tags/");
        client.onerror = function () {
            console.log("Connection Error");
        };
        client.onopen = function () {
            console.log("WebSocket Client Connected");
        };


        client.onmessage = function (e) {
            function sendNumber() {
                if (client.readyState === client.OPEN) {
                    if (typeof e.data === "string") {
                        let data = JSON.parse(e.data)
                        if (Object.keys(data.message).length > 5) {
                            setCategories((prev) => [...prev, data.message.createdtime])
                            setQuality((prev) => [...prev, data.message.quality])
                            setData((prev) => [...prev, data.message.value])
                        }

                        setTimeout(sendNumber, 5000);
                        return data
                    }
                }
            }
            sendNumber();
        };
    }, [])
    return {
        chart: {
            type: "spline",
            reflow: true,
        },
        title: {
            text: highchartProps.Name,
        },
        xAxis: {
            categories: categories,
        },
        yAxis: {
            title: {
                text: "Amount",
            },
        },
        series: [
            {
                name: "quality",
                data: quality,
            },
            {
                name: "value",
                data: data,
            },
        ],

    }
}


export const solid = (highchartProps) => {
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

export const Measurement = (highchartProps) => {

}