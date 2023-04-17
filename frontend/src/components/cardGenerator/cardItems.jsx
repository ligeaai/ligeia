import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import history from "../../routers/history";

const CardItems = ({ card }) => {
  return (
    <Box
      gridColumn={{ xs: "span 12", md: "span 4" }}
      className="card-container__card-box"
      onClick={() => {
        history.push(`${card.cardURL}`);
      }}
    >
      <Grid container rowGap={2} className="card-container__card-box__body">
        <Grid item xs={12}>
          <Typography className="card-container__card-box__body__title">
            {card?.cardTitle}
          </Typography>
        </Grid>
        <Box className="card-container__card-box__body__btn-next">Next</Box>
      </Grid>
    </Box>
  );
};

export default CardItems;
