import React from "react";
import { ResponsiveLine } from "@nivo/line";
import socketIOClient from "socket.io-client";
import { useState, useEffect } from "react";
import { wsBaseUrl } from "../../../services/baseApi";


const MyResponsiveLine = ({ highchartProps, width, height, liveData, chartType }) => {

    const [data, setData] = useState([]);




    const yAxisTitles = [];
    highchartProps.Inputs.map((e) => {
        if (!highchartProps[`[${e.NAME}] Disable Data Grouping`]) {
            yAxisTitles.push({
                title: {
                    text: `${e.UOM_QUANTITY_TYPE} (${e.UOM})`,
                },

                endOnTick: true,
                startOnTick: true,
                opposite: false,
            });

        }

    });



    const sockets = [];

    useEffect(() => {

        highchartProps.Inputs.map((tag, index) => {
            const socket = new WebSocket(`${wsBaseUrl}/ws/tags/${tag.TAG_ID}`);
            sockets.push(socket);

            socket.onopen = function () {
                console.log("connected");
            };
            socket.onmessage = function (e) {
                let chartData = [];
                if (typeof e.data === "string") {
                    let jsonData = JSON.parse(e.data);
                    jsonData.forEach(data => {
                        Object.keys(data).forEach(key => {
                            let dateFormat = new Date(data[key][1][0][0] * 1000);
                            let dict = {
                                x: dateFormat,
                                y: data[key][1][0][1]
                            };
                            chartData.push(dict);
                        });
                    });
                }
                setData([{ id: "data", data: chartData }]);
            };

            socket.onerror = function () {
                console.log("Connection Error");
            };

            socket.onclose = function () {
                console.log("Connection Closed");
            };
        });

        return () => {
            sockets.forEach(socket => {
                socket.close();
            });
        };

    }, [liveData]);




    return (
        console.log(yAxisTitles),
        < ResponsiveLine
            data={data}
            xKey='x'
            yKey='y'
            enablePointLabel={true}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }
            }
            xScale={{ type: "time", format: "%Y-%m-%d %H:%M:%S" }}
            yScale={{
                type: "linear",
                stacked: false,
                min: 'auto',
                max: 'auto',
                ticks: {
                    maxTicksLimit: yAxisTitles.length,
                    callback: function (value, index, values) {
                        return yAxisTitles[index].title.text;
                    }
                }
            }}
            series={highchartProps.Inputs.map((e, i) => {
                return {
                    id: e.NAME,
                    data: data.filter(data => data.id === e.NAME),
                    yAxis: i,
                    name: e.NAME,
                    dataGrouping: {
                        units: [
                            ["week", [1]],
                            ["month", [1, 2, 3, 4, 6]],
                        ],
                    },
                    color: highchartProps["Enable Custom Colors"]
                        ? highchartProps[`[${e.NAME}] Color`]
                        : "",
                };
            })}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: "%b %d",
                tickValues: "every 2 days",
                legend: "time",
                legendPosition: "middle",
                legendOffset: 46,
            }}
            // axisLeft={yAxisTitles.map((title, index) => ({
            //     legend: title.title.text,
            //     legendPosition: "middle",
            //     legendOffset: -46,
            //     id: `left-y-axis-${index}`
            // }))}
            axisLeft={{
                legend: yAxisTitles[0].title.text,
                legendPosition: "middle",
                legendOffset: -46,
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={- 12}
            useMesh={true}
        // legends={[
        //     {
        //         anchor: 'bottom-right',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 100,
        //         translateY: 0,
        //         itemsSpacing: 0,
        //         itemDirection: 'left-to-right',
        //         itemWidth: 80,
        //         itemHeight: 20,
        //         itemOpacity: 0.75,
        //         symbolSize: 12,
        //         symbolShape: 'circle',
        //         symbolBorderColor: 'rgba(0, 0, 0, .5)',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemBackground: 'rgba(0, 0, 0, .03)',
        //                     itemOpacity: 1
        //                 }
        //             }
        //         ]
        //     }
        // ]}
        />
    );

};

function App(props) {
    return <MyResponsiveLine {...props}
    />;
}
export default React.memo(App);



