import {configureStore, combineReducers} from "@reduxjs/toolkit";
import moviesReducer from './movies'
import {
    persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({
    moviesReducer
});

const persistConfig = {
    key: 'root',
    storage,
};

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const persistedReducer:any = persistReducer(persistConfig,reducers)

const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store