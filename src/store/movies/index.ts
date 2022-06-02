import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {InitialState} from "./types";


export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async function () {
        const response = await fetch('https://my-json-server.typicode.com/moviedb-tech/movies/list')

        return await response.json();
    }
)


const initialState = {
    movies: [],
    status: null,
    error: null
} as InitialState

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            state.movies = state.movies.map(movie => movie.id === action.payload.id ? {...movie, favorite:true} : movie)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchMovies.fulfilled, (state, { payload }) => {
            state.status = 'idle'
            state.movies = payload
        })
        builder.addCase(fetchMovies.rejected, (state, { error }) => {
            if(error.message) state.error = error.message;
            state.status = "idle";
        })
    }
})

export const {addToFavorites} = moviesSlice.actions

export default moviesSlice.reducer