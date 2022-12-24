import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Responsive, WidthProvider } from "react-grid-layout";
import "../../../assets/css/dashboard.css";
import GridItem from "./gridItem";

import {
  updateChartLayout,
  updateCouchDb,
} from "../../../services/actions/overview/taps";
const ResponsiveGridLayout = WidthProvider(Responsive);
const TabItems = (props) => {
  const dispatch = useDispatch();
  const [breakpoint, setBreakpoint] = React.useState("lg");
  const { widgetname } = props;
  const widgets = useSelector(
    (state) => state.tapsOverview.widgets[widgetname].widgets
  );
  const layouts = useSelector(
    (state) => state.tapsOverview.widgets[widgetname].layouts
  );
  const ref = React.createRef();
  const handleBreakPointChange = (breakpoint) => {
    setBreakpoint(breakpoint);
  };
  const handleLayoutChange = (newLayout) => {
    layouts[breakpoint] = newLayout;
    dispatch(updateChartLayout(layouts));
  };
  React.useEffect(() => {
    return () => {
      dispatch(updateCouchDb());
    };
  }, []);
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
