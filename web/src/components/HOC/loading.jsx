import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = (props) => {
  const { Element } = props;
  const loader = useSelector((state) => state.loader.loader);
  return (
    <React.Fragment>
      {loader ? (
        <Box
          sx={{
            width: "100%",
            minHeight: "100%",
            height: document.body.scrollHeight,
            backdropFilter: "blur(1.5px)",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#ffffff",
            zIndex: 999999,
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <React.Fragment></React.Fragment>
      )}
      {Element}
    </React.Fragment>
  );
};

export default Loading;
