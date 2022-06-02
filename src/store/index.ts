import {configureStore} from "@reduxjs/toolkit";
import moviesReducer from './movies'

const store = configureStore({
    reducer:{
        movies: moviesReducer
    },
    middleware:(getDefaultMiddleware => getDefaultMiddleware().concat())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store