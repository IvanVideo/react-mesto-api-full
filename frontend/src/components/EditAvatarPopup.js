import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            avatar: avatarRef.current.value,
        });
    }
    return (
        <PopupWithForm className="popup popup-avatar" title="Обновить аватар" name="avatar-form" button="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input id="url-avatar" type="url" className="popup__input"
                placeholder="Ссылка на картинку" name="link" required minLength="2" maxLength="200" ref={avatarRef} />
            <span id="url-avatar-error" className="error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup