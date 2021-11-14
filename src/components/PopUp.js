import {popupsConfig} from "../utils/constants";

export class Popup {
    constructor(popup) {
        this._popup = popup;
    }

    open() {
        this._popup.classList.add(popupsConfig.popupOpened);
        document.addEventListener('keydown', this._closePopupWithEsc);
    }

    close() {
        this._popup.classList.remove(popupsConfig.popupOpened);
        document.removeEventListener('keydown', this._closePopupWithEsc);
    }

    _closePopupWithEsc = (evt) => {
        if (evt.key === 'Escape') {
            this.close(4);
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains(popupsConfig.buttonClosePopup)) {
                this.close();
            }
            if (evt.target.classList.contains(popupsConfig.popupOpened)) {
                this.close();
            }
        })
    }
}