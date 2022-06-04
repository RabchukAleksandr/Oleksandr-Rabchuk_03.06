import React from 'react';
import {Movie} from "../../../store/movies/types";
import {ReactComponent as Star} from "../../../assets/star.svg";

// @ts-ignore
import styles from './styles.module.css'
import classNames from "classnames";


type MovieListItemProps = Omit<Movie, 'director' | 'starring'> & { onToggle: (id: number) => void,  onSelect:  (id: number) => void }


const MovieListItem: React.FC<MovieListItemProps> = ({img, genres, description, id, favorite, name, year, onToggle}) => {

    return (
        <div className={styles.container}>
            <img src={img} alt={'img'}/>
            <div className={styles.contentBlock}>
                <div className={styles.top}>
                    <div>{name}</div>
                    <div>{year}</div>
                </div>
                <div className={styles.description}>{description}</div>
                <div className={styles.genres}>{genres.map(genre => (<div className={styles.genre}>{genre}</div>))}</div>
            </div>
            <Star className={classNames(styles.star,{[styles.favorite]: favorite})} onClick={(e) => {
                e.stopPropagation()
                onToggle(id)
            }}/>
        </div>
    );
};

export default MovieListItem;