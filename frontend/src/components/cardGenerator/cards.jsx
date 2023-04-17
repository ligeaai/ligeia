import React, { useState } from "react";
import { Box, Grid } from "@mui/material";

import CardItems from "./cardItems";
import LoadingComponent from "../loading/loadingComopnent";
const Cards = ({ cards }) => {
  if (cards) {
    return (
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={3}
        className="card-container"
      >
        {cards.map((card, i) => (
          <CardItems key={i} card={card} />
        ))}
      </Box>
    );
  } else {
    <LoadingComponent></LoadingComponent>;
  }
};

export default Cards;
