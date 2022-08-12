import React from "react";

import { Box, Grid, Typography, Link } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

import LangSelector from "../../components/LangSelector";
import langPicker from "./LangPicker";
const Footer = () => {
  const text = langPicker();
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0",
        backgroundColor: "#ffffff",
        width: "100%",
        py: 1,
      }}
    >
      <Grid
        container
        alignItems="center"
        sx={{
          typography: {
            xs: { justifyContent: "center" },
            sm: {
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            },
          },
        }}
      >
        <Grid item>
          <Grid>
            {[
              text.footer.nav1,
              text.footer.nav2,
              text.footer.nav3,
              text.footer.nav4,
            ].map((e, i) => (
              <Link href="#" key={i} sx={{ textDecoration: "none", mr: 2.5 }}>
                <Typography
                  sx={{
                    display: "inline",
                    typography: {
                      xs: { fontSize: "12px" },
                      sm: { fontsize: "20px" },
                    },
                  }}
                >
                  {e}
                </Typography>
              </Link>
            ))}
          </Grid>
        </Grid>
        <Grid item sx={{ ml: 3.5 }}>
          <Grid
            container
            alignItems="center"
            sx={{ typography: { xs: { justifyContent: "space-between" } } }}
          >
            <Grid item>
              <Grid container alignItems="center">
                <CopyrightIcon
                  sx={{
                    typography: {
                      xs: { fontSize: "12px" },
                      sm: { fontsize: "20px" },
                    },
                    mr: 0.5,
                  }}
                />
                <Typography
                  sx={{
                    typography: {
                      xs: { fontSize: "12px" },
                      sm: { fontsize: "20px" },
                    },
                  }}
                >
                  {text.footer.text}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{
                typography: {
                  xs: { display: "inline-block" },
                  sm: { display: "none" },
                },
              }}
            >
              <LangSelector />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
