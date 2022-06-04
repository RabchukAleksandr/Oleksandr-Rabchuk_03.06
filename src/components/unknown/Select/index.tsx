import React, {useId} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store";
import {filterMovies} from '../../../store/movies'

type SelectProps = {
}
const Select: React.FC<SelectProps> = () => {
    const genres = useSelector((state: RootState) => state.moviesReducer.genres)
    const selectedGenre = useSelector((state: RootState) => state.moviesReducer.selectedGenre)
    const dispatch = useDispatch<AppDispatch>()
    const id = useId()
    const onFilter = (e:React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(filterMovies({genre: e.target.value as string}))
    }

    return (
        <select onChange={onFilter} value={selectedGenre}>
            <option key={id} value="All">All</option>
            {genres.map((genre:string) => (<option value={genre}>{genre}</option>))}
        </select>
    );
};

export default Select;