export class Api {
    constructor({url , token}) {
        this._url = url;
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
            headers: {
                authorization: `${this._token}`
            }
        })
            .then(r => this._getResponse(r))
    }

    getUserProfile = () => {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `${this._token}`
            }
        })
            .then(r => this._getResponse(r))
    }

    saveProfileData = (name, about) => {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
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
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(r => this._getResponse(r))
    }

    addNewCard = (name, link) => {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(r => this._getResponse(r))
    }

    toggleLikeCard = (evt, cardEl) => {
        if (!evt.target.classList.contains('cards__btn_like')) {
            return fetch(`${this._url}/cards/likes/${cardEl._id}`, {
                method: 'PUT',
                headers: {
                    authorization: `${this._token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(r => this._getResponse(r))
        } else {
            return fetch(`${this._url}/cards/likes/${cardEl._id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `${this._token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(r => this._getResponse(r))
        }
    }

    deleteCard = (cardId) => {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: config.headers,
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
