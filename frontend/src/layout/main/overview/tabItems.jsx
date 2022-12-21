import { Grid } from "@mui/material";
import React, { useRef } from "react";
import Widgets from "./widgets";
import { Responsive, WidthProvider } from "react-grid-layout";
import "../../../assets/css/dashboard.css";
import Highcharts from "highcharts";
import GridItem from "./gridItem";

const ResponsiveGridLayout = WidthProvider(Responsive);
const TabItems = (props) => {
  const ref = React.createRef();
  const { widgetProps } = props;
  // return <Grid sx={{ backgroundColor: "red", height: "100%" }}>asd</Grid>;
  const layouts = {
    lg: [
      {
        w: 6,
        i: "86d3962a-6439-4d25-b05f-c4a07ae3e04b",
        h: 6,
        x: 0,
        y: 0,
      },
      {
        w: 6,
        i: "c4644f77-f562-4f68-8cf4-e296e14e580d",
        h: 6,
        x: 6,
        y: 6,
      },
    ],
    md: [
      {
        w: 6,
        i: "86d3962a-6439-4d25-b05f-c4a07ae3e04b",
        h: 6,
        x: 0,
        y: 0,
      },
      {
        w: 6,
        i: "c4644f77-f562-4f68-8cf4-e296e14e580d",
        h: 6,
        x: 6,
        y: 6,
      },
    ],
    sm: [
      {
        w: 6,
        i: "86d3962a-6439-4d25-b05f-c4a07ae3e04b",
        h: 6,
        x: 0,
        y: 0,
      },
      {
        w: 6,
        i: "c4644f77-f562-4f68-8cf4-e296e14e580d",
        h: 6,
        x: 6,
        y: 0,
      },
    ],
    xs: [
      {
        w: 6,
        i: "86d3962a-6439-4d25-b05f-c4a07ae3e04b",
        h: 6,
        x: 0,
        y: 0,
      },
      {
        w: 6,
        i: "c4644f77-f562-4f68-8cf4-e296e14e580d",
        h: 6,
        x: 6,
        y: 0,
      },
    ],
    xxs: [
      {
        w: 4,
        i: "86d3962a-6439-4d25-b05f-c4a07ae3e04b",
        h: 4,
        x: 0,
        y: 0,
      },
      {
        w: 4,
        i: "c4644f77-f562-4f68-8cf4-e296e14e580d",
        h: 6,
        x: 0,
        y: 4,
      },
    ],
  };
  const handleLayoutChange = (newLayout) => {
    //layouts["lg"] = newLayout;
  };
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      rowHeight={30}
      //onBreakpointChange={handleBreakPointChange}
      onLayoutChange={handleLayoutChange}
      isDraggable
      isRearrangeable
      isResizable
      draggableHandle=".grid-item__title"
      breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
      cols={{ lg: 24, md: 20, sm: 12, xs: 8, xxs: 4 }}
    >
      {widgetProps.map((widget) => {
        return (
          <GridItem
            ref={ref}
            key={`${widget}`}
            widget={widget}
            item={widget}
            {...props}
          ></GridItem>
        );
      })}
    </ResponsiveGridLayout>
  );
};

export default React.memo(TabItems);
