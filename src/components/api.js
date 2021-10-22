const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-2',
    headers: {
        authorization: 'f8b50c22-f9ea-4450-b40d-792adb8f1524',
        'Content-Type': 'application/json'
    }
}

export const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// Запрос объекта с карточками
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: {
            authorization: `${config.headers.authorization}`
        }
    }).then(r => getResponse(r))
}

// Запрос юзера
export const getUserProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            authorization: `${config.headers.authorization}`
        }
    }).then(r => getResponse(r))
}

// Редактирование данных пользователя на сервере
export const saveProfileData = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: `${config.headers.authorization}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).then(r => getResponse(r))

}

// Редактирование аватара пользователя
export const saveProfileAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: `${config.headers.authorization}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatar
        })
    }).then(r => getResponse(r))
}

// Добавление карточки на сервер
export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: `${config.headers.authorization}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(r => getResponse(r))
}

// Запрос на снятие и установку лайка карточки
export const toggleLikeCard = (evt, cardEl) => {
    if (!evt.target.classList.contains('cards__btn_like')) {
        return fetch(`${config.baseUrl}/cards/likes/${cardEl._id}`, {
            method: 'PUT',
            headers: {
                authorization: `${config.headers.authorization}`,
                'Content-Type': 'application/json'
            }
        }).then(r => getResponse(r))
    } else {
        return fetch(`${config.baseUrl}/cards/likes/${cardEl._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${config.headers.authorization}`,
                'Content-Type': 'application/json'
            },
        }).then(r => getResponse(r))
    }
}


export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    }).then(r => getResponse(r))
}

