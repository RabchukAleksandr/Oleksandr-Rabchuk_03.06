import {configureStore, combineReducers} from "@reduxjs/toolkit";
import moviesReducer from './movies'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({
    moviesReducer
});



const persistConfig = {
    key: 'root',
    storage,
    version:0
};

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const persistedReducer:any = persistReducer(persistConfig,reducers)

const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default store