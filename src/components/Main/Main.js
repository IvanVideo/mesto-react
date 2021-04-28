import { useEffect } from 'react';
import React from 'react';
import Card from '../Card/Card';
import api from "../../utils/api";
import { InfoData } from '../../contexts/CurrentUserContext';

function Main(props) {
    let dataUser = React.useContext(InfoData);

    const [cards, setCurrentCard] = React.useState([]);
    useEffect(() => {
        api.getAllInfo()
            .then(([dataUser, dataInfo]) => {
                setCurrentCard(dataInfo);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === dataUser._id);
        console.log(isLiked, '999999000000-1111')
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.setLike(card._id, !isLiked).then((newCard) => {
            setCurrentCard((state) => state.map((c) => c._id === card._id ? newCard : c));
        }); 
    }
    // console.log(isLiked, '00000')
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
                    {
                        cards.map(item => (
                            <Card
                                key={item._id}
                                link={item.link}
                                likes={item.likes}
                                name={item.name}
                                owner={item.owner}
                                prop={cards}
                                onCardClick={props.onCardClick}
                                onCardLike={handleCardLike}
                                card={item}
                            />
                        ))}
                </section>
            </main>
        </div>
    )
}

export default Main