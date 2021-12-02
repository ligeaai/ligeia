import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from '../../../config';
import Logo from '../../../assets/Logo.png';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        <img src={Logo} alt="logo" style={{ width: "50px" }} />
    </ButtonBase>
);

export default LogoSection;
