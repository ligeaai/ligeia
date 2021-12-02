import {  useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Typography
} from '@mui/material';

import User1 from '../../../../assets/images/users/user-round.svg';


const ProfileSection = () => {
    const theme = useTheme();


    const anchorRef = useRef(null);




    return (
        <>
            <Typography>John Doe</Typography>

            <Typography style={{ display: "inline-block" }}></Typography>
            <Avatar
                src={User1}
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
