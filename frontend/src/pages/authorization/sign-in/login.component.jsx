// // import React, {Component} from "react";
// // import {connect} from "react-redux";
// // import styles from "./signinStyle";
// // import {Link} from "react-router-dom";
// // import Logo from "../../../assets/Logo.png";
// // import {withRouter} from "react-router-dom";
// // import PropTypes from "prop-types";
// // import {Box} from "@mui/system";
// // import {withStyles} from "@mui/styles";
// // import {
// //   Grid,
// //   Typography,
// //   InputAdornment,
// //   Paper,
// //   TextField,
// //   Button,
// // } from "@mui/material";

// // //material ui icons
// // import MailIcon from "@mui/icons-material/Mail";
// // import LockIcon from "@mui/icons-material/Lock";

// // class Login extends Component {
// //   render() {
// //     const {classes} = this.props;
// //     return (
// //       <div className={classes.wrapper}>
// //         <Grid
// //           container
// //           alignItems="center"
// //           justifyContent="center"
// //           direction="column"
// //           сlassName={classes.container}
// //         >
// //           <img src={Logo} alt="logo" className="Logo" />
// //           <Paper className={classes.paper}>
// //             <Grid item align="center">
// //               <Typography fontSize={24} fontWeight={"Medium"}>
// //                 Welcome Back
// //               </Typography>
// //               <Typography
// //                 fontSize={16}
// //                 fontWeight={"Regular"}
// //                 marginTop={"20px"}
// //               >
// //                 Enter your credentials to access your account.
// //               </Typography>
// //             </Grid>
// //             <Box>
// //               <TextField
// //                 required
// //                 type="text"

// //                 label="Enter your username"
// //                 style={{marginTop: "30px"}}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <InputAdornment position="start">
// //                       <MailIcon style={{color: "#458bf3"}} />
// //                     </InputAdornment>
// //                   ),
// //                 }}
// //                 variant="outlined"
// //                 fullWidth
// //               />
// //               <TextField
// //                 required

// //                 label="Enter your password"
// //                 type="password"
// //                 style={{marginTop: "20px"}}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <InputAdornment position="start">
// //                       <LockIcon style={{color: "#458bf3"}} />
// //                     </InputAdornment>
// //                   ),
// //                 }}
// //                 variant="outlined"
// //                 fullWidth
// //               />{" "}
// //               <Button variant="contained" className={classes.customButton}>
// //                 <Typography className={classes.buttonTypography}>
// //                   Sign In
// //                 </Typography>
// //               </Button>{" "}
// //             </Box>
// //           </Paper>
// //           <Typography fontSize={16} fontWeight={"Regular"}>
// //             Dont have an account ? <> </>
// //             <Link to="/sign-up" className={classes.customLink}>
// //               Register Now
// //             </Link>
// //           </Typography>
// //         </Grid>
// //       </div>
// //     );
// //   }
// // }

// // export default withStyles(styles)(Login);

// // import React, {Component} from "react";
// // import {compose} from "redux";
// // import {connect} from "react-redux";
// // import {reduxForm} from "redux-form";
// // import * as actions from "../../../redux/actions//authActions";

// // class Signin extends Component {
// //   constructor(props) {
// //     super(props);

// //     this.renderAlert = this.renderAlert.bind(this);
// //   }
// //   handleFormSubmit({username, password}) {
// //     // Need to do something to log user in
// //     this.props.signinUser({username, password});
// //   }

// //   renderAlert() {
// //     const {errorMessage} = this.props;
// //     if (errorMessage) {
// //       return (
// //         <div className="alert alert-danger">
// //           <strong>Oops!</strong> {errorMessage}
// //         </div>
// //       );
// //     }
// //   }

// //   render() {
// //     const {
// //       handleSubmit,
// //       fields: {username, password},
// //     } = this.props;
// //     return (
// //       <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
// //         <fieldset className="form-group">
// //           <label>Username:</label>
// //           <input {...username} className="form-control" />
// //         </fieldset>
// //         <fieldset className="form-group">
// //           <label>Password:</label>
// //           <input {...password} type="password" className="form-control" />
// //         </fieldset>
// //         {this.renderAlert()}
// //         <button action="submit" className="btn btn-primary">
// //           Sign in
// //         </button>
// //       </form>
// //     );
// //   }
// // }

// // const mapStateToProps = (state) => {
// //   return {
// //     errorMessage: state.auth.error,
// //   };
// // };

// // export default compose(
// //   connect(mapStateToProps, actions),
// //   reduxForm({
// //     form: "signin",
// //     fields: ["username", "password"],
// //   })
// // )(Signin);

// import {useState, useRef} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {Navigate} from "react-router-dom";
// import {login} from "../../../redux/actions/authActions";
// import {makeStyles} from "@mui/styles";
// import {
//   Grid,
//   Typography,
//   InputAdornment,
//   Paper,
//   TextField,
//   Button,
// } from "@mui/material";
// import MailIcon from "@mui/icons-material/Mail";
// import LockIcon from "@mui/icons-material/Lock";
// import styles from "./signinStyle";

// const useStyles = makeStyles(styles);

// const Login = (props) => {
//   const classes = useStyles();
//   const form = useRef();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const {isLoggedIn} = useSelector((state) => state.authReducer);

//   const dispatch = useDispatch();

//   const onChangeEmail = (e) => {
//     const email = e.target.value;
//     setEmail(email);
//   };

//   const onChangePassword = (e) => {
//     const password = e.target.value;
//     setPassword(password);
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     setLoading(true);

//     dispatch(login(email, password))
//       .then(() => {
//         props.history.push("/dashboard/default");
//         window.location.reload();
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };

//   if (isLoggedIn) {
//     return <Navigate to="/dashboard/default" />;
//   }

//   return (
//     <div className="col-md-12">
//       <Grid
//         container
//         alignItems="center"
//         justifyContent="center"
//         direction="column"
//         сlassName={classes.container}
//       >
//         <form onSubmit={handleLogin} ref={form}>
//           <TextField
//             type="text"
//             name="email"
//             value={email}
//             onChange={onChangeEmail}
//             label="Enter your email address"
//             style={{marginTop: "30px"}}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <MailIcon style={{color: "#458bf3"}} />
//                 </InputAdornment>
//               ),
//             }}
//             variant="outlined"
//             fullWidth
//           />
//           <label htmlFor="email">Email</label>

//           <TextField
//             type="password"
//             className="form-control"
//             name="password"
//             value={password}
//             onChange={onChangePassword}
//             label="Enter your password"
//             style={{marginTop: "20px"}}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <LockIcon style={{color: "#458bf3"}} />
//                 </InputAdornment>
//               ),
//             }}
//             variant="outlined"
//             fullWidth
//           />
//           <div className="form-group">
//             <button className="btn btn-primary btn-block" disabled={loading}>
//               {loading && (
//                 <span className="spinner-border spinner-border-sm"></span>
//               )}
//               <span>Login</span>
//             </button>
//           </div>
//         </form>
//       </Grid>
//     </div>
//   );
// };

// export default Login;
