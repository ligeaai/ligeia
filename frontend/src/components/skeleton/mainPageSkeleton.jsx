import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
      {/* <Skeleton
        variant="rect"
        width={248}
        sx={{
          m: 1,
          minHeight: "calc(100vh - 60px - 20px)",
          backgroundColor: "success.secondary",
          borderRadius: "5px",
          display: "inline-block",
        }}
      ></Skeleton>
      <Skeleton
        variant="rect"
        width={248}
        sx={{
          m: 1,
          minHeight: "calc(100vh - 60px - 20px)",
          backgroundColor: "success.secondary",
          borderRadius: "5px",
          display: "inline-block",
        }}
      ></Skeleton>
      <Skeleton
        variant="rect"
        sx={{
          m: 1,
          minHeight: "calc(100vh - 60px - 20px)",
          backgroundColor: "status.main",
          borderRadius: "5px",
          display: "inline-block",
          width: "calc(100% - 248px - 248px - 48px)",
        }}
      ></Skeleton> */}
    </Box>
  );
};

export default mainPageSkeleton;
