import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { authReducer, drawerReducer, errorReducer, langReducer } from '../services/reducers'

export default configureStore({
    reducer: {
        auth: authReducer,
        drawer: drawerReducer,
        error: errorReducer,
        lang: langReducer,
    },
    middleware: [thunk, logger]
})