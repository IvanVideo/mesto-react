import trash from '../../images/Trash.svg';
import React from 'react';
import {InfoData} from "../../contexts/CurrentUserContext";

function Card(props) {
    // const dataCard = React.useContext(InfoData);
    console.log(props, '111111');
    function handleClick() {
        props.onCardClick({link: props.link, name: props.name});
      } 
      
    return (
        <div className="element">
            <div className="element__block"><img src={props.link} alt={props.name} className="element__imag" onClick={handleClick}/></div>
            <button className="element__trash" type="button"><img src={trash} alt="Корзина"
                className="element__pic" /></button>
            <div className="element__content">
                <h2 className="element__title">{props.name}</h2>
                <div className="right-content">
                    <button className="element__heart-like" type="button"></button>
                    <p className="element__heart-namber">{props.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card