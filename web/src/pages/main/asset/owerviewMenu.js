import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CircleIcon from '@mui/icons-material/Circle';
import React from "react";

export const menu = [
    {
        id: "1",
        title: "Area",
        url: ["Owerview", "Area"],
        items: [{
            id: "2",
            title: "CAT-1",
            url: ["Owerview", "Area", "CAT-1"],
            items: [
                {
                    icon: <CircleIcon fontSize='small' color="error" />,
                    title: "151/1",
                    url: ["Owerview", "Area", "CAT-1", "151/1"],
                    id: "3",
                    // children: [{
                    //     id: "4",
                    //     title: "CAT-1",
                    //     url: ["Owerview", "Area", "CAT-1"],
                    //     children: [
                    //         {
                    //             id: "5",
                    //             icon: <CircleIcon fontSize='small' color="error" />,
                    //             title: "151/1",
                    //             url: ["Owerview", "Area", "CAT-1", "151/1"],
                    //         },
                    //         {
                    //             id: "6",
                    //             icon: <CircleIcon fontSize='small' color="success" />,
                    //             url: ["Owerview", "Area", "CAT-1", "GA-315VSD/1"],
                    //             title: "GA-315VSD/1"

                    //         }
                    //     ]
                    // },
                    // {
                    //     id: "7",
                    //     title: "CAT-2",
                    //     url: ["Owerview", "Area", "CAT-2"],
                    //     children: [
                    //         {
                    //             id: "8",
                    //             icon: <CircleIcon fontSize='small' color="success" />,
                    //             url: ["Owerview", "Area", "CAT-1", "151/1"],
                    //             title: "151/1"
                    //         },
                    //         {
                    //             id: "9",
                    //             icon: <CircleIcon fontSize='small' color="error" />,
                    //             url: ["Owerview", "Area", "CAT-1", "GA-315VSD/2"],
                    //             title: "GA-315VSD/2"
                    //         }
                    //     ]
                    // },
                    // {
                    //     id: "11",
                    //     title: "OPZ",
                    //     url: ["Owerview", "Area", "OPZ"],
                    //     children: [
                    //         {
                    //             id: "12",
                    //             icon: <CircleIcon fontSize='small' color="warning" />,
                    //             url: ["Owerview", "Area", "CAT-1", "P-2A"],
                    //             title: "P-2A"
                    //         },
                    //         {
                    //             id: "13",
                    //             icon: <CircleIcon fontSize='small' color="warning" />,
                    //             url: ["Owerview", "Area", "CAT-1", "CD 230/1"],
                    //             title: "CD 230/1"
                    //         }
                    //     ]
                    // },
                    // ]
                },
                {
                    id: "14",
                    icon: <CircleIcon fontSize='small' color="success" />,
                    url: ["Owerview", "Area", "CAT-1", "GA-315VSD/1"],
                    title: "GA-315VSD/1"
                }
            ]
        },
        {
            id: "15",
            title: "CAT-2",
            url: ["Owerview", "Area", "CAT-2"],
            items: [
                {
                    id: "16",
                    icon: <CircleIcon fontSize='small' color="success" />,
                    url: ["Owerview", "Area", "CAT-1", "151/1"],
                    title: "151/1"
                },
                {
                    id: "17",
                    icon: <CircleIcon fontSize='small' color="error" />,
                    url: ["Owerview", "Area", "CAT-1", "GA-315VSD/2"],
                    title: "GA-315VSD/2"
                }
            ]
        },
        {
            id: "18",
            title: "OPZ",
            url: ["Owerview", "Area", "OPZ"],
            items: [
                {
                    id: "21",
                    icon: <CircleIcon fontSize='small' color="warning" />,
                    url: ["Owerview", "Area", "CAT-1", "P-2A"],
                    title: "P-2A"
                },
                {
                    id: "22",
                    icon: <CircleIcon fontSize='small' color="warning" />,
                    url: ["Owerview", "Area", "CAT-1", "CD 230/1"],
                    title: "CD 230/1"
                }
            ]
        },
        ]
    },
];


// export const menu = [
//     {
//         id: "1",
//         name: "Seasons",
//         children: [
//             {
//                 id: "2",
//                 name: "Summer",
//                 children: [
//                     {
//                         id: "3",
//                         name: "June"
//                     },
//                     {
//                         id: "4",
//                         name: "July"
//                     },
//                     {
//                         id: "5",
//                         name: "August"
//                     }
//                 ]
//             },
//             {
//                 id: "6",
//                 name: "Fall",
//                 children: [
//                     {
//                         id: "7",
//                         name: "September"
//                     },
//                     {
//                         id: "8",
//                         name: "October"
//                     },
//                     {
//                         id: "12",
//                         name: "November"
//                     }
//                 ]
//             },
//             {
//                 id: "11",
//                 name: "Winter",
//                 children: [
//                     {
//                         id: "13",
//                         name: "December"
//                     },
//                     {
//                         id: "14",
//                         name: "January"
//                     },
//                     {
//                         id: "15",
//                         name: "February"
//                     }
//                 ]
//             },
//             {
//                 id: "16",
//                 name: "Spring",
//                 children: [
//                     {
//                         id: "17",
//                         name: "March"
//                     },
//                     {
//                         id: "22",
//                         name: "April"
//                     },
//                     {
//                         id: "32",
//                         name: "May"
//                     }
//                 ]
//             }
//         ]
//     }
// ];
