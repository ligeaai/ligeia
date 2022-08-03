import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import StorageIcon from '@mui/icons-material/Storage';

export default function SwipeableTemporaryDrawer() {
    const [state, setState] = React.useState({
        drawer: false
    });

    const toggleDrawer =
        (anchor, open) =>
            (event) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event).key === 'Tab' ||
                        (event).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={toggleDrawer('drawer', false)}>
                        <ListItemText primary={"back"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                {['Code list editor'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <>
                <Button onClick={toggleDrawer('drawer', true)}><StorageIcon /></Button>
                <SwipeableDrawer
                    open={state['drawer']}
                    onOpen={toggleDrawer('drawer', true)}
                >
                    {list()}
                </SwipeableDrawer>
            </>
        </div>
    );
}
