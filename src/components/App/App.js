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
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import PopupDeleteCard from '../PopupDeleteCard/PopupDeleteCard';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState('');
  const [cards, setCurrentCard] = React.useState([]);


  useEffect(() => {
    api.getAllInfo()
      .then(([dataUser, dataInfo]) => {
        setCurrentUser(dataUser);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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
    api.deleteItem(id)
      .then((res) => {
        setCurrentCard((cards) => cards.filter((data) => data._id !== ''));
        console.log(res, 'Ответ');
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

  function handleOpenPopupDelete() {
    setIsDeleteCardPopup(!isDeleteCardPopupOpen)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(false);
    setIsDeleteCardPopup(false);
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

  function handleAddPlaceSubmit(data) {
    // console.log(data, 'Что-то пришло')
    api.addNewItem(data)
      .then((data) => {
        console.log(data, 'Что-то пришло')
        setCurrentCard([data, ...cards]);
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
        <Main onDeletCardPopup={handleOpenPopupDelete} onEditProfile={handleOpenPopupProfile} onAddPlace={handleOpenPopupAdd} onEditAvatar={handleOpenPopupAvatar} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddNewCard={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateAvatar} />
        <PopupDeleteCard isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete} />
        <ImagePopup className="popup popup-img" card={selectedCard} onClose={closeAllPopups} />
      </div>
    </InfoData.Provider>
  );
}

export default App;
