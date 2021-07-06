import React from 'react';

const Login = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }
    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onLoginInfo({ email, password });
    }

    return (
        <div className="sign_up">
            <form className="sign_up__form" onSubmit={handleSubmit}>
                <main className="sign_up__main">
                    <h2 className="sign_up__title">Войти</h2>
                    <input className="sign_up__input" placeholder="Email" value={email} onChange={handleChangeEmail}></input>
                    <input className="sign_up__input" placeholder="Пароль" value={password} onChange={handleChangePassword}></input>
                </main>
                <footer className="sign_up__footer">
                    <button className="sign_up__button">Войти</button>
                </footer>
            </form>
        </div>
    )
}

export default Login