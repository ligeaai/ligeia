import { useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
    Avatar,
    Typography
} from '@mui/material';


const ProfileSection = () => {

    const theme = useTheme()
    const anchorRef = useRef(null);
    const { user: currentUser } = useSelector((state) => state.authReducer);

    if (!currentUser) {
        return <Navigate to="/" />;
    }


    return (
        <>
            <Typography variant="h5">{currentUser.user.email}</Typography>

            <Typography style={{ display: "inline-block" }}></Typography>
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


        </>
    );
};

export default ProfileSection;
