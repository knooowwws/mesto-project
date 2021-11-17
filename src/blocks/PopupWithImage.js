import PopUp from './modal.js'

export class PopupWithImage extends PopUp {
    constructor(popupSelector, cardEl) {
        super(popupSelector);
        this._image = this.popup.querySelector('.popup__image')
        // this._alt = this.popup.querySelector('.popup__image')
        this._name = this.popup.querySelector('.popup__name')
    }

    open() {
        this._image.src = cardEl.link
        this._image.alt = cardEl.name
        this._name.textContent = cardEl.name
        this.open(this._image)
    }
}