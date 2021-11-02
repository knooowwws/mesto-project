import PopUp from "./PopUp";

export class PopupWithForm extends PopUp {
  constructor(popupSelector , handleSubmit){
    super(popupSelector);
    this._handleSubmit = handleSubmit;
  }
  _getInputValues() {
    const inputs = Array.from(this.popup.querySelector('.form__input'));
    inputs.forEach((item) => {
       //?//
    })
  }
  setEventListeners(){
    super.setEventListeners();
    this.popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      //?///
    })
  }
  close() {
    super.close();
    this.popup.querySelector('.form').reset()
  }
}