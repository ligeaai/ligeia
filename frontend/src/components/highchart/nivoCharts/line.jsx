import React from "react";
import { ResponsiveLine } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={[
      {
        id: "japan",
        color: "hsl(269, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 101,
          },
          {
            x: "helicopter",
            y: 155,
          },
          {
            x: "boat",
            y: 154,
          },
          {
            x: "train",
            y: 258,
          },
          {
            x: "subway",
            y: 206,
          },
          {
            x: "bus",
            y: 239,
          },
          {
            x: "car",
            y: 281,
          },
          {
            x: "moto",
            y: 169,
          },
          {
            x: "bicycle",
            y: 118,
          },
          {
            x: "horse",
            y: 136,
          },
          {
            x: "skateboard",
            y: 52,
          },
          {
            x: "others",
            y: 66,
          },
        ],
      },
      {
        id: "france",
        color: "hsl(99, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 174,
          },
          {
            x: "helicopter",
            y: 1,
          },
          {
            x: "boat",
            y: 36,
          },
          {
            x: "train",
            y: 247,
          },
          {
            x: "subway",
            y: 80,
          },
          {
            x: "bus",
            y: 85,
          },
          {
            x: "car",
            y: 143,
          },
          {
            x: "moto",
            y: 291,
          },
          {
            x: "bicycle",
            y: 227,
          },
          {
            x: "horse",
            y: 13,
          },
          {
            x: "skateboard",
            y: 34,
          },
          {
            x: "others",
            y: 259,
          },
        ],
      },
      {
        id: "us",
        color: "hsl(333, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 218,
          },
          {
            x: "helicopter",
            y: 239,
          },
          {
            x: "boat",
            y: 24,
          },
          {
            x: "train",
            y: 11,
          },
          {
            x: "subway",
            y: 79,
          },
          {
            x: "bus",
            y: 35,
          },
          {
            x: "car",
            y: 81,
          },
          {
            x: "moto",
            y: 175,
          },
          {
            x: "bicycle",
            y: 264,
          },
          {
            x: "horse",
            y: 53,
          },
          {
            x: "skateboard",
            y: 233,
          },
          {
            x: "others",
            y: 127,
          },
        ],
      },
      {
        id: "germany",
        color: "hsl(68, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 44,
          },
          {
            x: "helicopter",
            y: 280,
          },
          {
            x: "boat",
            y: 132,
          },
          {
            x: "train",
            y: 16,
          },
          {
            x: "subway",
            y: 61,
          },
          {
            x: "bus",
            y: 119,
          },
          {
            x: "car",
            y: 69,
          },
          {
            x: "moto",
            y: 176,
          },
          {
            x: "bicycle",
            y: 111,
          },
          {
            x: "horse",
            y: 113,
          },
          {
            x: "skateboard",
            y: 159,
          },
          {
            x: "others",
            y: 92,
          },
        ],
      },
      {
        id: "norway",
        color: "hsl(356, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 26,
          },
          {
            x: "helicopter",
            y: 95,
          },
          {
            x: "boat",
            y: 180,
          },
          {
            x: "train",
            y: 93,
          },
          {
            x: "subway",
            y: 261,
          },
          {
            x: "bus",
            y: 116,
          },
          {
            x: "car",
            y: 6,
          },
          {
            x: "moto",
            y: 149,
          },
          {
            x: "bicycle",
            y: 126,
          },
          {
            x: "horse",
            y: 177,
          },
          {
            x: "skateboard",
            y: 159,
          },
          {
            x: "others",
            y: 22,
          },
        ],
      },
    ]}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "transportation",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
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

function App() {
  return <MyResponsiveLine />;
}
export default React.memo(App);
