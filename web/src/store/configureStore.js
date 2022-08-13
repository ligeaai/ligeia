import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { authReducer, drawerReducer, langReducer } from '../services/reducers'

export default configureStore({
    reducer: {
        drawer: drawerReducer,
        lang: langReducer,
        auth: authReducer
    },
    middleware: [thunk, logger]
})