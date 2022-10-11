import React from "react";
import { Breadcrumbs as MUIBreadcrumbs, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import history from "../../routers/history";

const Breadcrumbs = () => {
  const pathnames = window.location.pathname.split("/").filter((x) => x);
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
        // const isLast = index === pathnames.length - 1;
        return (
          //  isLast ? (
          //   <Typography key={name}>{name}</Typography>
          // ) : (
          <Typography
            key={name}
            onClick={() => history.push(routeTo)}
            sx={{
              typography: "caption",
              color: "text.secondary",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {name}
          </Typography>
          // );
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
