import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "../../routers/history";

import { Avatar, Button, Grid, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

import { toggleDrawer } from "../../services/reducers/drawerReducer";

import logo from "../../assets/Images/header/Group 1.png";
import menuIcon from "../../assets/Images/header/Menu.png";

import { logout } from "../../services/actions/auth";

const Mobil = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Pc = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{
        borderBottom: 1,
        borderColor: "#E4E4E4",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Grid item>
        <Grid container spacing={2} sx={{ ml: 2 }} alignItems="center">
          <Grid
            item
            sx={{
              cursor: "pointer",
            }}
          >
            <img
              src={menuIcon}
              alt=""
              onClick={() => {
                dispatch(toggleDrawer());
              }}
            />
          </Grid>
          <Grid item>
            <Mobil>
              <Link href="/" sx={{ color: "inherit" }}>
                <img src={logo} alt="" />
              </Link>
            </Mobil>
          </Grid>
        </Grid>
      </Grid>
      <Pc>
        <Grid item>
          <Link href="/" sx={{ color: "inherit" }}>
            <img src={logo} alt="" />
          </Link>
        </Grid>
      </Pc>
      <Grid item>
        <Grid container alignItems="center">
          <Mobil>
            <Grid container alignItems="center">
              <Grid item id="txt">
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(logout());
                  }}
                >
                  logout
                </Button>
              </Grid>
              <Grid item id="txt">
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/changepass");
                  }}
                >
                  Change Pass
                </Button>
              </Grid>
            </Grid>
          </Mobil>
          <Grid item>
            <Avatar
              alt={user ? user.first_name.concat(" ", user.last_name) : "name"}
              src="/"
              sx={{
                my: 1,
                mr: 3,
                ml: 1,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
