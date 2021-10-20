import React from "react";
import styles from "./signinStyle";
import {Link} from "react-router-dom";
import Logo from "../../../assets/Logo.png";

//material ui components
import {makeStyles} from "@mui/styles";
import {
  Grid,
  Typography,
  InputAdornment,
  Paper,
  TextField,
  Button,
} from "@mui/material";

//material ui icons
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";

const useStyles = makeStyles(styles);
export default function SignIn() {
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
        <img src={Logo} alt="logo" className="Logo" />
        <Paper className={classes.paper}>
          <Grid item align="center">
            <Typography fontSize={24} fontWeight={"Medium"}>
              Welcome Back
            </Typography>
            <Typography fontSize={16} fontWeight={"Regular"} marginTop={"20px"}>
              Enter your credentials to access your account.
            </Typography>
          </Grid>
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
            label="Enter your password"
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
              Sign In
            </Typography>
          </Button>
        </Paper>
        <Typography fontSize={16} fontWeight={"Regular"}>
          Dont have an account ? <> </>
          <Link to="/signup" className={classes.customLink}>
            Register Now
          </Link>
        </Typography>
      </Grid>
    </div>
  );
}
