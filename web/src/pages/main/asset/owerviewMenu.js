import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CircleIcon from '@mui/icons-material/Circle';
import React from "react";

export const menu = [
    {
        title: "Area",
        url: ["Owerview", "Area"],
        items: [{
            title: "CAT-1",
            url: ["Owerview", "Area", "CAT-1"],
            items: [
                {
                    icon: <CircleIcon fontSize='small' color="error" />,
                    title: "151/1",
                    url: ["Owerview", "Area", "CAT-1", "151/1"],
                    items: [{
                        title: "CAT-1",
                        url: ["Owerview", "Area", "CAT-1"],
                        items: [
                            {
                                icon: <CircleIcon fontSize='small' color="error" />,
                                title: "151/1",
                                url: ["Owerview", "Area", "CAT-1", "151/1"],
                            },
                            {
                                icon: <CircleIcon fontSize='small' color="success" />,
                                url: ["Owerview", "Area", "CAT-1", "GA-315VSD/1"],
                                title: "GA-315VSD/1"

                            }
                        ]
                    },
                    {
                        title: "CAT-2",
                        url: ["Owerview", "Area", "CAT-2"],
                        items: [
                            {
                                icon: <CircleIcon fontSize='small' color="success" />,
                                url: ["Owerview", "Area", "CAT-1", "151/1"],
                                title: "151/1"
                            },
                            {
                                icon: <CircleIcon fontSize='small' color="error" />,
                                url: ["Owerview", "Area", "CAT-1", "GA-315VSD/2"],
                                title: "GA-315VSD/2"
                            }
                        ]
                    },
                    {
                        title: "OPZ",
                        url: ["Owerview", "Area", "OPZ"],
                        items: [
                            {
                                icon: <CircleIcon fontSize='small' color="warning" />,
                                url: ["Owerview", "Area", "CAT-1", "P-2A"],
                                title: "P-2A"
                            },
                            {
                                icon: <CircleIcon fontSize='small' color="warning" />,
                                url: ["Owerview", "Area", "CAT-1", "CD 230/1"],
                                title: "CD 230/1"
                            }
                        ]
                    },
                    ]
                },
                {
                    icon: <CircleIcon fontSize='small' color="success" />,
                    url: ["Owerview", "Area", "CAT-1", "GA-315VSD/1"],
                    title: "GA-315VSD/1"
                }
            ]
        },
        {
            title: "CAT-2",
            url: ["Owerview", "Area", "CAT-2"],
            items: [
                {
                    icon: <CircleIcon fontSize='small' color="success" />,
                    url: ["Owerview", "Area", "CAT-1", "151/1"],
                    title: "151/1"
                },
                {
                    icon: <CircleIcon fontSize='small' color="error" />,
                    url: ["Owerview", "Area", "CAT-1", "GA-315VSD/2"],
                    title: "GA-315VSD/2"
                }
            ]
        },
        {
            title: "OPZ",
            url: ["Owerview", "Area", "OPZ"],
            items: [
                {
                    icon: <CircleIcon fontSize='small' color="warning" />,
                    url: ["Owerview", "Area", "CAT-1", "P-2A"],
                    title: "P-2A"
                },
                {
                    icon: <CircleIcon fontSize='small' color="warning" />,
                    url: ["Owerview", "Area", "CAT-1", "CD 230/1"],
                    title: "CD 230/1"
                }
            ]
        },
        ]
    },
];
