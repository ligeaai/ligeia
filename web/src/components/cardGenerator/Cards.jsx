import React from "react";

import { Grid } from "@mui/material";
import CardItems from "./CardItems";
const Cards = (props) => {
  return (
    <Grid
      container
      columns={13}
      columnGap={3.5}
      sx={{ backgroundColor: "inherit", p: 2.5 }}
    >
      {props.props.map((e, i) => (
        <CardItems key={i} props={e} />
      ))}
    </Grid>
  );
};

export default Cards;
