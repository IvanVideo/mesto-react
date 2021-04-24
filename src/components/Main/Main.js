import { useState, useEffect } from 'react';
import React from 'react';
import api from "../../utils/api";
import Card from '../Card/Card';
import { UserInfoData } from '../../contexts/CurrentUserContext';
import { CardInfoData } from '../../contexts/CurrentUserContext';

function Main(props) {
    // const [userName, setUserName] = React.useState();
    // const [userDescription, setUserDescription] = React.useState();
    // const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);
    const dataUser = React.useContext(UserInfoData);
    const dataCard = React.useContext(CardInfoData);
    console.log(cards, '0');
    useEffect(() => {
        setCards(dataCard);
    })
    // useEffect(() => {
        
    //     api.getAllInfo()
    //         .then(([dataUser, dataInfo]) => {
    //             // setUserAvatar(dataUser.avatar);
    //             // setUserDescription(dataUser.about);
    //             // setUserName(dataUser.name);
    //             setCards(dataInfo);
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])

    return (
        <div>
            <main>
                <section className="profile profile_position_content">
                    <div className="profile__main">
                        <a href="#" className="profile__opacity-image" target="_self" onClick={props.onEditAvatar}><img src={dataUser.avatar} alt="Жак-Ив Кусто" className="profile__image" /></a>
                        <div className="profile__content">
                            <h1 className="profile__title">{dataUser.name}</h1>
                            <p className="profile__subtitle">{dataUser.about}</p>
                        </div>
                    </div>
                    <div className="profile__buttons">
                        <button className="profile__link" type="button" onClick={props.onEditProfile}></button>
                        <button className="profile__button" type="button" onClick={props.onAddPlace}></button>
                    </div>
                </section>
                <section className="elements elements_position_content">
                    {/* {                           
                        cards.map(item => (
                            <Card
                                key={item._id}
                                link={item.link}
                                likes={item.likes}
                                name={item.name}
                                prop={cards}
                                onCardClick={props.onCardClick}
                            />
                        )
                        )} */}
                </section>
            </main>
        </div>
    )
}

export default Main