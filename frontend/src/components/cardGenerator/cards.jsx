import React from "react";

import { Grid } from "@mui/material";

import CardItems from "./cardItems";
import LoadingComponent from "../loading/loadingComopnent";

const Cards = (props) => {
  const { cards } = props;
  if (cards) {
    return (
      <Grid container columns={13} columnGap={3.5} sx={{ p: 2.5 }}>
        {cards.map((e, i) => (
          <CardItems key={i} card={e} />
        ))}
      </Grid>
    );
  } else {
    <LoadingComponent></LoadingComponent>;
  }
};

export default Cards;
