export class Api {
    constructor({baseUrl, contentHeader, token}) {
        this._url = baseUrl;
        this._contentHeader = contentHeader;
        this._token = token;
    }
    _getResponse = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards = () => {
        return fetch(`${this._url}/cards`, {
            headers: this._token
        })
            .then(r => this._getResponse(r))
    }

    getUserProfile = () => {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._token
        })
            .then(r => this._getResponse(r))
    }

    saveProfileData = (name, about) => {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._contentHeader,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(r => this._getResponse(r))
    }

    saveProfileAvatar = (avatar) => {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._contentHeader,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(r => this._getResponse(r))
    }

    addNewCard = (name, link) => {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._contentHeader,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(r => this._getResponse(r))
    }

    likeCard = (cardId) => {
        return fetch(`${this._url}cards/likes/${cardId}`, {
          method: 'PUT',
          headers: {
            authorization: this._contentHeader
          }
        })
          .then(this._checkResponse)
      }
    

    dislikeCard = (cardId) => {
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
              authorization: this._token
            }
          })
            .then(this._checkResponse)
    }

    deleteCard = (cardId) => {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._token,
        })
            .then(r => this._getResponse(r))
    }

    loadRender(isLoading) {
        const popupActive = document.querySelector('.popup_opened');
        const activeSaveBtn = popupActive.querySelector('.popup__submit');
        if (isLoading) {
            activeSaveBtn.textContent = 'Сохранение...';
        } else {
            activeSaveBtn.textContent = 'Создать';
        }
    }
}
