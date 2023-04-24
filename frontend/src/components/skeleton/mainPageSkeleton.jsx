import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import "../../assets/styles/layouts/skeleton.scss";
const mainPageSkeleton = () => {
  return (
    <Box className="skeleton-container">
      <Box variant="rect" height={58} className="skeleton-container__header">
        <Skeleton
          variant="circular"
          className="skeleton-container__header__avatar"
        >
          <Avatar />
        </Skeleton>
      </Box>
    </Box>
  );
};

export default mainPageSkeleton;
