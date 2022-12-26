import React from "react";
import Widget from "./widgets";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ComponentErrorBody, ComponentError } from "../../../components";
const GridItemContainer = React.forwardRef(
  ({ widget, children, item, ...props }, ref) => {
    return (
      <ComponentError
        errMsg={
          <ComponentErrorBody
            text="Something went wrong"
            icon={<ErrorOutlineIcon />}
          />
        }
      >
        <Widget ref={ref} widget={widget} root={item} {...props}>
          {children}
        </Widget>
      </ComponentError>
    );
  }
);
export default React.memo(GridItemContainer);
