import React from 'react';
import classNames from "classnames";

import { ReactComponent as Star } from "../../../assets/star.svg";
// @ts-ignore
import styles from './styles.module.css'
import {Movie} from "../../../store/movies/types";

type MovieGridItemProps = Pick<Movie, 'id' | 'img' | 'name' | 'year' | 'favorite'> & { addToFavorite: (id: number) => void, onSelect:  (id: number) => void }
const MovieGridItem: React.FC<MovieGridItemProps> = ({id, img,name,year,favorite,addToFavorite, onSelect}) => {
    return (
        <div className={styles.container} onClick={() => onSelect(id)}>
            <div><img src={img} alt="img" /></div>
            <div>{name}</div>
            <div>{year}</div>
            <Star className={classNames(styles.star,{ [styles.favorite]: favorite})} onClick={(e) => {
                e.stopPropagation()
                addToFavorite(id)
            }}/>
        </div>
    );
}

export default MovieGridItem;