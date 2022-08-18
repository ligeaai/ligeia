import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { authReducers, authReducer, drawerReducer, langReducer } from '../services/reducers'

export default configureStore({
    reducer: {
        drawer: drawerReducer,
        lang: langReducer,
        auth: authReducer,

        auths: authReducers

    },
    middleware: [thunk, logger]
})