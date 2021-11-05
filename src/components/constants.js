export const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-2',
    headers: {
        authorization: 'f8b50c22-f9ea-4450-b40d-792adb8f1524',
        'Content-Type': 'application/json'
    }
}


const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profileWork = profile.querySelector('.profile__work-place');
const profileEditButton = profile.querySelector('.profile__btn-edit');
export const profileAvatar = profile.querySelector('.profile__avatar')

export const modalProfile = document.querySelector('.popup_profile')
export const inputName = modalProfile.querySelector('.form__input_name');
export const inputProfile = modalProfile.querySelector('.form__input_profile');

export const modalAvatar = document.querySelector('.popup_avatar')
export const formAvatar = modalAvatar.querySelector('.form_avatar')
export const inputAvatar = formAvatar.querySelector('.form__input_avatar')

export const modalAdd = document.querySelector('.popup_mesto')
export const formMesto = modalAdd.querySelector('.form_mesto')
export const inputLocation = modalAdd.querySelector('.form__input_location');
export const inputUrl = modalAdd.querySelector('.form__input_url');
export const modalAddBtn = modalAdd.querySelector('.popup__submit_mesto')