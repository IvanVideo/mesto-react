import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditProfilePopup(props) {
    const [name, setName] = React.useState();
    const [description, setDescription] = React.useState();

    return (
        <PopupWithForm className="popup popup_profile" title="Редактировать профиль" name="profile-form" button="Сохранить" isOpen={props.isEditProfilePopupOpen} onClose={props.closeAllPopups}>
            <input id="name-profile" type="text" className="popup__input popup__input_profile_name" value="" name="name"
                required minLength="2" maxLength="40" />
            <span id="name-profile-error" className="error"></span>
            <input id="about-profile" type="text" className="popup__input popup__input_profile_about" value=""
                name="about" required minLength="2" maxLength="200" />
            <span id="about-profile-error" className="error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup