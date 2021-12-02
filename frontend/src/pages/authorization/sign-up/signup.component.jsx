import React, {Component} from "react";
import {connect} from "react-redux";
import styles from "./signupStyles";
import Logo from "../../../assets/Logo.png";
import * as actions from "../../../redux/actions/authActions";
//material ui components
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import {withStyles} from "@mui/styles";
import {Link} from "react-router-dom";

//material ui icons
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import {Box} from "@mui/system";

class SignUp extends Component {
  

  render() {
    const {classes} = this.props;
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        сlassName={classes.container}
      >
        <Link to="/auth/sign-in">
          <img src={Logo} alt="logo" className={classes.Logo} />
        </Link>
        <Paper className={classes.paper}>
          <Grid item align="center">
            <Typography fontSize={24} fontWeight={"Medium"}>
              Registration
            </Typography>
            <Box onSubmit={this.handleSubmit}>
              <Typography
                fontSize={16}
                fontWeight={"Regular"}
                marginTop={"20px"}
              >
                Write your personal information
              </Typography>
              <TextField
                id="username"
                label="Enter your username"
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
                id="email"
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
                id="password1"
                label="Create password"
                type="password"
                onBlur={this.handleConfirmBlur}
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
                id="password2"
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
            </Box>
          </Grid>
        </Paper>
        <Typography fontSize={16}>
          Forgor your password ?{" "}
          <Link to="#" className={classes.customLink}>
            Reset Password
          </Link>
        </Typography>
      </Grid>
    );
  }
}

export default SignUp