import React from 'react';

import {Movie} from "../../store/movies/types";
import { ReactComponent as Cross } from "../../assets/cross.svg";
// @ts-ignore
import styles from './styles.module.css'
import {toggleFavorites} from '../../store/movies'
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";

type FavoriteListProps = {
    movies?: Movie[]
}
const FavoriteList: React.FC<FavoriteListProps> = ({movies}) => {
    const dispatch = useDispatch<AppDispatch>()

    const onToggleFavorite = (id:number) => {
        dispatch(toggleFavorites({id}))
    }

    return (
        <div className={styles.container}>
            <h2>Favorite List</h2>
            <ul>
                {movies?.filter(movie => movie.favorite).map(movie => (
                    <li className={styles.item}>
                        <div>{movie.name}</div>
                        <Cross className={styles.cross} onClick={() => onToggleFavorite(movie.id)}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoriteList;