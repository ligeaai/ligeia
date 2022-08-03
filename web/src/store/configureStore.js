import { configureStore } from '@reduxjs/toolkit'

import drawerReducer from '../services/reducers'

export default configureStore({
    reducer: {
        drawer: drawerReducer
    },
})