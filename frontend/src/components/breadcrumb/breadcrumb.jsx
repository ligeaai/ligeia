import React from "react";
import { useParams } from "react-router-dom";
import { Breadcrumbs as MUIBreadcrumbs, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import history from "../../routers/history";

const Breadcrumbs = () => {
  var pathnames = window.location.pathname.split("/").filter((x) => x);
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
        sx={{ position: "relative", top: "3px", cursor: "pointer" }}
        onClick={() => history.push("/home")}
      />

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        name = name.replace(/_/g, " ");
        return isLast ? (
          <Typography
            key={name}
            sx={{
              fontSize: "12px",
              color: "#4B4B4B",
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
            onClick={() => history.push(routeTo)}
            sx={{
              fontSize: "12px",
              color: "myBoldText",
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
