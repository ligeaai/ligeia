import React from "react";
import Widget from "./widgets";

const GridItemContainer = React.forwardRef(
  ({ widget, children, item, ...props }, ref) => {
    return (
      <Widget ref={ref} widget={widget} root={item} {...props}>
        {children}
      </Widget>
    );
  }
);
export default React.memo(GridItemContainer);
