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
        height={50}
        sx={{
          bgcolor: "primary.main",
          display: "flex",
        }}
      >
        <Skeleton
          variant="circular"
          sx={{
            m: 1,
            backgroundColor: "success.secondary",
          }}
        >
          <Avatar />
        </Skeleton>
      </Box>
      <Box
        variant="rect"
        width={248}
        sx={{
          m: 1,
          minHeight: "calc(100vh - 60px - 8px)",
          backgroundColor: "success.secondary",
          borderRadius: "5px",
          p: 1,
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((e) => (
          <Skeleton
            width={e > 4 && e % 5 === 0 ? "80%" : "90%"}
            sx={{
              margin: "auto",
              backgroundColor: "primary.main",
            }}
          >
            <Typography>.</Typography>
          </Skeleton>
        ))}
      </Box>
    </Box>
  );
};

export default mainPageSkeleton;
