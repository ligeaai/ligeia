import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Responsive, WidthProvider } from "react-grid-layout";
import GridItem from "./gridItem";

import {
  updateChartLayout,
  updateCouchDb,
  loadTapsOverview,
} from "../../../services/actions/overview/taps";
import Widget from "./widgets";

const ResponsiveGridLayout = WidthProvider(Responsive);

function setBreakPoint() {
  const width = document.getElementById("myResponsiveGridLayout").offsetWidth;
  if (width >= 1280) {
    return "lg";
  } else if (width >= 992) {
    return "md";
  } else if (width >= 767) {
    return "sm";
  } else if (width >= 480) {
    return "xs";
  } else if (width >= 0) {
    return "xxs";
  }
}

const TabItems = (props) => {
  const refLayout = React.useRef(null);
  const [width, setWidth] = React.useState(
    document.getElementById("myResponsiveGridLayout").offsetWidth
  );
  const dispatch = useDispatch();
  const [breakpoint, setBreakpoint] = React.useState(setBreakPoint());
  const { widgetname } = props;
  const onResize = () => {
    if (refLayout.current) {
      setWidth(document.getElementById("myResponsiveGridLayout").offsetWidth);
      setBreakpoint(setBreakPoint());
    }
  };
  const widgets = useSelector((state) => {
    try {
      return state.tapsOverview.widgets[widgetname].widgets;
    } catch {
      return [];
    }
  });
  const layouts = useSelector((state) => {
    try {
      return state.tapsOverview.widgets[widgetname].layouts;
    } catch {
      return [];
    }
  });
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
  React.useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <ResponsiveGridLayout
      ref={refLayout}
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
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      breakpoint={breakpoint}
      width={width}
    >
      {widgets.map((widget, i) => {
        return (
          <Widget
            key={`${widget}`}
            widget={widget}
            root={props.item}
            {...props}
          >
            {props.children}
          </Widget>
        );
      })}
    </ResponsiveGridLayout>
  );
};

export default TabItems;
