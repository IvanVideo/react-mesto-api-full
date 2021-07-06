import trash from '../images/Trash.svg';
import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const userData = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === userData._id;

    const cardDeleteButtonClassName = (
        `element__pic ${isOwn ? 'element__pic' : 'element__pic_hidden'}`
    );

    const isLiked = props.card.likes.some(item => item === userData._id);
        
    const cardLikeButtonClassName = (
        `element__heart-like ${isLiked ? 'element__heart-like_active' : 'element__heart-like'}`);

    function handleClick() {
        props.onCardClick({ link: props.card.link, name: props.card.name });
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card._id)
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    return (
        <div className="element">
            <div className="element__block"><img src={props.card.link} alt={props.card.name} className="element__imag" onClick={handleClick} /></div>
            <button className="element__trash" type="button" onClick={handleDeleteClick} ><img src={trash} alt="Корзина"
                className={cardDeleteButtonClassName} /></button>
            <div className="element__content">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="right-content">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="element__heart-namber">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card