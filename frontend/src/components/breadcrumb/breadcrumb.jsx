import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Breadcrumbs as MUIBreadcrumbs, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import history from "../../routers/history";
import { confirmationPushHistory } from "../../services/utils/historyPush";
import { setGoFunctionConfirmation } from "../../services/actions/confirmation/historyConfirmation";

const Breadcrumbs = () => {
  const dispatch = useDispatch();
  const pathnames = decodeURI(window.location.pathname)
    .split("/")
    .filter((x) => x);

  const handleClick = (routeTo) => {
    dispatch(setGoFunctionConfirmation(() => history.push(routeTo)));
    dispatch(confirmationPushHistory());
  };
  const { params } = useParams(); //  important for updating breadcrumb
  return (
    <MUIBreadcrumbs
      aria-label="breadcrumb"
      separator="\"
      sx={{ ".MuiBreadcrumbs-separator": { mx: 0.5 } }}
    >
      <HomeIcon
        fontSize="small"
        sx={{
          position: "relative",
          top: "3px",
          cursor: "pointer",
          color: "icon.primary",
        }}
        onClick={() => handleClick("/home")}
      />

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        name = name.replace(/_/g, " ").replace(/%20/g, " ");
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
            onClick={() => handleClick(routeTo)}
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
