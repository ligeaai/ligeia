<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';

import useScriptRef from '../../../hooks/useScriptRef';
import Google from '../../../assets/images/icons/social-google.svg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { register } from '../../../redux/actions/authActions'




const Register = ({ ...others }, props) => {
    const form = useRef();
    const checkBtn = useRef();
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);


    const dispatch = useDispatch();

    const onChangeFirstName = (e) => {
        const first_name = e.target.value;
        setFirstName(first_name);
    };

    const onChangeLastName = (e) => {
        const last_name = e.target.value;
        setLastName(last_name);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setSuccessful(false);


        dispatch(register(first_name, last_name, email, password))
            .then(() => {
                setSuccessful(true);
                window.location.replace("/")
            })
            .catch(() => {
                setSuccessful(false);
                alert("Bad request!")
            });

    };

    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const googleHandler = async () => {
        console.error('Register');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };





    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>

                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={googleHandler}
                        size="large"
                        sx={{
                            color: 'grey.700',
                            backgroundColor: theme.palette.grey[50],
                            borderColor: theme.palette.grey[100]
                        }}
                    >
                        <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                            <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                        </Box>
                        Sign up with Google
                    </Button>

                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${customization.borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            OR
                        </Button>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                validationSchema={Yup.object().shape({
                    first_name: Yup.string().max(255).required('First name is required'),
                    last_name: Yup.string().max(255).required('Last name is required'),
                    email: Yup.string().email('Must be a valid email').max(100).required('Email is required'),
                    password: Yup.string().max(30).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}>
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleRegister} ref={form} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>

                                <TextField
                                    fullWidth
                                    label="First Name"
                                    margin="normal"
                                    name="first_name"
                                    type="text"
                                    value={first_name}
                                    onBlur={handleBlur}
                                    onChange={onChangeFirstName}
                                    error={Boolean(touched.first_name && errors.first_name)}
                                    sx={{ ...theme.typography.customInput }}
                                />
                                {touched.first_name && errors.first_name && (
                                    <FormHelperText error id="standard-weight-helper-text--register">
                                        {errors.first_name}
                                    </FormHelperText>
                                )}

                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    margin="normal"
                                    name="last_name"
                                    type="text"
                                    value={last_name}
                                    onBlur={handleBlur}
                                    onChange={onChangeLastName}
                                    error={Boolean(touched.last_name && errors.last_name)}
                                    sx={{ ...theme.typography.customInput }}
                                />
                                {touched.last_name && errors.last_name && (
                                    <FormHelperText error id="standard-weight-helper-text--register">
                                        {errors.last_name}
                                    </FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="text"
                                value={email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={onChangeEmail}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={onChangePassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Box sx={{ mt: 2 }}>

                            <Button
                                disableElevation
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                style={{ color: "2196f3" }}
                            >
                                Sign up
                            </Button>

                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default Register;
=======
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';

import useScriptRef from '../../../hooks/useScriptRef';
import Google from '../../../assets/images/icons/social-google.svg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { register } from '../../../redux/actions/authActions'




const Register = ({ ...others }) => {

    const form = useRef();
    const checkBtn = useRef();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);


    const dispatch = useDispatch();

    const onChangeFirstName = (e) => {
        const first_name = e.target.value;
        setFirstName(first_name);
    };

    const onChangeLastName = (e) => {
        const last_name = e.target.value;
        setLastName(last_name);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        dispatch(register(first_name, last_name, email, password))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });

    };


    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const googleHandler = async () => {
        console.error('Register');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };





    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>

                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={googleHandler}
                        size="large"
                        sx={{
                            color: 'grey.700',
                            backgroundColor: theme.palette.grey[50],
                            borderColor: theme.palette.grey[100]
                        }}
                    >
                        <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                            <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                        </Box>
                        Sign up with Google
                    </Button>

                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${customization.borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            OR
                        </Button>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik>

                <form noValidate onSubmit={handleRegister} ref={form} {...others}>
                    <Grid container spacing={matchDownSM ? 0 : 2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                margin="normal"
                                name="first_name"
                                type="text"
                                value={first_name}
                                onChange={onChangeFirstName}
                                sx={{ ...theme.typography.customInput }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                margin="normal"
                                name="last_name"
                                type="text"
                                value={last_name}
                                onChange={onChangeLastName}
                                sx={{ ...theme.typography.customInput }}
                            />
                        </Grid>
                    </Grid>
                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-register"
                            type="text"
                            value={email}
                            name="email"

                            onChange={onChangeEmail}
                            inputProps={{}}
                        />

                    </FormControl>

                    <FormControl
                        fullWidth

                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-register"
                            type={showPassword ? 'text' : 'text'}
                            value={password}
                            name="password"
                            label="Password"
                            onChange={onChangePassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{}}
                        />

                    </FormControl>

                    {strength !== 0 && (
                        <FormControl fullWidth>
                            <Box sx={{ mb: 2 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Box
                                            style={{ backgroundColor: level?.color }}
                                            sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" fontSize="0.75rem">
                                            {level?.label}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </FormControl>
                    )}

                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label={
                                    <Typography variant="subtitle1">
                                        Agree with &nbsp;
                                        <Typography variant="subtitle1" component={Link} to="#">
                                            Terms & Condition.
                                        </Typography>
                                    </Typography>
                                }
                            />
                        </Grid>
                    </Grid>


                    <Box sx={{ mt: 2 }}>

                        <Button
                            disableElevation

                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            style={{ color: "2196f3" }}
                        >
                            Sign up
                        </Button>

                    </Box>
                </form>

            </Formik>
        </>
    );
};

export default Register;
>>>>>>> a0d7b77f029b977fd804aed91e17ffad3b5bf592
