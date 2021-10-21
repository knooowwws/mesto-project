//POPUPS
import {
    arrForValidation,
    disableSubmitBtn,
    enableSubmitBtn,
    enableValidation,
    hasInvalidInput,
    inputIsValid, toggleButtonState
} from "./validate";

export const modalPhoto = document.querySelector('.popup_photo')


export const openPopup = (popup) => {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', closePopUpWithEsc)
    popup.addEventListener('click', closePopupWithOverlay);
}

export const closePopup = (popup) => {
    document.removeEventListener('keydown', closePopUpWithEsc)
    popup.removeEventListener('click', closePopupWithOverlay);
    popup.classList.remove('popup_opened')
}

export const closePopUpWithEsc = (evt) => {
    if (evt.key === "Escape") {
        const popup = document.querySelector(".popup_opened")
        closePopup(popup);
    }
}

export const closePopupWithOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
        const popup = evt.target.closest('.popup')
        closePopup(popup);
    }
}


 export const openModalPhoto = (cardEl) => {
    modalPhoto.querySelector('.popup__image').src = cardEl.link
    modalPhoto.querySelector('.popup__image').alt = cardEl.name
    modalPhoto.querySelector('.popup__name').textContent = cardEl.name
    openPopup(modalPhoto)
}
