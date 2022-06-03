import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store";
import {filterMovies} from '../../../store/movies'

type SelectProps = {
}
const Select: React.FC<SelectProps> = () => {
    const genres = useSelector((state: RootState) => state.moviesReducer.genres)
    const dispatch = useDispatch<AppDispatch>()

    const onFilter = (e:React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(filterMovies({genre: e.target.value as string}))
    }

    return (
        <select onChange={onFilter}>
            <option value="All">All</option>
            {genres.map((genre:string) => (<option value={genre}>{genre}</option>))}
        </select>
    );
};

export default Select;