//validity
/*
export const arrForValidation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButton: '.popup__submit',
    disabledButtonSelector: 'popup__submit_status_error',
    errorInputSelector: 'form__input_status_error',
    errorClass: '.form__input-error_visible'
};

*/
export class FormValidator {
  constructor(config, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButton = config. submitButton;
    this._disabledButtonSelector = config.disabledButtonSelector;
    this._errorInputSelector = config.errorInputSelector;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButton);
  }

   _enableSubmitBtn = () => {
    this._submitButton.classList.remove(this._disabledButtonSelector);
    this._submitButton.removeAttribute("disabled");
   };

   _disableSubmitBtn = () => {
    this._submitButtonSelector.classList.add(this._disabledButtonSelector);
    this._submitButtonSelector.setAttribute("disabled", "disabled");
  };

   _hasInvalidInput(inputList) {
    return inputList.every((input) => {
      return input.validity.valid;
    });
  }
   _toggleButtonState() {
    if (this._hasInvalidInput(inputs)) {
      this._enableSubmitBtn();
    } else {
      this._disableSubmitBtn();
    }
  }

  _hideInputError = (inputSelector) => {
    const errorPlace = this._formSelector.getElementById(`${inputSelector.name}-error`);
    inputSelector.classList.remove(this._errorInputSelector);
    errorPlace.classList.remove(this._errorClass);
    errorPlace.textContent = "";
  };

  _showInputError = (inputSelector) => {
    const errorPlace = this._formSelector.getElementById(`${inputSelector.name}-error`);
    inputSelector.classList.add(this._errorInputSelector);
    errorPlace.textContent = inputSelector.validationMessage;
    errorPlace.classList.add(this._errorClass);
  };

  _inputIsValid = (inputSelector) => {
    if (inputSelector.validity.valid) {
      this._hideInputError(inputSelector);
    } else {
      this._showInputError(inputSelector, inputSelector.validationMessage);
    }
  };
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
         this._toggleButtonState();
         this._inputIsValid(inputSelector);
     });
  });
   this._formSelector.addEventListener("submit", () => {
     this._submitButton.classList.add(this._disabledButtonSelector);
   });
  }
  enableValidation(){
    this._setEventListeners()
  }
}
