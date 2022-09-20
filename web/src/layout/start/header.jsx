import React from "react";

import {
  Box,
  Button,
  Grid,
  Link,
  Menu,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import LanguageIcon from "@mui/icons-material/Language";
import history from "../../routers/history";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/Images/header/logo1.png";

import SearchInput from "../../components/searchInput/SearchInput";
import SearchMobil from "../../components/searchInput/SearchMobil";
const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = React.useState(false);
  const [menu, setMenu] = React.useState("none");
  const [open, setOpen] = React.useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false, //language selector
  ]);

  const handleClick = (event, key) => {
    setAnchorEl(event.currentTarget);
    open[key] = true;
    setOpen(open);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen([false, false, false, false, false, false, false]);
  };
  const onFocus = () => {
    setSearch(true);
  };
  var myObject = {
    Product: ["Product 1", "Product 2"],
    Learn: ["Learn 1", "Learn 2", "Learn 3", "Learn 4"],
    Stories: ["Stories 1", "Stories 2", "Stories 3"],
    Company: ["Company 1", "Company 2"],
    Partners: ["Partners 1", "Partners 2", "Partners 3", "Partners 4"],
    Contact: ["Contact 1", "Contact 2"],
  };
  return (
    <Grid
      sx={{
        py: 3,
        px: { xs: 2, lg: 4, xl: 6 },
        height: "100px",
      }}
    >
      <Grid
        container
        sx={{
          display: {
            xs: search ? "flex" : "none",
            md: "none",
          },
        }}
        onBlur={() => {
          setSearch(false);
        }}
      >
        <SearchMobil />
      </Grid>
      <Grid
        container
        sx={{
          display: {
            xs: search ? "none" : "flex",
            md: "flex",
          },
          justifyContent: "space-between",
        }}
      >
        <Grid item>
          <Grid
            container
            sx={{
              color: "#ffffff",
            }}
          >
            <Grid item>
              <MenuIcon
                sx={{
                  mr: 2,
                  color: "#ffffff",
                  fontSize: "40px",
                  cursor: "pointer",
                  display: { sx: "flex", md: "none" },
                }}
                onClick={() => {
                  setMenu(menu === "none" ? "flex" : "none");
                }}
              />
            </Grid>
            <Grid
              item
              sx={{
                zIndex: "4",
              }}
            >
              <img src={logo} alt="logo" />
            </Grid>
            <Grid item>
              <Grid
                container
                sx={{
                  borderRadius: "10px",

                  ml: 2,
                  typography: {
                    xs: {
                      display: `${menu}`,
                      boxShadow: "0px 0px 4px 1.2px #888888",
                      padding: "10px",
                      flexDirection: "column",
                      top: "80px",
                      left: "0px",

                      backgroundColor: "#0000008A",
                      position: "absolute",
                      width: "max-content",
                    },
                    md: {
                      display: "flex",
                      boxShadow: "none",
                      padding: "0px",
                      top: "0px",
                      flexDirection: "row",
                      backgroundColor: "inherit",
                      position: "relative",
                      width: "auto",
                    },
                  },
                }}
              >
                {Object.keys(myObject).map((e, key) => {
                  return (
                    <Grid
                      key={key}
                      item
                      sx={{ cursor: "pointer", zIndex: "3", color: "#ffffff" }}
                    >
                      <Button
                        sx={{
                          color: "#ffffff",
                          fontSize: { md: "12px", lg: "17px", xl: "19px" },
                        }}
                        id="basic-button"
                        aria-controls={open[key] ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open[key] ? "true" : undefined}
                        onClick={(e) => {
                          handleClick(e, key);
                        }}
                      >
                        {e}
                        <KeyboardArrowDownIcon
                          sx={{
                            color: "white",
                            fontSize: { md: "16px", lg: "20px", xl: "22px" },
                          }}
                        />
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open[key]}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        {myObject[e].map((value, myKey) => (
                          <MenuItem
                            key={value}
                            sx={{
                              fontSize: { md: "12px", lg: "17px", xl: "19px" },
                            }}
                            onClick={handleClose}
                          >
                            {value}
                          </MenuItem>
                        ))}
                      </Menu>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            spacing={1.5}
            sx={{
              alignItems: "center",
              color: "#ffffff",
            }}
          >
            <Grid
              item
              onClick={() => {
                setSearch(true);
              }}
              onBlur={() => {
                console.log("sads");
                setSearch(false);
              }}
            >
              <SearchInput />
            </Grid>
            <Grid item>
              <Link
                underline="none"
                sx={{
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: { md: "12px", lg: "17px", xl: "19px" },
                }}
                onClick={() => history.push("login")}
              >
                Sign in
              </Link>
            </Grid>
            <Grid item>
              <Button
                sx={{
                  color: "#ffffff",
                }}
                id="basic-button"
                aria-controls={open[6] ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open[6] ? "true" : undefined}
                onClick={(e) => {
                  handleClick(e, 6);
                }}
              >
                <LanguageIcon
                  sx={{ width: { md: "21px", lg: "27px", xl: "30px" } }}
                />
                <KeyboardArrowDownIcon
                  sx={{ fontSize: { md: "15px", lg: "21px", xl: "24" } }}
                />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open[6]}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Language 1</MenuItem>
                <MenuItem onClick={handleClose}>Language 2</MenuItem>
                <MenuItem onClick={handleClose}>Language 3</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
