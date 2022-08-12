import React from "react";

import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const body = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        p: 2.5,
        transform: "translate(-50%,-50%)",
        borderRadius: "10px",
        typography: {
          xs: {
            width: "100%",
            boxSizing: "border-box",
            backgroundColor: "transparent",
            boxShadow: "none",
          },
          sm: {
            width: "550px",
            boxShadow: "0px 4px 20px rgba(194, 194, 194, 0.25)",
            backgroundColor: "#ffffff",
          },
        },
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" sx={{ mb: 2.5 }}>
            Password recovery
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "300", mb: 3 }}>
            How would you like to receive a password reset code?
          </Typography>
          <FormControl sx={{ display: "block" }}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            >
              <FormControlLabel
                value="mail"
                control={<Radio />}
                label={
                  <div>
                    <Typography variant="body2" sx={{ fontWeight: "300" }}>
                      Send code to email address
                    </Typography>
                  </div>
                }
              />
              <Typography
                variant="body2"
                sx={{ fontWeight: "300", mb: 2.5, ml: 4 }}
              >
                ***@******
              </Typography>
              <FormControlLabel
                value="number"
                control={<Radio />}
                label={
                  <div>
                    <Typography variant="body2" sx={{ fontWeight: "300" }}>
                      Send code by SMS
                    </Typography>
                  </div>
                }
              />
              <Typography
                variant="body2"
                sx={{ fontWeight: "300", mb: 4, ml: 4 }}
              >
                +77787787777
              </Typography>
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              mb: 3,
              typography: {
                xs: {
                  display: "block",
                },
                sm: {
                  display: "none",
                },
              },
            }}
          >
            Next
          </Button>
          <Box
            sx={{
              width: 1,
              typography: {
                xs: {
                  textAlign: "center",
                },
                sm: {
                  textAlign: "left",
                },
              },
            }}
          >
            <Link
              variant="caption"
              xs={{
                display: "block",
                textDecoration: "none",
              }}
            >
              No more access?
            </Link>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            position: "relative",
            typography: {
              xs: {
                display: "none",
              },
              sm: {
                display: "inline-block",
              },
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              textAlign: "center",
            }}
          >
            <Avatar src="/broken-image.jpg" sx={{ display: "inline-block" }} />
            <Typography variant="body2" sx={{ fontWeight: "300" }}>
              +77787787777
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "300" }}>
              System adminstrator
            </Typography>
          </Box>
        </Grid>
        <Button
          variant="contained"
          sx={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
            padding: "9px 52px",
            typography: {
              xs: {
                display: "none",
              },
              sm: {
                display: "inline-block",
              },
            },
          }}
        >
          Next
        </Button>
      </Grid>
    </Box>
  );
};

export default body;
