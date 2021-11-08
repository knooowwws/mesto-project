import PopUp from "./PopUp";

export class PopupWithImg extends PopUp {
  constructor (popupSelector) {
    super (popupSelector)

    this.image = this.popup.querySelector('.popup__image')
    this.imageText = this.popup.querySelector('.popup__name')
  }
   open(item) {
     super.open()
     
     this.image.setAttribute('src' , item.link)
     this.image.setAttribute('alt' , item.name)
     this.imageText.textContent = item.name;
   }
}