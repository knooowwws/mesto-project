import PopUp from "./PopUp";

export class PopupWithForm extends PopUp {
  constructor(popupSelector , handleSubmit){
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this.saveButtom = this.popup.querySelector('.popup__submit')
  }
  _getInputValues() {
    const inputs = Array.from(this.popup.querySelector('.form__input'));
    const data = {}
    inputs.forEach((item) => {
      data[item.name] = item.value;
    })
    return data;
  }
  setEventListeners(){
    super.setEventListeners();
    this.popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleSubmit(this._getInputValues());
      this.close();
    })
  }
  
  _loadRender(isLoading) {
    if (isLoading) {
      this.saveButtom.textContent = 'Сохранение...';
    } else {
      this.saveButtom.textContent = 'Создать';
    }
}
  close() {
    super.close();
    this.popup.querySelector('.form').reset()
  }
}