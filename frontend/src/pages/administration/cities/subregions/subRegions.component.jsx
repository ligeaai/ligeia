import React from 'react'
import {makeStyles} from '@mui/styles'
import styles from './subRegionStyle'

const useStyles = makeStyles(styles)

function SubRegions () {

    const classes = useStyles()
    return <h1>SubRegions</h1>
}

export default SubRegions