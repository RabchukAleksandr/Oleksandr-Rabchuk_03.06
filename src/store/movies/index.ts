import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {InitialState, Movie} from "./types";
import {uniq} from 'lodash'

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async function () {
        const response = await fetch('https://my-json-server.typicode.com/moviedb-tech/movies/list')
        return await response.json();
    },
)


export const initialState = {
    movies: [],
    favorites: [],
    genres:[],
    filteredMovies:[],
    selectedGenre: 'All',
    status: null,
    error: null
} as InitialState

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        toggleFavorites: (state, action) => {
            const index = state.favorites.findIndex(el => el === action.payload.id)
            index === -1 ? state.favorites.push(action.payload.id) : state.favorites.splice(index,1)
            state.movies = state.movies.map(movie => state.favorites.includes(movie.id) ? {...movie, favorite:true} : {...movie, favorite:false})
            state.filteredMovies = state.filteredMovies.map(movie => state.favorites.includes(movie.id) ? {...movie, favorite:true} : {...movie, favorite:false})
        },
        filterMovies:(state, action) =>  {
            if(action.payload.genre === 'All'){
                state.filteredMovies = []
                state.selectedGenre = 'All'
            }else{
                state.filteredMovies = state.movies.filter((movie) => movie.genres.includes(action.payload.genre))
                state.selectedGenre = action.payload.genre
            }

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchMovies.fulfilled, (state, { payload }) => {
            state.status = 'idle'
            state.movies = payload.map((movie:Movie) => state.favorites.includes(movie.id) ? {...movie, favorite:true} : {...movie, favorite:false})
            const genres = state.movies.map(movie => movie.genres).flat(1)
            state.genres = uniq(genres)
        })
        builder.addCase(fetchMovies.rejected, (state, { error }) => {
            if(error.message) state.error = error.message;
            state.status = "idle";
        })
    }
})

export const {toggleFavorites,filterMovies} = moviesSlice.actions

export default moviesSlice.reducer