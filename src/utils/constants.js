export const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-2',
    header: {
        authorization: 'f8b50c22-f9ea-4450-b40d-792adb8f1524',
        'Content-Type': 'application/json'
    },
};

export const cardConfig = {
    cardImage: ('.cards__img'),
    likeBtn: ('.cards__btn'),
    activeLike: ('cards__btn_like'),
    deleteBtn: ('.cards__trash'),
    likesCounter: ('.cards__like-counter')
};


export const avatar = document.querySelector('.popup_avatar')

export const popupEditConfig = {

    nameInput: document.querySelector('input[name="name"]'),
    jobInput: document.querySelector('input[name="profession"]'),
    formEdit: document.querySelector('.form_profile'),
    editBtn: document.querySelector('.profile__btn-edit'),
    nameInfo: document.querySelector('.profile__name'),
    jobInfo: document.querySelector('.profile__work-place')
};

export const popupAddConfig = {
    formAdd: document.querySelector('.form_mesto'),
    closePopupAdd: document.querySelector('.popup__close_mesto'),
    addButton: document.querySelector('.profile__btn-add'),
    inputPlace: document.querySelector('.form__input_location'),
    inputSource: document.querySelector('.form__input_url')
};


export const imagePreviewConfig = {
    photoImage: document.querySelector('.popup__image'),
    altModal: document.querySelector('.popup__name')
};

export const popupsConfig = {
    popups: document.querySelectorAll('.popup'),
    buttonClosePopup: 'popup__close',
    buttonCloseModal: document.querySelector('.popup__close_photo'),
    popupOpened: 'popup_opened'
};

export const popupPhoto = document.querySelector('.popup_photo');

export const profileAvatar = document.querySelector('.profile__avatar-button')

export const avatarImg = document.querySelector('.profile__avatar')

export const avatarObj = {
    avatarPopup: document.querySelector('.popup_avatar'),
    avatarInput: document.querySelector('input[name="url"]')
}

export const validateConfig = {
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_status_error',
    inputErrorClass: 'form__input_status_error',
    errorClass: '.form__input-error_visible'
};

export const buttons = {
    avatar: document.querySelector('.popup__submit_avatar'),
    add: document.querySelector('.popup__submit_mesto'),
    edit: document.querySelector('.popup__submit_profile'),
}

export const popupsWithForm = {
    editPopup: document.querySelector('.popup_profile'),
    addPopup: document.querySelector('.popup_mesto'),
    avatar: document.querySelector('.popup_avatar'),
}