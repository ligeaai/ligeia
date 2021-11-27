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
            url: '/administration/companys',
            // icon: icons.IconBrandChrome,
            breadcrumbs: true,
            children: [
                {
                    id: "company-add",
                    title: "Company add",
                    type: "item",
                    url: "/administration/companys/add",
                    target: true
                }
            ]
        },
        {
            id: 'batterys',
            title: 'Batterys',
            type: 'item',
            url: "/administration/batterys",
            children: [{
                id: "battery-add",
                title: "Battery add",
                type: "item",
                url: "/administration/batterys/add"
            }]
        },
        {
            id: 'fields',
            title: "Fields",
            type: "item",
            url: "/administration/fields",
            children: [{
                id: "field-add",
                title: "Field add",
                type: "item",
                url: "/administration/fields/add"
            }]
        },
        {
            id: 'type-batterys',
            title: "Type batterys",
            type: "item",
            url: "/administration/type-batterys",
            children: [{
                id: "type-batterys-add",
                title: "Type batterys add",
                type: "item",
                url: "/administration/type-batterys/add"
            }]
        },
        {
            id: 'type-products',
            title: "Type products",
            type: "item",
            url: "/administration/type-products",
            children: [{
                id: "type-products-add",
                title: "Type products add",
                type: "item",
                url: "/administration/type-products/add"
            }]
        },
        {
            id: 'type-pumps',
            title: "Type pumps",
            type: "item",
            url: "/administration/type-pumps",
            children: [{
                id: "type-pumps-add",
                title: "Type pumps add",
                type: "item",
                url: "/administration/type-pumps/add"
            }]
        },
        {
            id: 'type-status',
            title: "Type status",
            type: "item",
            url: "/administration/type-status",
            children: [{
                id: "type-status-add",
                title: "Type status add",
                type: "item",
                url: "/administration/type-status/add"
            }]
        }
    ]
};

export default administration;
