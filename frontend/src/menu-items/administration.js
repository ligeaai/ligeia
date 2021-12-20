<<<<<<< HEAD
import InventoryIcon from '@mui/icons-material/Inventory';
import LabelImportantRoundedIcon from '@mui/icons-material/LabelImportantRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
const icons = {
    InventoryIcon,
    ArrowRightRoundedIcon
};


const administration = {
    id: 'configuration',
    title: 'Configuration',
    type: 'group',
    children: [{
        id: "objects",
        title: "Objects",
        type: "collapse",
        icon: icons.ArrowRightRoundedIcon,
        children: [{
            id: "сompanys",
            title: "Companys",
            type: "item",
            url: "/configuration/companies",
        }, {
            id: "batterys",
            title: "Batterys",
            type: "item",
        }, {
            id: "fields",
            title: "Fields",
            type: "item",
        }]
    }, {
        id: "dictionaries",
        title: "Dictionaries",
        type: "collapse",
        icon: icons.ArrowRightRoundedIcon,
    }]
};

export default administration;
=======
// // assets
// import { IconBrandChrome, IconHelp } from '@tabler/icons';

// // constant
// const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const administration = {
    id: 'adminstration',
    title: 'administration',
    type: 'group',
    children: [
        {
            id: 'companys',
            title: 'Companys',
            type: 'item',
            url: '/administration/companies',
            // icon: icons.IconBrandChrome,
            breadcrumbs: true,
            children: [
                {
                    id: "company-add",
                    title: "Company add",
                    type: "item",
                    url: "/administration/companies/add",
                    target: true
                }
            ]
        },

    ]
};

export default administration;
>>>>>>> a0d7b77f029b977fd804aed91e17ffad3b5bf592
