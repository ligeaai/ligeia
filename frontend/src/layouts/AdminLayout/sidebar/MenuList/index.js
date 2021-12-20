<<<<<<< HEAD
import NavGroup from './NavGroup';
import menuItem from '../../../../menu-items/';


const MenuList = () => {
    const navItems = menuItem.items.map((item) => {

        return <NavGroup key={item.id} item={item} />;

    });

    return <>{navItems}</>;
};

=======
// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from '../../../../menu-items/';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const navItems = menuItem.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

>>>>>>> a0d7b77f029b977fd804aed91e17ffad3b5bf592
export default MenuList;