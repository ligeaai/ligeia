import React from "react";
import { useSelector } from "react-redux";

import { Grid, Link, Typography } from "@mui/material";
import "@fontsource/roboto/400.css";

import history from "../../routers/history";

const DrawerItem = (props) => {
  const drawer = useSelector((state) => state.drawer);
  const { items } = props;
  console.log(items);
  return (
    <React.Fragment>
      {items.map((e, i) => (
        <Grid
          key={i}
          item
          xs={12}
          sx={{
            padding: "13px",
            borderRadius: "5px",
            mx: 1.5,
            backgroundColor: "primary.contrastText",
            cursor: "ponter",
            "&:hover": {
              opacity: "0.8",
            },
          }}
          onClick={() => {
            history.push(`${e.url}`);
          }}
        >
          <Link
            variant="body2"
            underline="none"
            sx={{ color: "#42526E", cursor: "pointer" }}
          >
            <Grid container flexWrap="nowrap">
              {e.img}
              <Typography
                sx={{
                  display: `${drawer.display}`,
                  marginLeft: "16px",
                  width: "180px",
                  fontWeight: "700",
                  fontSize: "16px",
                }}
              >
                {e.text}
              </Typography>
            </Grid>
          </Link>
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default DrawerItem;
