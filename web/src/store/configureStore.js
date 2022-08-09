import { configureStore } from '@reduxjs/toolkit'

import {drawerReducer,langReducer} from '../services/reducers'

export default configureStore({
    reducer: {
        drawer: drawerReducer,
        lang: langReducer
    },
})