import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Grid, Link, Typography } from "@mui/material";
import "@fontsource/roboto/400.css";

import history from "../../routers/history";
import { setActive } from "../../services/reducers/drawerReducer";

const DrawerItem = (props) => {
  const dispatch = useDispatch();
  const drawer = useSelector((state) => state.drawer);
  const { items } = props;
  return (
    <React.Fragment>
      {items.map((e, i) => (
        <Button
          key={i}
          xs={12}
          sx={{
            borderRadius: "5px",
            mx: 1.5,
            cursor: "ponter",
            paddingY: "13px",
            textAlign: "start",
            "&:hover": {
              backgroundColor:
                drawer.isActive === i ? "action.active" : "action.hover",
              opacity: "action.hoverOpacity",
            },
            backgroundColor: drawer.isActive === i ? "action.active" : "auto",
          }}
          onClick={() => {
            dispatch(setActive(i));
            history.push(`${e.url}`);
          }}
        >
          <Box sx={{ paddingX: "13px" }}>
            <Grid
              container
              flexWrap="nowrap"
              color={drawer.isActive === i ? "myReverseText" : "text.primary"}
            >
              {e.img}
              <Typography
                sx={{
                  display: `${drawer.display}`,
                  marginLeft: "16px",
                  fontWeight: "700",
                  width: "165px",
                  fontSize: "16px",
                  textTransform: "capitalize",
                }}
              >
                {e.text}
              </Typography>
            </Grid>
          </Box>
        </Button>
      ))}
    </React.Fragment>
  );
};

export default DrawerItem;
