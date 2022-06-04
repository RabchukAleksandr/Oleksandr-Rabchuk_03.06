import React, {useEffect, useId, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies, toggleFavorites} from "../../store/movies";
import {AppDispatch, RootState} from "../../store";
import {Movie} from "../../store/movies/types";
import {ReactComponent as Grid} from "../../assets/grid.svg";
import {ReactComponent as List} from "../../assets/list.svg";
import MovieGridItem from "../unknown/MovieGridItem";

// @ts-ignore
import styles from './styles.module.css'
import FavoriteList from "../FavoriteList";
import classNames from "classnames";
import MovieListItem from "../unknown/MovieListItem";
import Select from "../unknown/Select";
import Modal from "../unknown/Modal/Modal";

type MoviesProps = {}
const Movies: React.FC<MoviesProps> = () => {
    const reactId = useId()
    const [toggleLayout, setToggleLayout] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const movies = useSelector((state: RootState) => state.moviesReducer.movies)
    const filteredMovies = useSelector((state: RootState) => state.moviesReducer.filteredMovies)
    const selectedGenre = useSelector((state: RootState) => state.moviesReducer.selectedGenre)
    const dispatch = useDispatch<AppDispatch>()

    const renderMovies = selectedGenre === 'All' ? movies : filteredMovies

    useEffect(() => {
        dispatch(fetchMovies())
    }, [dispatch])



    const onToggleFavorite = (id: number) => {
        dispatch(toggleFavorites({id}))
        console.log('works')
    }

    const onShowModal = (id:number) => {
        setActiveItem(id)
        setShowModal(true)
    }

    return (
        <div className={styles.wrapper}>
            <Modal activeItem={activeItem} showModal={showModal} setShowModal={() => setShowModal(!showModal)} addToFavorite={onToggleFavorite}/>
            <h1>Movies Gallery</h1>
            <div className={styles.top}>
                <div>
                    <div>Select genre:</div>
                    <Select/>
                </div>
                <div>
                    <div>View as:</div>
                    <Grid onClick={() => !toggleLayout && setToggleLayout(!toggleLayout)}
                          className={classNames(styles.layout, {[styles.activeLayout]: toggleLayout})}/>
                    <List onClick={() => toggleLayout && setToggleLayout(!toggleLayout)}
                          className={classNames(styles.layout, {[styles.activeLayout]: !toggleLayout})}/>
                </div>
            </div>
            <div className={styles.container}>
                {toggleLayout ?
                    (<div className={styles.moviesGridContainer}>
                        {renderMovies?.map(({img, name, year, favorite, id}: Movie) => (
                            <MovieGridItem id={id} img={img} name={name} year={year} favorite={favorite}
                                           addToFavorite={onToggleFavorite} key={id + reactId} onSelect={onShowModal}/>
                        ))}
                    </div>) :
                    (<div className={styles.moviesListContainer}>
                        {renderMovies?.map((movie: Movie) => (
                            <MovieListItem {...movie} onToggle={onToggleFavorite} onSelect={onShowModal}/>))}
                    </div>)
                }
                <FavoriteList movies={movies}/>
            </div>
        </div>
    );
};

export default Movies;