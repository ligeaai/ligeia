import React, { useState } from "react";

import { Box, Grid, Link, Typography } from "@mui/material";

const CardItems = (props) => {
  const [theme, setTheme] = useState("#42526E");
  return (
    <>
      <Grid
        item
        xs={12}
        sm={"auto"}
        sx={{ mb: 2, backgroundColor: "#ffffff", width: "290px !important" }}
        onMouseOver={() => setTheme("#458BF3")}
        onMouseLeave={() => setTheme("#42526E")}
      >
        <Grid container flexWrap="nowrap">
          <Grid item>
            <Box
              sx={{
                width: "20px",
                backgroundColor: `${theme}`,
                height: "100%",
                display: "inline-block",
              }}
            />
          </Grid>
          <Grid item sx={{ pt: 1, pr: 2.5, pb: 2.5, pl: 4 }}>
            <Typography sx={{ fontWeight: "700", mb: 2.5 }}>
              {props.props.cardTitle}
            </Typography>
            <Typography sx={{ mb: 5, mr: 6 }}>
              {props.props.cardBody}
            </Typography>
            <Link underline="none" sx={{ float: "right", cursor: "pointer" }}>
              Перейти
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CardItems;
