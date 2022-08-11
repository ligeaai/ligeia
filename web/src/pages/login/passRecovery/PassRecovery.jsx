import React from "react";
import Header from "../Header";
import Body from "./Body";
import Footer from "../Footer";
import { Box } from "@mui/material";

const PassRecovery = () => {
  return (
    <Box sx={{ backgroundColor: "#F0F2F5", height: "100vh" }}>
      <Header />
      <Body />
      <Footer />
    </Box>
  );
};

export default PassRecovery;
