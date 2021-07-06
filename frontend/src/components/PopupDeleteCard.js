import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupDeleteCard(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onDeleteCard();
    }
    return(
        <PopupWithForm className="popup popup-remove_opened" title="Вы уверены?" name="remove-form" button="Да" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}/>
    )
}

export default PopupDeleteCard