import logo from '../images/Vector.png';
import { Link, Route, Switch } from 'react-router-dom';
import React from 'react';

function Header(props) {
    return (
        <div>
            <header className="header header_position_content">
                <img src={logo} alt="Логотип Место" className="logo logo_top-position" />
                <p className='header__email'></p>
                <p className="header__email">{props.email.email}</p>
                <Switch>
                    <Route path="/signup">
                        <Link className="sign_up__enter" to='/signin'>
                            Войти
                        </Link>
                    </Route>
                    <Route path="/signin">
                        <Link className="sign_up__enter" to='/signup'>
                            Регистрация
                        </Link>
                    </Route>
                    <Route path="/">
                        <div className="header__conteiner">
                            <Link className="sign_up__enter" onClick={props.exit}>
                                Выход
                            </Link>
                        </div>
                    </Route>
                </Switch>
            </header>
        </div>
    )
}

export default Header