import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Responsive, WidthProvider } from "react-grid-layout";
import "../../../assets/css/dashboard.css";
import GridItem from "./gridItem";

import { updateChartLayout } from "../../../services/actions/overview/taps";
let i = 1;
const ResponsiveGridLayout = WidthProvider(Responsive);
const TabItems = (props) => {
  i++;
  const dispatch = useDispatch();
  const [breakpoint, setBreakpoint] = React.useState("lg");
  const { widgetname } = props;
  console.log(widgetname);
  const widgets = useSelector(
    (state) => state.tapsOverview.widgets[widgetname].widgets
  );
  const layouts = useSelector(
    (state) => state.tapsOverview.widgets[widgetname].layouts
  );
  console.log(layouts);
  const ref = React.createRef();
  const handleBreakPointChange = (breakpoint) => {
    console.log(breakpoint);
    setBreakpoint(breakpoint);
  };
  const handleLayoutChange = (newLayout) => {
    console.log(breakpoint);
    console.log(newLayout);
    layouts[breakpoint] = newLayout;
    dispatch(updateChartLayout(layouts));
  };

  console.log(i);
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      rowHeight={30}
      onBreakpointChange={handleBreakPointChange}
      onLayoutChange={handleLayoutChange}
      isDraggable
      isRearrangeable
      isResizable
      draggableHandle=".grid-item__title"
      breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
      cols={{ lg: 24, md: 20, sm: 12, xs: 8, xxs: 4 }}
      width={document.getElementById("myResponsiveGridLayout").offsetWidth}
    >
      {widgets.map((widget) => {
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

export default TabItems;
