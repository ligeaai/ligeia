import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import {Box, Grid} from '@mui/material'

export default function AddCodeList() {
    const [open, setOpen] = React.useState(false);
    const [codeList,setCodeList] = React.useState([{
        LISTTYPE : "",
        CULTURE : "",
        CODE : "",
        CODETEXT : "",
        PARENT : "",
        LEGACYCODE : "",
        VAL1 : "",
        VAL2 : "",
        VAL3 : "",
        VAL4 : "",
        VAL5 : "",
        VAL6 : "",
        VAL7 : "",
        VAL8 : "",
        VAL9 : "",
        VAL10 : "",
        DATE1 : "",
        DATE2 : "",
        DATE3 : "",
        DATE4 : "",
        DATE5 : "",
        CHAR1 : "",
        CHAR2 : "",
        CHAR3 : "",
        CHAR4 : "",
        CHAR5 : "",
        LAYER_NAME : "",
        DESCRIPTION_ID : "",  
        HIDDEN : "",
        LAST_UPDT_USER : "",
        LAST_UPDT_DATE : "",
        VERSION : "",
        DB_ID : "",
        ROW_ID : "",
        STATUS : "",
        REV_GRP_ID : "",


    }])
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{m:2.5}}>
        <Button variant="outlined" onClick={handleClickOpen}>
            Add a code list
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add a code list</DialogTitle>
            <DialogContent>
                <Grid container>

                </Grid>
            <TextField
                autoFocus
                margin="dense"
                id="LISTTYPE"
                name = "LISTTYPE"
                value={codeList[0].LISTTYPE}
                label="LISTTYPE"
                fullWidth
                variant="standard"
                onChange={(e)=>{
                    console.log(e.target.name);
                    codeList[0].LISTTYPE = e.target.value
                    setCodeList([...codeList])
                }}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Add a code list</Button>
            </DialogActions>
        </Dialog>
        </Box>
    );
}
