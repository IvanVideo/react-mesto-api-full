
class ApiAuth {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers
    }

    checkToken(token) {
        console.log('01001')
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(res => this._checkResponse(res));
    }

    _checkResponse(response) {
        return response.ok ? response.json() : Promise.reject(new Error(`Ошибка ${response.status} : ${response.statusText}`))
    }

    register({ email, password }) {
        return fetch(`${this._baseUrl}/signup`, {
            credentials: 'include',
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        })
            .then(res => this._checkResponse(res));
    }

    authorize({ email, password }) {
        return fetch(`${this._baseUrl}/signin`, {
            credentials: 'include',
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
            .then(res => this._checkResponse(res));
    }

}
const config = {
    baseUrl: 'https://api.ivan.mesto.nomoredomains.club',
    headers: { 'Content-Type': 'application/json' }
}

const apiAuth = new ApiAuth(config);
export default apiAuth