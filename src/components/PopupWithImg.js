import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._photo = this._popup.querySelector('.popup__image');
        this._title = this._popup.querySelector('.popup__name');
    }

    open({link, alt}) {
        this._photo.src = link;
        this._title.alt = alt;
        this._title.textContent = alt;
        super.open();
    }
}