import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    width: "5rem",
    height: "3.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    cursor: "pointer",
    color: "text.primary",
    border: 1,
  },
});

const SocialButton = (props) => {
  const { Logo } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Logo fontSize="h4" />
    </Box>
  );
};

export default SocialButton;

// import React from "react";

// import { Box } from "@mui/material";

// const socialButton = (props) => {
//   const { Logo } = props;
//   return (
//     <Box
//       sx={{
//         width: "5rem",
//         height: "3.5rem",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: "8px",
//         cursor: "pointer",
//         color: "text.primary",
//         border: 1,
//       }}
//     >
//       <Logo sx={{ typography: "h4" }} />
//     </Box>
//   );
// };

// export default socialButton;
