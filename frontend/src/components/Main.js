import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const dataUser = React.useContext(CurrentUserContext);

    return (
        <div>
            <main>
                <section className="profile profile_position_content">
                    <div className="profile__main">
                        <a href="#" className="profile__opacity-image" target="_self" onClick={props.onEditAvatar}><img src={dataUser.avatar} alt="Жак-Ив Кусто" className="profile__image" /></a>
                        <div className="profile__content">
                            <h1 className="profile__title">{dataUser.name}</h1>
                            <p className="profile__subtitle">{dataUser.about}</p>
                        </div>
                    </div>
                    <div className="profile__buttons">
                        <button className="profile__link" type="button" onClick={props.onEditProfile}></button>
                        <button className="profile__button" type="button" onClick={props.onAddPlace}></button>
                    </div>
                </section>
                <section className="elements elements_position_content">
                    {
                        props.cards.map(item => (
                            <Card
                                key={item._id}
                                prop={props.cards}
                                onCardClick={props.onCardClick}
                                onCardLike={props.onCardLike}
                                onCardDelete={props.onCardDelete}
                                onDeletePopup={props.onDeletCardPopup}
                                card={item}
                            />
                        ))}
                </section>
            </main>
        </div>
    )
}

export default Main