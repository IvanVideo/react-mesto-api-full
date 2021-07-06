function PopupWithForm(props) {
    return (        
        <div>
            <div className={props.isOpen ? props.className + ' popup_opened' : props.className}>
                <div className="popup__container">
                    <h2 className="popup__title">{props.title}</h2>
                    <form action="#" className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
                        {props.children}
                        <button className="popup__button" type="submit">{props.button}</button>
                    </form>
                    <button className="popup__close" type="button" onClick={props.onClose}></button>
                </div>
            </div>
        </div>
    )
}

export default PopupWithForm