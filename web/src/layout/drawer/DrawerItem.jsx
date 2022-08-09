import React from 'react'

import { Grid, Link, Typography } from '@mui/material';

import '@fontsource/roboto/400.css';

import {GroupZero,GroupOne,GroupTwo,GroupThree,GroupFour,GroupFive} from '../../assets/Images/drawer';

const DrawerItem = () => {
    const items = [{
            img: <GroupZero/>,
            text: "Мониторинг",
            url: "/monitoring"
        },{
            img: <GroupOne/>,
            text: "Обслуживание",
            url: "/service"
        },{
            img: <GroupTwo/>,
            text: "Справочник отказов",
            url: "/failuredirectory"
        },{
            img: <GroupThree/>,
            text: "Журнал интеграций",
            url: "/log"
        },{
            img: <GroupFour/>,
            text: "Банк данных",
            url: "/database"
        },{
            img: <GroupFive/>,
            text: "Отчеты",
            url: "/reports"
        },
    ]
    return (
        <>
            {items.map((e,i)=>(
                <Grid key={i} item xs={12} sx={{ mx: 1, my:1, py:0.5, px:1, borderRadius:"3px", "&:hover":{backgroundColor:"#EBECF0", color:"#458BF3", fill:"#458BF3"}}}>
                    <Link href={`${e.url}`} variant="body2" underline='none' sx={{ fontFamily: "Roboto", color: "inherit"}}>
                        <Grid container flexWrap="nowrap">
                            {e.img}
                            <Typography sx={{ml: 2}}>
                                {e.text}
                            </Typography>
                        </Grid>
                    </Link>
                </Grid>
            ))}
        </>
    )
}

export default DrawerItem