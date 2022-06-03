import React from 'react';
import classNames from "classnames";

import { ReactComponent as Star } from "../../../assets/star.svg";
// @ts-ignore
import styles from './styles.module.css'

type MovieGridItemProps = {
    id:number
    img: string
    name:string
    year:number
    favorite?:boolean
    addToFavorite: (id:number) => void
}
const MovieGridItem: React.FC<MovieGridItemProps> = ({id, img,name,year,favorite,addToFavorite}) => {
    return (
        <div className={styles.container}>
            <div><img src={img} alt="img" /></div>
            <div>{name}</div>
            <div>{year}</div>
            <Star className={classNames(styles.star,{ [styles.favorite]: favorite})} onClick={() => addToFavorite(id)}/>
        </div>
    );
}

export default MovieGridItem;