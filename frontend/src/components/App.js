import '../pages/index.css';
import React, { useEffect } from 'react'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup.js'
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupDeleteCard from './PopupDeleteCard';
import Register from './Register';
import Login from './Login';
import { Route, useHistory, Redirect, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute ';
import apiAuth from '../utils/apiAuth';
import InfoToolTip from './InfoToolTip';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [infoToolTipSuc, setInfoToolTipSuc] = React.useState(false);
  const [infoToolTipFail, setInfoToolTipFail] = React.useState(false);

  const [userInfo, setUserInfo] = React.useState({
    email: '',
    id: ''
  })
  const history = useHistory();

  function signOut() {
    localStorage.removeItem('token');
    setUserInfo('')
    history.push('/signin');
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('token');
    if (jwt && jwt !== null) {
      apiAuth.checkToken(jwt)
        .then((res) => {
          setUserInfo({ email: res.email });
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      return
    }
  }

  useEffect(() => {
    tokenCheck();
    const jwt = localStorage.getItem('token');
    api.getAllInfo(jwt)
      .then(([dataUser, dataInfo]) => {
        setCurrentUser(dataUser);
        setCards(dataInfo);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  function handleCardLike(card) {
    const jwt = localStorage.getItem('token');
    const isLiked = card.likes.some(item => item === currentUser._id);
    if (isLiked === true) {
      api.removeLike(card._id, jwt, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((item) => item._id === card._id ? newCard.data : item));
      })
        .catch((err) => {
          console.log(err)
        })
    } else {
      api.setLike(card._id, jwt, !isLiked)
      .then((newCard) => {
        console.log(newCard, "ответ")
        setCards((state) => state.map((item) => item._id === card._id ? newCard.data : item));
      })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  function handleCardDelete(id) {
    console.log(id, 'что это')
    console.log(currentUser, 'а это')
    const jwt = localStorage.getItem('token');
    api.deleteItem(id, jwt)
      .then(() => {
        const newCards = cards.filter(e => e._id !== id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleOpenPopupProfile() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleOpenPopupAvatar() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleOpenPopupAdd() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleOpenPopupDelete() {
    setIsDeleteCardPopup(!isDeleteCardPopupOpen)
  }

  function handleOpenPopupSuccess() {
    setInfoToolTipSuc(!infoToolTipSuc);
  }

  function handleOpenPopupFail() {
    setInfoToolTipFail(!infoToolTipFail);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardPopup(false);
    setInfoToolTipSuc(false);
    setInfoToolTipFail(false);
  }

  function handleCardClick(data) {
    setSelectedCard({
      status: 'selected',
      url: data.link,
      name: data.name
    });
  }

  function handleUpdateUser(data) {
    const jwt = localStorage.getItem('token');
    api.editProfileInfo(data, jwt)
      .then((data) => {
        setCurrentUser(data.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(data) {
    const jwt = localStorage.getItem('token');
    api.editAvatar(data.avatar, jwt)
      .then((data) => {
        setCurrentUser(data.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit(data) {
    const jwt = localStorage.getItem('token');
    api.addNewItem(data, jwt)
      .then((data) => {
        setCards([data.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function registerUser({ email, password }) {
    return apiAuth
      .register({ email, password })
      .then((res) => {
        setUserInfo({ id: res.data._id, email: res.data.email });
        handleOpenPopupSuccess();
        history.push('/signin');
      })
      .catch((err) => {
        handleOpenPopupFail();
        console.log(err)
      })
  }

  function loginUser({ email, password }) {
    return apiAuth
      .authorize({ email, password })
      .then((res) => {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        tokenCheck();
        history.push("/")
      })
      .catch((err) => {
        handleOpenPopupFail();
        console.log(err)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header email={userInfo} exit={signOut} />
        <Switch>
          <Route path="/signup">
            <Register onLoginInfo={registerUser} />
          </Route>
          <Route path="/signin">
            <Login onLoginInfo={loginUser} />
          </Route>

          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onDeletCardPopup={handleOpenPopupDelete} onEditProfile={handleOpenPopupProfile} onAddPlace={handleOpenPopupAdd} onEditAvatar={handleOpenPopupAvatar} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
          />
          <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddNewCard={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateAvatar} />
        <PopupDeleteCard isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete} />
        <ImagePopup className="popup popup-img" card={selectedCard} dataCard={cards} onClose={closeAllPopups} />
        <InfoToolTip isOpenSuccess={infoToolTipSuc} isOpenFail={infoToolTipFail} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
