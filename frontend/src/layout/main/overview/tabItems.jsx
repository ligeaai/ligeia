import { Grid } from "@mui/material";
import React from "react";
import Widgets from "./widgets";
var ReactGridLayout = require("react-grid-layout");
const TabItems = (props) => {
  const { widgetProps } = props;
  console.log(widgetProps);
  return (
    <Grid container sx={{ height: "100%" }}>
      {widgetProps.map((widget, i) => (
        <Widgets widget={widget} key={i}></Widgets>
      ))}
    </Grid>
  );
};

export default TabItems;
