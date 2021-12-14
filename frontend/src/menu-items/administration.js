
const administration = {
    id: 'adminstration',
    title: 'administration',
    type: 'group',
    children: [
        // {
        //     id: 'companys',
        //     title: 'Companys',
        //     type: 'collapse',
        //     url: '/administration/companies',
        //     // icon: icons.IconBrandChrome,
        //     breadcrumbs: true,
        //     children: [
        //         {
        //             id: "company-add",
        //             title: "Company add",
        //             type: "item",
        //             url: "/administration/companies/add",
        //             target: true
        //         },
        //     ],
        // },
        {
            id: "models",
            title: "Administration",
            type: "collapse",
            children: [
                {
                    id: "companys",
                    title: "Companys",
                    type: "item",
                    url: "/administration/companies",

                },
                {
                    id: "batterys",
                    title: "Batterys",
                    type: "item"
                },
                {
                    id: "fields",
                    title: "Fields",
                    type: "item"
                }
            ]
        }

    ]
};

export default administration;
