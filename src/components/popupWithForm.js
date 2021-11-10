import { Popup } from "./Popup";
export class PopupWithForm extends Popup {
  constructor(popup, {submitHandler}) {
    super(popup);
    this._submitForm = submitHandler;
    this._form = this._popup.querySelector('.form')
  }
  _getInputValues() {
    this._inputValues = {};
    this._inputsList = this._form.querySelectorAll('.form__input');
    this._inputsList.forEach(input => this._inputValues[input.name] = input.value);
    return this._inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    })
  }
  close() {
    super.close();
    this._form.reset();
  }
}