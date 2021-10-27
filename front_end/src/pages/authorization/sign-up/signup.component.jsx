import React from "react";
import styles from "./signupStyles";
import Logo from "../../../assets/Logo.png";

//material ui components
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";

//material ui icons
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";

const useStyles = makeStyles(styles);

export default function SignUp() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        сlassName={classes.container}
      >
        <img src={Logo} alt="logo" />
        <Paper className={classes.paper}>
          <Grid item align="center">
            <Typography fontSize={24} fontWeight={"Medium"}>
              Registration
            </Typography>
            <Typography fontSize={16} fontWeight={"Regular"} marginTop={"20px"}>
              Write your personal information
            </Typography>
            <TextField
              id="input-with-icon-textfield"
              label="Enter your email address"
              style={{marginTop: "30px"}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon style={{color: "#458bf3"}} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="input-with-icon-textfield"
              label="Create password"
              type="password"
              style={{marginTop: "20px"}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon style={{color: "#458bf3"}} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="input-with-icon-textfield"
              label="Repeate password"
              type="password"
              style={{marginTop: "20px"}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon style={{color: "#458bf3"}} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.customButton}
            >
              <Typography className={classes.buttonTypography}>
                Sign Up
              </Typography>
            </Button>
          </Grid>
        </Paper>
        <Typography fontSize={16}>
          Forgor your password ?{" "}
          <Link to="#" className={classes.customLink}>
            Reset Password
          </Link>
        </Typography>
      </Grid>
    </div>
  );
}
