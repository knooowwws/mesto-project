import PopUp from "./PopUp";

export class PopupWithImg extends PopUp {
    constructor(popupSelector) {
        super(popupSelector)

        this.image = this.popup.querySelector('.popup__image')
        this.imageText = this.popup.querySelector('.popup__name')
    }

    open(name, link) {
        super.open()

        this.image.setAttribute('src', link)
        this.image.setAttribute('alt', name)
        this.imageText.textContent = name;
    }
}