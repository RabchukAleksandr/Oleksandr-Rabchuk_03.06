import React, {Dispatch, SetStateAction} from 'react';
import {Movie} from "../../../store/movies/types";
import {ReactComponent as Cross} from "../../../assets/cross.svg";
import Modal from 'react-modal';
// @ts-ignore
import styles from './styles.module.css'
import classNames from "classnames";
import {ReactComponent as Star} from "../../../assets/star.svg";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

type ModalProps = {
    showModal: boolean
    setShowModal: Dispatch<SetStateAction<boolean>>
    addToFavorite: (id: number) => void
    activeItem: number | null
}
const CustomModal: React.FC<ModalProps> = ({activeItem, showModal, setShowModal, addToFavorite}) => {
    const movies = useSelector((state: RootState) => state.moviesReducer.movies)
    const activeMovie: Movie = movies.find((movie: Movie) => movie.id === activeItem)
    if (!activeMovie) return <></>

    const {
        id,
        img,
        name,
        year,
        director,
        genres,
        description,
        starring,
        favorite,
    } = activeMovie

    console.log(favorite)

    return (
        <Modal isOpen={showModal} className={styles.wrapper}>
            <div className={styles.container}>
                <Cross className={styles.cross} onClick={() => setShowModal(false)}/>
                <div>
                    <img src={img} alt="img"/>
                    <div className={styles.yearBlock}>
                        <Star className={classNames(styles.star, {[styles.favorite]: favorite})} onClick={(e) => {
                            addToFavorite(id)
                        }}/>
                        <div>{year}</div>
                    </div>
                    <div className={styles.genres}>{genres.map(genre => (
                        <div className={styles.genre}>{genre}</div>))}</div>
                </div>
                <div className={styles.rightBlock}>
                    <h4>{name}</h4>
                    <div>{description}</div>
                    <div>Director:{director}</div>
                    <div>Starring:{starring.map(star => (<span>{star}</span>))}</div>
                </div>
                <div></div>
            </div>
        </Modal>
    );
};

export default CustomModal;