import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useSelector } from "react-redux";
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Checkbox,
    Button,
} from "@mui/material";
import { Box } from '@mui/system';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.background.success,
        color: theme.palette.text.primary,
        fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function BasicMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [menuItems, setMenuItems] = React.useState([]);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectItem = (item) => {
        props.onItemSelected(item.LAYER_NAME);
        handleClose();
    };



    React.useEffect(() => {
        fetch('http://34.125.126.30:8000/api/v1/layer/layer-dropdown/')
            .then(response => response.json())
            .then(data => {
                setMenuItems(data);
            });
    }, []);

    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Layer Name
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {menuItems.map(item => (
                    <MenuItem key={item.id} onClick={() => handleSelectItem(item)}>
                        {item.LAYER_NAME}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}





function UserManagament() {


    const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);


    const handleUserSelection = (user) => {
        if (selectedUsers.includes(user)) {
            setSelectedUsers(
                selectedUsers.filter((selectedUser) => selectedUser !== user)
            );
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    function handleItemSelected(itemId) {
        console.log(`Seçilen öğe: ${itemId}`);
    }





    //     fetch('http://34.125.126.30:8001/api/v1/auth/user/layer/update', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     layerName: ''
    //   })
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data);
    // })
    // .catch(error => {
    //   console.error(error);
    // });



    useEffect(() => {
        fetch("http://34.125.126.30:8000/api/v1/auth/user-list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers(
                    data.map((user) => {
                        return { ...user, layerName: "" };
                    })
                );
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <Box sx={{
            width: `100%`,
            minHeight: isFullScreen
                ? "calc(500px - 60px  )"
                : "calc(500px - 74px  )",
            height: isFullScreen
                ? "calc(100vh - 60px )"
                : "calc(108vh - 60px - 74px )",
            button: { color: "text.secondary" },
            m: 0.5,

            border: "0.5px solid",
            borderColor: "background.main",
            borderRadius: "5px",
            overflowY: "scroll",
        }}>
            <Grid container sx={{ position: "relative" }}>
                <TableContainer component={Paper} sx={{ paddingBottom: "64px" }}>
                    <Grid item xs={12}>
                        <Table sx={{ minWidth: '100%' }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Full Name</TableCell>
                                    <TableCell align="right">E-mail Adress</TableCell>
                                    <TableCell align="right">Date Joined</TableCell>
                                    <TableCell align="right">Permissions</TableCell>
                                    <TableCell align="right">
                                        <BasicMenu onItemSelected={handleItemSelected}></BasicMenu>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {user.first_name}  {user.last_name}
                                        </TableCell>
                                        <TableCell align="right">{user.email}</TableCell>
                                        <TableCell align="right">{user.date_joined}</TableCell>
                                        <TableCell align="right">{user.permissions}</TableCell>
                                        <TableCell align="right">
                                            {user.layer_name}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Checkbox
                                                checked={selectedUsers.includes(user)}
                                                onChange={() => handleUserSelection(user)}
                                            />
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item container justifyContent="flex-end" spacing={2} sx={{ position: "absolute", bottom: "16px", right: "16px" }}>
                        <Grid item>
                            <Button
                                variant="contained"
                                sx={{
                                    color: "text.main",
                                    backgroundColor: "background.success",
                                    "&:hover": {
                                        backgroundColor: "hover.success",
                                        color: "text.main",
                                    },
                                }}
                            >
                                Save
                            </Button>

                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                sx={{
                                    color: "primary.light",
                                    backgroundColor: "primary.dark",
                                    "&:hover": {
                                        backgroundColor: "text.info",
                                        color: "primary.light",
                                    },
                                }}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </TableContainer>
            </Grid>
        </Box>
    );
}

export default React.memo(UserManagament);