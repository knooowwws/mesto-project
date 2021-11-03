import PopUp from "./PopUp";

export class PopupWithImg extends PopUp {
  constructor (popupSelector) {
    super (popupSelector)

    this.image = this.popup.querySelector('.popup__photo')
    this.imageText = this.popup.querySelector('.popup__name')
  }
   open(popup) {
     super.open()
     
     this.image.setAttribute('src' , popup.link)
     this.image.setAttribute('alt' , popup.name)
     this.imageText.textContent = popup.name;
   }
}