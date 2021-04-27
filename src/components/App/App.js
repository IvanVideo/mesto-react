import '../../pages/index.css';
import React, { useEffect } from 'react'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup.js'
import api from "../../utils/api";
import { InfoData } from '../../contexts/CurrentUserContext';


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


  return (
    <InfoData.Provider value={currentUser}>
        <div className="App">
          <Header />
          <Main onEditProfile={handleOpenPopupProfile} onAddPlace={handleOpenPopupAdd} onEditAvatar={handleOpenPopupAvatar} onCardClick={handleCardClick} />
          <Footer />
          <PopupWithForm className="popup popup-avatar" title="Обновить аватар" name="avatar-form" button="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
            <input id="url-avatar" type="url" className="popup__input"
              placeholder="Ссылка на картинку" name="link" required minLength="2" maxLength="200" />
            <span id="url-avatar-error" className="error"></span>
          </PopupWithForm>
          <PopupWithForm className="popup popup_profile" title="Редактировать профиль" name="profile-form" button="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
            <input id="name-profile" type="text" className="popup__input popup__input_profile_name" value="" name="name"
              required minLength="2" maxLength="40" />
            <span id="name-profile-error" className="error"></span>
            <input id="about-profile" type="text" className="popup__input popup__input_profile_about" value=""
              name="about" required minLength="2" maxLength="200" />
            <span id="about-profile-error" className="error"></span>
          </PopupWithForm>
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
