class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`РћС€РёР±РєР° РЅР° СЃРµСЂРІРµСЂРµ`)
    }

    getAllInfo(jwt) {
        return Promise.all([this.getUserInfo(jwt), this.getCards(jwt)]);
    }

    getCards(jwt) {
        return fetch(`${this._url}/cards`, {
            credentials: 'include',
            headers: {
                authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json'
              }
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    getUserInfo(jwt) {
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
            headers: {
                authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json'
              }
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    addNewItem(data, jwt) {
        return fetch(`${this._url}/cards`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    deleteItem(id, jwt) {
        return fetch(`${this._url}/cards/${id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
            })
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    editProfileInfo(data, jwt) {
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    editAvatar(data, jwt) {
        return fetch(`${this._url}/users/me/avatar`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                avatar: data
            })
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    setLike(id, jwt) {
        return fetch(`${this._url}/cards/${id}/likes/`, {
            credentials: 'include',
            method: 'PUT',
            headers: {
                authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
            })
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }
    
    removeLike(id, jwt) {
        console.log("удаляю")
        return fetch(`${this._url}/cards/${id}/likes/`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
            })
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }


}

const config = {
    url: 'http://api.ivan.mesto.nomoredomains.club',
    headers: {
      authorization: '9ac744e3-19c4-448e-a05d-54fc2dcca7b2',
      'Content-Type': 'application/json'
    }
  };

const api = new Api(config);

export default api