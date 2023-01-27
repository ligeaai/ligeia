import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Breadcrumbs as MUIBreadcrumbs, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import history from "../../routers/history";

import { confirmationPushHistory } from "../../services/utils/historyPush";
import { setGoFunctionConfirmation } from "../../services/actions/confirmation/historyConfirmation";
const Breadcrumbs = () => {
  const dispatch = useDispatch();
  var pathnames = decodeURI(window.location.pathname)
    .split("/")
    .filter((x) => x);
  const { params } = useParams(); //  important for updating breadcrumb
  return (
    <MUIBreadcrumbs
      aria-label="breadcrumb"
      separator="\"
      sx={{
        ".MuiBreadcrumbs-separator": {
          mx: 0.5,
        },
      }}
    >
      <HomeIcon
        fontSize="small"
        sx={{
          position: "relative",
          top: "3px",
          cursor: "pointer",
          color: "icon.primary",
        }}
        onClick={() => {
          dispatch(setGoFunctionConfirmation(() => history.push("home")));
          dispatch(confirmationPushHistory());
        }}
      />

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        name = name.replace(/_/g, " ");
        name = name.replace(/%20/g, " ");
        return isLast ? (
          <Typography
            key={name}
            sx={{
              fontSize: "14px",
              color: "primary.main",
              cursor: "pointer",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {name}
          </Typography>
        ) : (
          <Typography
            key={name}
            onClick={() => {
              dispatch(setGoFunctionConfirmation(() => history.push(routeTo)));
              dispatch(confirmationPushHistory());
            }}
            sx={{
              fontSize: "14px",
              color: "text.primary",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {name}
          </Typography>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
