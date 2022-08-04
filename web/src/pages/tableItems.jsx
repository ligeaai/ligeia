import React, { useEffect,useState } from 'react'
import codelist from '../services/api/codelistapi';


import { TableCell, TableRow } from '@mui/material'

const TableItems = () => {
    const [temp,setTemp] = useState([])
    useEffect(()=>{
        codelist()
        .then((data)=>{
            setTemp(data.data)
        })
    },[])
  return (
    <>
        {console.log(temp)}
        {temp.map((data,i)=>(
        <TableRow key={i}>
            <TableCell />
            <TableCell>{data.LISTTYPE}</TableCell>
            <TableCell>{data.CULTURE}</TableCell>
            <TableCell>{data.CODE}</TableCell>
            <TableCell>{data.CODETEXT}</TableCell>
            <TableCell>{data.PARENT}</TableCell>
            <TableCell>{data.LEGACYMODE}</TableCell>
            <TableCell>{data.VAL1}</TableCell>
            <TableCell>{data.VAL2}</TableCell>
            <TableCell>{data.VAL3}</TableCell>
            <TableCell>{data.VAL4}</TableCell>
            <TableCell>{data.VAL5}</TableCell>
            <TableCell>{data.VAL6}</TableCell>
            <TableCell>{data.VAL7}</TableCell>
            <TableCell>{data.VAL8}</TableCell>
            <TableCell>{data.VAL9}</TableCell>
            <TableCell>{data.VAL10}</TableCell>
            <TableCell>{data.DATE1}</TableCell>
            <TableCell>{data.DATE2}</TableCell>
            <TableCell>{data.DATE3}</TableCell>
            <TableCell>{data.DATE4}</TableCell>
            <TableCell>{data.DATE5}</TableCell>
            <TableCell>{data.CHAR1}</TableCell>
            <TableCell>{data.CHAR2}</TableCell>
            <TableCell>{data.CHAR3}</TableCell>
            <TableCell>{data.CHAR4}</TableCell>
            <TableCell>{data.CHAR5}</TableCell>
            <TableCell>{data.LAYERNAME}</TableCell>
        </TableRow>
        ))
           
        }
       
    </>
  )
}

export default TableItems