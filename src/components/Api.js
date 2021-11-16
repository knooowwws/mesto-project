export class Api {
    constructor({baseUrl, header}) {
        this.url = baseUrl;
        this._header = header;
    }

    _getResponse = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getInitialCards = () => {
        return fetch(`${this.url}/cards`, {
            headers: this._header
        })
            .then(r => this._getResponse(r))
    }
    getUserProfile = () => {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: this._header
        })
            .then(r => this._getResponse(r))
    }
    saveProfileData = (name, about) => {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this._header,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(r => this._getResponse(r))
    }
    saveProfileAvatar = (avatar) => {
        return fetch(`${this.url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._header,
          body: JSON.stringify({
            avatar: avatar
          })
        }).then(r => this._getResponse(r));
      }
    addNewCard = (name, link) => {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this._header,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(r => this._getResponse(r))
    }
    likeCard = (cardId) => {
        return fetch(`${this.url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._header
        })
            .then(r => this._getResponse(r))
    }
    dislikeCard = (cardId) => {
        return fetch(`${this.url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._header,
        })
            .then(r => this._getResponse(r))
    }
    deleteCard = (cardId) => {
        return fetch(`${this.url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._header,
        })
            .then(r => this._getResponse(r))
    }
}