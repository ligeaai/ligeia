// assets
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
// constant
const icons = { HomeIcon, AnalyticsOutlinedIcon };

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
            icon: icons.HomeIcon,
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
