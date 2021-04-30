import '../../pages/index.css';
import React, { useEffect } from 'react'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup.js'
import api from "../../utils/api";
import { InfoData } from '../../contexts/CurrentUserContext';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState('');


  useEffect(() => {
    api.getAllInfo()
      .then(([dataUser, dataInfo]) => {
        setCurrentUser(dataUser);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      api.removeLike(card._id, !isLiked).then((newCard) => {
        setCurrentCard((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    } {
      api.setLike(card._id, !isLiked).then((newCard) => {
        setCurrentCard((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    }
  }

  function handleCardDelete(id) {
    console.log(id, '0000')
    api.deleteItem(id)
      .then(() => {
        // console.log(res, '999')
        // const newCards = cards.filter(c => c._id !== '');
        // setCurrentCard(newCards);
      })
  }




  function handleOpenPopupProfile() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleOpenPopupAvatar() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleOpenPopupAdd() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(false);
  }

  function handleCardClick(data) {
    setSelectedCard({
      status: !selectedCard,
      url: data.link,
      name: data.name
    });
  }

  function handleUpdateUser(data) {
    api.editProfileInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <InfoData.Provider value={currentUser}>
      <div className="App">
        <Header />
        <Main onEditProfile={handleOpenPopupProfile} onAddPlace={handleOpenPopupAdd} onEditAvatar={handleOpenPopupAvatar} onCardClick={handleCardClick} cards={cards} onCardLike ={handleCardLike} onCardDelete={handleCardDelete}/>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateAvatar} />
        <PopupWithForm className="popup popup-elements" title="Новое место" name="elements-form" button="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input id="name-elements" type="text" className="popup__input popup__input_elements_name"
            placeholder="Название" name="name" required minLength="2" maxLength="40" />
          <span id="name-elements-error" className="error"></span>
          <input id="url-elements" type="url" className="popup__input popup__input_elements_url"
            placeholder="Ссылка на картинку" name="link" required minLength="2" maxLength="200" />
          <span id="url-elements-error" className="error"></span>
        </PopupWithForm>
        <PopupWithForm className="popup popup-remove" title="Вы уверены?" name="remove-form" button="Да">
        </PopupWithForm>
        <ImagePopup className="popup popup-img" card={selectedCard} onClose={closeAllPopups} />
      </div>
    </InfoData.Provider>
  );
}

export default App;
