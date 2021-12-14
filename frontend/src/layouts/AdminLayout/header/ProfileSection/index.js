
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from '@mui/material/styles';
import { Navigate } from "react-router-dom";
import {
    Avatar,
    Typography,
    Button,
    Popover
} from '@mui/material';
import { logout } from "../../../../redux/actions/authActions";
import { clearMessage } from "../../../../redux/actions/messageActions";
import { history } from "../../../../services/history";
import { Link } from "react-router-dom";


const ProfileSection = () => {
    const { user: currentUser } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    const theme = useTheme()
    const anchorRef = useRef(null);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    if (!currentUser) {
        return <Navigate to="/" />;
    }



    return (
        <>
            <Typography variant="h5">{currentUser.user.email}</Typography>

            <Button onClick={handleClick}>
                <Avatar
                    sx={{
                        ...theme.typography.mediumAvatar,
                        margin: '8px 0 8px 8px !important',
                        cursor: 'pointer'
                    }}
                    ref={anchorRef}
                    aria-haspopup="true"
                    color="inherit"
                />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}

            >
                <Button onClick={logOut}><Typography sx={{ p: 2 }}>Logout</Typography></Button>
                <Button >  <Link to={'/profile/' + currentUser.user.id}><Typography sx={{ p: 2 }}>Profile</Typography></Link></Button>

            </Popover>


        </>
    );
};

export default ProfileSection;
