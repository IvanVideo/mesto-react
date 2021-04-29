import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { InfoData } from '../../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(InfoData);
    // console.log(currentUser, '00000');
    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser])

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // props.onUpdateUser({
        //     name,
        //     about: currentUser,
        //   });
        props.onUpdateUser(console.log('Привет Мир!'));
    }

    return (
        <PopupWithForm className="popup popup_profile" title="Редактировать профиль" name="profile-form" button="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
                <input id="name-profile" type="text" className="popup__input popup__input_profile_name" value={name} onChange={handleChangeName} name="name"
                    required minLength="2" maxLength="40" />
                <span id="name-profile-error" className="error"></span>
                <input id="about-profile" type="text" className="popup__input popup__input_profile_about" value={about} onChange={handleChangeAbout}
                    name="about" required minLength="2" maxLength="200" />
                <span id="about-profile-error" className="error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup