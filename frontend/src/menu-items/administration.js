
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
                    type: "collapse",
                    url: "/administration/companies",
                    children: [
                        {
                            id: "fields",
                            title: "Fields",
                            type: "collapse",
                            children: [{
                                id: "batterys",
                                title: "Batterys",
                                type: "item"
                            },]
                        }]
                },

            ]
        }

    ]
};

export default administration;
