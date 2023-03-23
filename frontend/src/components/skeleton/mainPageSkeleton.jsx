import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

const mainPageSkeleton = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.main",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        variant="rect"
        height={58}
        sx={{
          bgcolor: "primary.dark",
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Skeleton
          variant="circular"
          sx={{
            textAlign: "right",
            m: 1,
            backgroundColor: "success.secondary",
          }}
        >
          <Avatar />
        </Skeleton>
      </Box>
    </Box>
  );
};

export default mainPageSkeleton;
