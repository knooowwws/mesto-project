export default class PopUp {
    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector)
        
    }
    open() {
        this.popup.classList.add('popup_opened')
        document.addEventListener('keydown', this.closePopUpWithEsc)
    }

    ClosePopUpWithButton() {
        this.allCloseButton.forEach(elem => {
            elem.addEventListener('click', (evt) => this.close(evt.target.closest('.popup')))
        })
    }

    close = () => {
        document.removeEventListener('keydown', this.closePopUpWithEsc)
        this.popup.classList.remove('popup_opened')
    }

    closePopUpWithEsc = (evt) => {
        if (evt.key === "Escape") {
            this.close(document.querySelector(".popup_opened"));
        }
    }

    closePopupWithOverlay = (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }

    setEventListeners() {
        this.popup.querySelector('.popup__close').addEventListener('click', this.closePopup)
    }
}
