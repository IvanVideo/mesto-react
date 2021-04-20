import './pages/index.css';
import { useState, useEffect } from 'react';
import React from 'react'
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import PopupWithForm from './components/PopupWithForm/PopupWithForm';
import ImagePopup from './components/ImagePopup/ImagePopup.js'


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);


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
    <div className="App">
      <body className='body'>
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
      </body>
    </div>
  );
}

export default App;
