import { configureStore } from '@reduxjs/toolkit'

import { authReducer, drawerReducer, langReducer } from '../services/reducers'

export default configureStore({
    reducer: {
        drawer: drawerReducer,
        lang: langReducer,
        auth: authReducer
    },
})