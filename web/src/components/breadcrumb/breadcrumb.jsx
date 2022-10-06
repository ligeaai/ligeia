import React from "react";
import { Breadcrumbs as MUIBreadcrumbs, Typography } from "@mui/material";

import history from "../../routers/history";

const Breadcrumbs = () => {
  const pathnames = window.location.pathname.split("/").filter((x) => x);
  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
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
              typography: "body2",
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
