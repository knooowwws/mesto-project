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
    constructor ({submitButtonSelector, input, disableSubmitBtnSelector , errorInput , errorClassSelector} , form){
      this._submitButtonSelector = submitButtonSelector;
      this._input = input;
      this._disableSubmitBtnSelector = disableSubmitBtnSelector;
      this._errorInput = errorInput;
      this._errorClassSelector =  errorClassSelector;
      this._form = form;
    }
   
   _setEventListeners () {
    const inputs = Array.from(this._form.querySelectorAll(this.inputSelector))
    const submitButt = this._form.querySelector(this._submitButtonSelector)

    inputs.forEach(input => {
        input.addEventListener('input', (_) => {
            this._toggleButtonState(inputs, submitButt, disabledButtonSelector)
            this._inputIsValid(input, this._errorInputSelector, errorClass)
        })
    })
      this._form.addEventListener('submit' , () => {
      submitButt.classList.add(this._disableSubmitBtnSelector)
     })
 }

  _enableSubmitBtn = (submitButton, disabledButtonSelector) => {
    submitButton.classList.remove(disabledButtonSelector)
    submitButton.removeAttribute('disabled')
};

  _disableSubmitBtn = (submitButtonSelector, disabledButtonSelector) => {
    submitButtonSelector.classList.add(disabledButtonSelector);
    submitButtonSelector.setAttribute('disabled', 'disabled')
}

  _hasInvalidInput (inputs) {
    return inputs.every((input) => {
        return input.validity.valid;
    })

}
  _toggleButtonState (inputs, submitButton, disabledButtonSelector) {
    if (this._hasInvalidInput(inputs)) {
        this._enableSubmitBtn(submitButton , disabledButtonSelector)
    } else {
        this._disableSubmitBtn(submitButton , disabledButtonSelector)
    }
}
   _hideInputError = (inputSelector, errorInputSelector, errorClass) => {
    const errorPlace = this._form.getElementById(`${inputSelector.name}-error`)
    inputSelector.classList.remove(this._errorInputSelector);
    errorPlace.classList.remove(this._errorClass);
    errorPlace.textContent = '';
};

  _showInputError = (inputSelector, errorInputSelector, errorClass) => {
    const errorPlace = this._form.getElementById(`${inputSelector.name}-error`)
    inputSelector.classList.add(this._errorInputSelector);
    errorPlace.textContent = inputSelector.validationMessage;
    errorPlace.classList.add(this._errorClass);
};

 _inputIsValid = (inputSelector, errorInputSelector, errorClass) => {
    if (inputSelector.validity.valid) {
        this._hideInputError(inputSelector, errorInputSelector, errorClass)
    } else {
        this._showInputError(inputSelector, errorInputSelector, errorClass)
    }
}
 enableValidation ({form, input, submitButtonSelector, disabledButtonSelector, errorInput, errorClassSelector}) {
       
        forms.forEach(form => {
            form.addEventListener('submit', e => {
                e.preventDefault()
            })
            const inputs = Array.from(form.querySelectorAll(inputSelector))
            const submitButt = form.querySelector(submitButton)
    
            inputs.forEach(input => {
                input.addEventListener('input', (_) => {
                    toggleButtonState(inputs, submitButt, disabledButtonSelector)
                    inputIsValid(input, errorInputSelector, errorClass)
                })
            })
        })
}
}