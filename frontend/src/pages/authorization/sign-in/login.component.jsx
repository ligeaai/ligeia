import React, {Component} from "react";
import {connect} from "react-redux";
import styles from "./signinStyle";
import {Link} from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {Box} from "@mui/system";
import {withStyles} from "@mui/styles";
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
import {login} from "../../../redux/actions/loginActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  onLoginClick = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.login(userData);
  };
  render() {
    const {classes} = this.props;
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
              <Typography
                fontSize={16}
                fontWeight={"Regular"}
                marginTop={"20px"}
              >
                Enter your credentials to access your account.
              </Typography>
            </Grid>
            <Box>
              <TextField
                required
                type="text"
                name="username"
                label="Enter your username"
                value={this.state.username}
                onChange={this.onChange}
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
                required
                name="password"
                label="Enter your password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
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
              />{" "}
              <Button
                onClick={this.onLoginClick}
                variant="contained"
                className={classes.customButton}
              >
                <Typography className={classes.buttonTypography}>
                  Sign In
                </Typography>
              </Button>{" "}
            </Box>
          </Paper>
          <Typography fontSize={16} fontWeight={"Regular"}>
            Dont have an account ? <> </>
            <Link to="/sign-up" className={classes.customLink}>
              Register Now
            </Link>
          </Typography>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => {
    dispatch(login(username, password));
  },
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);

// class SignIn extends Component {
//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         this.props.onAuth(values.userName, values.password);
//         this.props.history.push('/');
//       }
//     });
//   }

//   render() {
//     let errorMessage = null;
//     if (this.props.error) {
//         errorMessage = (
//             <p>{this.props.error.message}</p>
//         );
//     }

//     const { getFieldDecorator } = this.props.form;
//     return (
//       <div>
//         SiGN IN
//       </div>
//     )
//   }
// }

// export default SignIn
