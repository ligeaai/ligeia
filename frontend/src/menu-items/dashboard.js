<<<<<<< HEAD
// assets
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
// constant
const icons = { GridViewRoundedIcon, AnalyticsOutlinedIcon };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Monitoring',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.GridViewRoundedIcon,
            breadcrumbs: false
        },
        {
            id: 'analytics',
            title: 'Analytics',
            type: 'item',
            url: '/dashboard/analytics',
            icon: icons.AnalyticsOutlinedIcon,
            breadcrumbs: false
        },

    ]
};

export default dashboard;
=======
// assets
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
// constant
const icons = { GridViewRoundedIcon, AnalyticsOutlinedIcon };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Monitoring',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.GridViewRoundedIcon,
            breadcrumbs: true
        },
        {
            id: 'analytics',
            title: 'Analytics',
            type: 'item',
            url: '/dashboard/analytics',
            icon: icons.AnalyticsOutlinedIcon,
            breadcrumbs: true
        }
    ]
};

export default dashboard;
>>>>>>> a0d7b77f029b977fd804aed91e17ffad3b5bf592
