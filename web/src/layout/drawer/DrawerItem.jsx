import React from "react";
import { useSelector } from "react-redux";

import { Grid, Link, Typography } from "@mui/material";
import "@fontsource/roboto/400.css";
import { makeStyles } from "@mui/styles";

import history from "../../routers/history";

import {
  GroupZero,
  GroupOne,
  GroupTwo,
  GroupThree,
  GroupFour,
  GroupFive,
} from "../../assets/Images/drawer";
import styles from "../../assets/Styles/layout/drawer/drawerItem";

const useStyles = makeStyles(styles);

const DrawerItem = () => {
  const classes = useStyles();
  const drawer = useSelector((state) => state.drawer);
  const items = [
    {
      img: <GroupZero />,
      text: "Мониторинг",
      url: "/monitoring",
    },
    {
      img: <GroupOne />,
      text: "Обслуживание",
      url: "/service",
    },
    {
      img: <GroupTwo />,
      text: "Справочник отказов",
      url: "/failuredirectory",
    },
    {
      img: <GroupThree />,
      text: "Журнал интеграций",
      url: "/log",
    },
    {
      img: <GroupFour />,
      text: "Банк данных",
      url: "/database",
    },
    {
      img: <GroupFive />,
      text: "Отчеты",
      url: "/reports",
    },
  ];
  return (
    <>
      {items.map((e, i) => (
        <Grid key={i} item xs={12} className={classes.box}>
          <Link
            variant="body2"
            underline="none"
            className={classes.link}
            onClick={() => {
              history.push(`${e.url}`);
            }}
          >
            <Grid container flexWrap="nowrap">
              {e.img}
              <Typography
                className={classes.typography}
                sx={{ display: `${drawer.display}` }}
              >
                {e.text}
              </Typography>
            </Grid>
          </Link>
        </Grid>
      ))}
    </>
  );
};

export default DrawerItem;
