import React from "react";

import { Grid } from "@mui/material";
import CardItems from "./cardItems";
const Cards = (props) => {
  const { cards } = props;
  return (
    <Grid container columns={11} columnGap={3.5} sx={{ p: 2.5 }}>
      {cards.map((e, i) => (
        <CardItems key={i} card={e} />
      ))}
    </Grid>
  );
};

export default Cards;
