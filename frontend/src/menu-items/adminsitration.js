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
            id: 'add-entity',
            title: 'Add entity',
            type: 'item',
            url: '/administration/add-entity',
            // icon: icons.IconBrandChrome,
            breadcrumbs: true
        },
    ]
};

export default administration;
