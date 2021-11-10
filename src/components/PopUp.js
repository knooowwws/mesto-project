import {popupsConfig} from "../components/constants";
export class Popup {
    constructor(popup) {
        this._popup = popup;
    }
    open() {
        this._popup.classList.add(popupsConfig.popupOpened);
        document.addEventListener('keydown', this._closePopupByEsc);
    }
    close() {
        this._popup.classList.remove(popupsConfig.popupOpened);
        document.removeEventListener('keydown', this._closePopupByEsc);
    }
    _closePopupByEsc = (evt) => {
        if(evt.key === 'Escape') {
            this.close(this._popup);
        }
    }
    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if(evt.target.classList.contains(popupsConfig.buttonClosePopup)) {
                this.close(this._popup);
            }
            if(evt.target.classList.contains(popupsConfig.popupOpened)) {
                this.close(this._popup);
            }
        })
    }}