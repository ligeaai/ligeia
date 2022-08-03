import React from 'react'
import { useSelector } from 'react-redux'

import { Grid, Link, Typography } from '@mui/material';


import GroupZero from '../../assets/Images/drawer/GroupZero.jsx';
import GroupOne from '../../assets/Images/drawer/GroupOne.jsx';
import GroupTwo from '../../assets/Images/drawer/GroupTwo.jsx';
import GroupThree from '../../assets/Images/drawer/GroupThree.jsx';
import GroupFour from '../../assets/Images/drawer/GroupFour.jsx';
import GroupFive from '../../assets/Images/drawer/GroupFive.jsx';

import '@fontsource/roboto/400.css';


const Drawer = () => {
    const drawer = useSelector((state) => state.drawer);
    const imgs = [<GroupZero/>,<GroupOne/>,<GroupTwo/>,<GroupThree/>,<GroupFour/>,<GroupFive/>]
        return (
            <Grid container sx={{
                paddingTop: "17px !important",
                backgroundColor: "#FAFBFC",
                width: `${drawer.width}`,
                minHeight: "calc(100vh - 57px)",
                alignContent: "flex-start",
                overflow:"hidden",
                transition: ".2s"
            }}>
                {["Мониторинг","Обслуживание","Справочник отказов","Журнал интеграций","Банк данных","Отчеты"].map((e,i)=>(
                    <Grid key={i} item xs={12} sx={{ mx: 1, my:1, py:0.5, px:1, borderRadius:"3px", "&:hover":{backgroundColor:"#EBECF0", color:"#458BF3", fill:"#458BF3"}}}>
                        <Link href='#' variant="body2" underline='none' sx={{ fontFamily: "Roboto", color: "inherit"}}>
                            <Grid container>
                                {imgs[i]}
                                <Typography sx={{ml: 2}}>
                                    {e}
                                </Typography>
                            </Grid>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        )


}

export default Drawer