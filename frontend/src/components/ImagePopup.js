function ImagePopup(props) {

    return (
        <div className={props.card ? props.className + ' popup_opened' : props.className}>
            <div className="popup__element">
                <div className="popup__box">
                    <img src={props.card?.url} alt={props.card?.name} className="popup__pic" />
                    <button className="popup__close popup-img__close" type="button" onClick={props.onClose}></button>
                </div>
                <p className="popup__subtitle">{props.card?.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup