import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";

import { toggleDrawerMenu } from "../../services/actions/drawerMenu/drawerMenu";
import AlertIcon from "./alert/alarmsIcon";
import SettingMenu from "./settingsMenu";

const DrawerIcon = () => {
  const dispatch = useDispatch();
  const drawerIsOpen = useSelector((state) => state.drawerMenu.isOpen);
  return (
    <Grid item>
      <IconButton>
        {!drawerIsOpen ? (
          <MenuIcon
            sx={{
              typography: "h4",
              color: "primary.main",
            }}
            onClick={() => {
              dispatch(toggleDrawerMenu());
            }}
          />
        ) : (
          <MenuOpenOutlinedIcon
            sx={{
              typography: "h4",
              color: "primary.main",
            }}
            onClick={() => {
              dispatch(toggleDrawerMenu());
            }}
          />
        )}
      </IconButton>
    </Grid>
  );
};

const Header = (props) => {
  const search = useSelector((state) => state.searchBar.isFocus);
  const MyBox = styled(Grid)(({ theme }) => {
    return {
      backgroundColor: theme.palette.primary.dark, // this
      alignItems: "center",
      justifyContent: "space-between",
      padding: "13px 21px",
      height: "59px",
      borderBottom: "1px solid rgba(0,0,0,0.3)",
    };
  });

  return (
    <React.Fragment>
      <MyBox
        container
        sx={{
          display: {
            xs: search ? "flex" : "none",
            md: "none",
          },
        }}
      ></MyBox>
      <MyBox
        sx={{
          display: {
            xs: search ? "none" : "flex",
            md: "flex",
          },
        }}
      >
        <Grid item>
          <Grid container spacing={2.5} alignItems="center">
            <Grid item>
              <DrawerIcon />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container columnSpacing={2} sx={{ alignItems: "center" }}>
            <AlertIcon />
            <SettingMenu />
          </Grid>
        </Grid>
      </MyBox>
    </React.Fragment>
  );
};

export default React.memo(Header);
