import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies, addToFavorites} from "../../store/movies";
import {AppDispatch, RootState} from "../../store";
import {Movie} from "../../store/movies/types";

type MoviesProps = {}
const Movies: React.FC<MoviesProps> = () => {
    const movies = useSelector((state: RootState) => state.moviesReducer.movies)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        if(movies.length === 0) dispatch(fetchMovies())
    },[dispatch,movies.length])

    const addMovieToFavorites = (id:string) => {
        dispatch(addToFavorites({id}))
    }
    console.log(movies)
    return (
        <div>
            {movies.map((item:Movie) => (
                <div>
                    {item.name}
                    {item.favorite && 'favorite'}
                    <button onClick={() => addMovieToFavorites(item.id)}> Add to favorites</button>
                </div>
            ))}
        </div>
    );
};

export default Movies;