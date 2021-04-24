import trash from '../../images/Trash.svg';
import React from 'react';
import { CardInfoData } from '../../contexts/CurrentUserContext';

function Card(props) {
    const dataCard = React.useContext(CardInfoData);
    // console.log(dataUser, '111111');
    // console.log(dataInfo, '000000');
    function handleClick() {
        props.onCardClick({link: props.link, name: props.name});
      } 
      
    return (
        <div className="element">
            <div className="element__block"><img src={dataCard.link} alt={props.name} className="element__imag" onClick={handleClick}/></div>
            <button className="element__trash" type="button"><img src={trash} alt="Корзина"
                className="element__pic" /></button>
            <div className="element__content">
                <h2 className="element__title">{dataCard.name}</h2>
                <div className="right-content">
                    <button className="element__heart-like" type="button"></button>
                    <p className="element__heart-namber">{dataCard.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card