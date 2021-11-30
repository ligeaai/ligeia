// import React, {Component} from "react";
// import {connect} from "react-redux";
// import styles from "./signinStyle";
// import {Link} from "react-router-dom";
// import Logo from "../../../assets/Logo.png";
// import {withRouter} from "react-router-dom";
// import PropTypes from "prop-types";
// import {Box} from "@mui/system";
// import {withStyles} from "@mui/styles";
// import {
//   Grid,
//   Typography,
//   InputAdornment,
//   Paper,
//   TextField,
//   Button,
// } from "@mui/material";

// //material ui icons
// import MailIcon from "@mui/icons-material/Mail";
// import LockIcon from "@mui/icons-material/Lock";

// class Login extends Component {
//   render() {
//     const {classes} = this.props;
//     return (
//       <div className={classes.wrapper}>
//         <Grid
//           container
//           alignItems="center"
//           justifyContent="center"
//           direction="column"
//           сlassName={classes.container}
//         >
//           <img src={Logo} alt="logo" className="Logo" />
//           <Paper className={classes.paper}>
//             <Grid item align="center">
//               <Typography fontSize={24} fontWeight={"Medium"}>
//                 Welcome Back
//               </Typography>
//               <Typography
//                 fontSize={16}
//                 fontWeight={"Regular"}
//                 marginTop={"20px"}
//               >
//                 Enter your credentials to access your account.
//               </Typography>
//             </Grid>
//             <Box>
//               <TextField
//                 required
//                 type="text"

//                 label="Enter your username"
//                 style={{marginTop: "30px"}}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <MailIcon style={{color: "#458bf3"}} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 variant="outlined"
//                 fullWidth
//               />
//               <TextField
//                 required

//                 label="Enter your password"
//                 type="password"
//                 style={{marginTop: "20px"}}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon style={{color: "#458bf3"}} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 variant="outlined"
//                 fullWidth
//               />{" "}
//               <Button variant="contained" className={classes.customButton}>
//                 <Typography className={classes.buttonTypography}>
//                   Sign In
//                 </Typography>
//               </Button>{" "}
//             </Box>
//           </Paper>
//           <Typography fontSize={16} fontWeight={"Regular"}>
//             Dont have an account ? <> </>
//             <Link to="/sign-up" className={classes.customLink}>
//               Register Now
//             </Link>
//           </Typography>
//         </Grid>
//       </div>
//     );
//   }
// }

// export default withStyles(styles)(Login);

// import React, {Component} from "react";
// import {compose} from "redux";
// import {connect} from "react-redux";
// import {reduxForm} from "redux-form";
// import * as actions from "../../../redux/actions//authActions";

// class Signin extends Component {
//   constructor(props) {
//     super(props);

//     this.renderAlert = this.renderAlert.bind(this);
//   }
//   handleFormSubmit({username, password}) {
//     // Need to do something to log user in
//     this.props.signinUser({username, password});
//   }

//   renderAlert() {
//     const {errorMessage} = this.props;
//     if (errorMessage) {
//       return (
//         <div className="alert alert-danger">
//           <strong>Oops!</strong> {errorMessage}
//         </div>
//       );
//     }
//   }

//   render() {
//     const {
//       handleSubmit,
//       fields: {username, password},
//     } = this.props;
//     return (
//       <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
//         <fieldset className="form-group">
//           <label>Username:</label>
//           <input {...username} className="form-control" />
//         </fieldset>
//         <fieldset className="form-group">
//           <label>Password:</label>
//           <input {...password} type="password" className="form-control" />
//         </fieldset>
//         {this.renderAlert()}
//         <button action="submit" className="btn btn-primary">
//           Sign in
//         </button>
//       </form>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     errorMessage: state.auth.error,
//   };
// };

// export default compose(
//   connect(mapStateToProps, actions),
//   reduxForm({
//     form: "signin",
//     fields: ["username", "password"],
//   })
// )(Signin);

import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {login} from "../../../redux/actions/authActions";

export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = (e) => this.setState({[e.target.name]: e.target.value});

  render() {
 
    const {username, password} = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login})(Login);
