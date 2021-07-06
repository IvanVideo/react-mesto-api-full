import imgSuccess from "../images/Union.png";
import imgFail from "../images/Union1.png";

const InfoToolTip = (props) => {
    return (
        <div>
            <div className={props.isOpenSuccess ? "popup popup-success" + " popup_opened" : "popup popup-success"}>
                <div className="popup__container popup__container_popup-success">
                    <img className="popup-success__img" src={imgSuccess} alt="success" />
                    <h2 className="popup-success__title">Вы успешно зарегистрировались!</h2>
                    <button className="popup__close" type="button" onClick={props.onClose}></button>
                </div>
            </div>
            <div className={props.isOpenFail ? "popup popup-success" + " popup_opened" : "popup popup-success"}>
                <div className="popup__container popup__container_popup-success">
                    <img className="popup-success__img" src={imgFail} alt="fail" />
                    <h2 className="popup-success__title">Что-то пошло не так! Попробуйте ещё раз.</h2>
                    <button className="popup__close" type="button" onClick={props.onClose}></button>
                </div>
            </div>

        </div>
    )
}

export default InfoToolTip