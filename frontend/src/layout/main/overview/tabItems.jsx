import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Responsive, WidthProvider } from "react-grid-layout";

import { updateChartLayout } from "../../../services/actions/overview/taps";
import Widget from "./widgets";

const ResponsiveGridLayout = WidthProvider(Responsive);

function setBreakPoint(width) {
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
  const [mounted, setMounted] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const dispatch = useDispatch();
  const [breakpoint, setBreakpoint] = React.useState(setBreakPoint(0));
  const { widgetname } = props;

  const containerRef = useRef(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  const onResize = () => {
    if (refLayout.current) {
      setWidth(containerRef.current.offsetWidth);
      setBreakpoint(setBreakPoint(containerRef.current.offsetWidth));
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

  const handleLayoutChange = (newLayout) => {
    console.log(width);
    layouts[breakpoint] = newLayout;
    dispatch(updateChartLayout(layouts));
  };
  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      onResize();
    });
    onResize();
    observer.observe(document.getElementById("myResponsiveGridLayout"));
  }, []);
  React.useEffect(() => {
    refLayout.current.forceUpdate();
  }, [width]);
  React.useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }, [width]);
  return (
    <div ref={containerRef} id={"myResponsiveGridLayout"}>
      <ResponsiveGridLayout
        bounds="parent"
        ref={refLayout}
        className="layout"
        width={width}
        layouts={layouts}
        rowHeight={30}
        measureBeforeMount={mounted}
        autoSize={true}
        useCSSTransforms={mounted}
        draggableCancel=".cancelDrag"
        onLayoutChange={handleLayoutChange}
        isDraggable
        isRearrangeable
        isResizable
        resizeHandles={["e", "s", "se"]}
        draggableHandle=".grid-item__title"
        breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        breakpoint={breakpoint}
        {...props}
      >
        {widgets.map((widget, i) => {
          return <Widget key={`${widget}`} widget={widget} {...props}></Widget>;
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default React.memo(TabItems);
