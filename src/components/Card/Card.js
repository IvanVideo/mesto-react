import trash from '../../images/Trash.svg';
import React from 'react';
import { InfoData } from "../../contexts/CurrentUserContext";

function Card(props) {
    const dataUser = React.useContext(InfoData);
    const isOwn = props.card._id === dataUser._id;
    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
    );
    
    const isLiked = props.likes.some(i => i._id === dataUser._id);
    const cardLikeButtonClassName = (
        `element__heart-like ${isLiked ? 'element__heart-like_active' : 'element__heart-like'}`);
    // console.log(props.likes, '111111');
    function handleClick() {
        props.onCardClick({ link: props.link, name: props.name });
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    return (
        <div className="element">
            <div className="element__block"><img src={props.link} alt={props.name} className="element__imag" onClick={handleClick} /></div>
            <button className="element__trash" type="button"><img src={trash} alt="Корзина"
                className="element__pic" /></button>
            <div className="element__content">
                <h2 className="element__title">{props.name}</h2>
                <div className="right-content">
                    <button className="element__heart-like" type="button" onClick={handleLikeClick}></button>
                    <p className="element__heart-namber">{props.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card