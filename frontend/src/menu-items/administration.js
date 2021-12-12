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
