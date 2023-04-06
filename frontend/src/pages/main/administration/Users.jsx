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
    IconButton,
    Popover,
} from "@mui/material";
import { Box } from '@mui/system';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import { config } from '../../../services/baseApi';


function AddLayerName(props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [menuItems, setMenuItems] = React.useState([]);
    const [selectedItems, setSelectedItems] = React.useState([]);


    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };



    const handleSelectItem = (item) => {
        const itemName = item.LAYER_NAME;

        if (selectedItems.includes(itemName)) {
            setSelectedItems(selectedItems.filter((i) => i !== itemName));
        } else {
            setSelectedItems([...selectedItems, itemName]);
        }
    };


    // console.log(selectedItems);
    // console.log("************************///////////");


    const handleAddItems = () => {
        console.log("-----------------------------*");
        console.log(props);

        try {
            const body = JSON.stringify({ users: [{ ...props.user, layer_name: selectedItems }] });
            console.log(body);


            fetch("http://34.125.126.30:8001/api/v1/auth/user/layer/update", {
                method: "POST",
                headers: {
                    ...config().headers,
                },
                body: body,
            })
                .then((response) => response.json())
                .then((data) => {
                    setSelectedItems(data);
                    handleClose();
                })
                .catch((error) => {
                    console.error("Error updating selected items: ", error);
                });



            console.log(JSON.stringify(selectedItems));

        } catch (error) {
            console.log(error);
        }

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
            <IconButton id="demo-positioned-button"
                onClick={handleOpen}>
                <AddIcon />
            </IconButton>
            {isOpen &&
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "lightGray",
                    zIndex: 1,
                    borderRadius: "5px",
                    boxShadow: "0 0 10px rgba(0,0,0,.5)",
                    padding: "10px",
                    height: "25vw",
                    width: "50vw",

                }}>
                    {menuItems.map((item) => (
                        <MenuItem key={item.id} onClick={() => handleSelectItem(item)}>
                            <Checkbox checked={selectedItems.includes(item.LAYER_NAME)} />
                            {item.LAYER_NAME}
                        </MenuItem>
                    ))}

                    <Button
                        variant="contained"
                        sx={{
                            color: "text.main",
                            backgroundColor: "background.success",
                            "&:hover": {
                                backgroundColor: "hover.success",
                                color: "primary.dark",
                            },
                            fontSize: "1vw"

                        }}
                        onClick={handleAddItems}

                    >
                        Add
                    </Button>
                </div>
            }
        </div>
    );
}

function AddPermission(props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const roleMenuItems = ["employee", "admin", "super admin"];
    const [selectedItems, setSelectedItems] = React.useState("");


    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };


    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const handleSelectItem = (index) => {
        if (selectedIndex === index) {
            // Clicked the same item again, so deselect it
            setSelectedIndex(-1);
            setSelectedItems("");
        } else {
            // Clicked a different item, so select it
            setSelectedIndex(index);
            setSelectedItems(roleMenuItems[index]);
        }
    };




    // console.log(selectedItems);
    // console.log("************************///////////");


    const handleAddItems = () => {
        const updatedUser = {
            is_superuser: false,
            is_admin: false,
            is_employee: false
        };

        if (selectedItems === "super admin") {
            updatedUser.is_superuser = true;
        } else if (selectedItems === "admin") {
            updatedUser.is_admin = true;
        } else if (selectedItems === "employee") {
            updatedUser.is_employee = true;
        }

        const body = JSON.stringify({ users: [{ ...props.user, ...updatedUser }], user_permissions: selectedItems });
        console.log(body);

        try {
            fetch("http://34.125.126.30:8001/api/v1/auth/user/roles/update", {
                method: "POST",
                headers: {
                    ...config().headers,
                },
                body: body,
            })
                .then((response) => response.json())
                .then((data) => {
                    setSelectedItems(data);
                    handleClose();
                })
                .catch((error) => {
                    console.error("Error updating selected items: ", error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <IconButton id="demo-positioned-button"
                onClick={handleOpen}>
                <AddIcon />
            </IconButton>
            {isOpen &&
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "lightGray",
                    zIndex: 1,
                    borderRadius: "5px",
                    boxShadow: "0 0 10px rgba(0,0,0,.5)",
                    padding: "10px",
                    height: "25vw",
                    width: "50vw",

                }}>
                    {roleMenuItems.map((item, index) => (
                        <MenuItem key={index} onClick={() => handleSelectItem(index)}>
                            <Checkbox checked={selectedIndex === index} />
                            {item}
                        </MenuItem>
                    ))}

                    <Button
                        variant="contained"
                        sx={{
                            color: "text.main",
                            backgroundColor: "background.success",
                            "&:hover": {
                                backgroundColor: "hover.success",
                                color: "primary.dark",
                            },
                            fontSize: "1vw"

                        }}
                        onClick={handleAddItems}

                    >
                        Add
                    </Button>
                </div>
            }
        </div>
    );

}


function UserManagament() {


    const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);


    const handleClose = () => {
        setAnchorEl(null);
    };

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
                        return { ...user };
                    })
                );
            })
            .catch((error) => console.error(error));
    }, []);

    const open = Boolean(anchorEl);

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
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right">Layer Name</TableCell>

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
                                        <TableCell align="right">{user.user_permissions}</TableCell>
                                        <TableCell align="right">
                                            <AddPermission
                                                user={user}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            {user.layer_name.map(e => `${e} `)}
                                        </TableCell>
                                        <TableCell align="right">
                                            <AddLayerName
                                                user={user}
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
                                    color: "primary.light",
                                    backgroundColor: "primary.dark",
                                    "&:hover": {
                                        backgroundColor: "text.info",
                                        color: "primary.light",
                                    },
                                }}
                            >
                                ADD USER
                            </Button>
                        </Grid>
                    </Grid>
                </TableContainer>
            </Grid>
        </Box>
    );
}

export default React.memo(UserManagament);