import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup(props) {
    const newCardName = React.useRef();
    const newCardLink = React.useRef();

    React.useEffect(() => {
        newCardName.current.value = '';
        newCardLink.current.value = ''
    }, [props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddNewCard({
            name: newCardName.current.value,
            link: newCardLink.current.value
        });
    }

    return (
        <PopupWithForm className="popup popup-elements" title="Новое место" name="elements-form" button="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
            <input id="name-elements" type="text" className="popup__input popup__input_elements_name"
                placeholder="Название" name="name" required minLength="2" maxLength="40" ref={newCardName} />
            <span id="name-elements-error" className="error"></span>
            <input id="url-elements" type="url" className="popup__input popup__input_elements_url"
                placeholder="Ссылка на картинку" name="link" required minLength="2" maxLength="200" ref={newCardLink} />
            <span id="url-elements-error" className="error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup