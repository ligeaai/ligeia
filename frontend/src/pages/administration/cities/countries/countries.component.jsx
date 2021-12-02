import React from 'react'
import {makeStyles} from '@mui/styles'
import styles from './countriesStyle'

const useStyles = makeStyles(styles)

function Countries( ) {
    const classes = useStyles()
    return <h1>Countries</h1>
}

export default Countries