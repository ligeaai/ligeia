import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "../../routers/history";

import { Avatar, Button, Grid, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import { toggleDrawer } from "../../services/reducers/drawerReducer";

import logo from "../../assets/Images/header/Group 1.png";
import menuIcon from "../../assets/Images/header/Menu.png";

import { logout } from "../../services/actions/auth";
import styles from "../../assets/Styles/layout/headers/header";

const useStyles = makeStyles(styles);
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
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      className={classes.box}
    >
      <Grid item>
        <Grid
          container
          spacing={2}
          className={classes.boxItem}
          alignItems="center"
        >
          <Grid item className={classes.cursorPointer}>
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
              <Link href="/" className={classes.colorInherit}>
                <img src={logo} alt="" />
              </Link>
            </Mobil>
          </Grid>
        </Grid>
      </Grid>
      <Pc>
        <Grid item>
          <Link href="/" className={classes.colorInherit}>
            <img src={logo} alt="" />
          </Link>
        </Grid>
      </Pc>
      <Grid item>
        <Grid container alignItems="center">
          <Mobil>
            <Grid container alignItems="center">
              <Grid item>
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
              <Grid item>
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
              className={classes.avatar}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
