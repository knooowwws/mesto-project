//POPUPS
import {
    arrForValidation,
    disableSubmitBtn,
    enableSubmitBtn,
    enableValidation,
    hasInvalidInput,
    inputIsValid, toggleButtonState
} from "./validate";


export default class PopUp {
    constructor(selectorPopUp) {
        this.popup = document.querySelector(selectorPopUp)
        this.allCloseButton = document.querySelectorAll('.popup__close')
    }

    openPopup = (popup) => {
        this.popup.classList.add('popup_opened')
        document.addEventListener('keydown', this.closePopUpWithEsc)
        this.popup.addEventListener('click', this.closePopupWithOverlay);
    }

    ClosePopUpWithButton() {
        this.allCloseButton.forEach(elem => {
            elem.addEventListener('click', (evt) => this.closePopup(evt.target.closest('.popup')))
        })
    }

    closePopup = (popup) => {
        document.removeEventListener('keydown', this.closePopUpWithEsc)
        this.popup.removeEventListener('click', this.closePopupWithOverlay);
        this.popup.classList.remove('popup_opened')
    }

    closePopUpWithEsc = (evt) => {
        if (evt.key === "Escape") {
            this.closePopup(document.querySelector(".popup_opened"));
        }
    }

    closePopupWithOverlay = (evt) => {
        if (evt.target.classList.contains('popup')) {
            const popup = evt.target.closest('.popup')
            this.closePopup(popup);
        }
    }
}

 export const openModalPhoto = (cardEl) => {
    modalPhoto.querySelector('.popup__image').src = cardEl.link
    modalPhoto.querySelector('.popup__image').alt = cardEl.name
    modalPhoto.querySelector('.popup__name').textContent = cardEl.name
    openPopup(modalPhoto)
}
