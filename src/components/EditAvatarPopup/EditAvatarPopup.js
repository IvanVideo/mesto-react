import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
// import { InfoData } from '../../contexts/CurrentUserContext';

function EditAvatarPopup(props) {
    return (
        <PopupWithForm className="popup popup-avatar" title="Обновить аватар" name="avatar-form" button="Сохранить" isOpen={props.isOpen} onClose={props.onClose}>
            <input id="url-avatar" type="url" className="popup__input"
                placeholder="Ссылка на картинку" name="link" required minLength="2" maxLength="200" />
            <span id="url-avatar-error" className="error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup