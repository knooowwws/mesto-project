export class FormValidate {
    constructor(data, form) {
        this._data = data;
        this._form = form;
    }

    _showErrorMessage(input, errorMessage) {
        const errorElement = this._form.querySelector(`#${input.name}-error`);
        input.classList.add(this._data.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._data.errorClass);
    }

    _hideErrorMessage(input) {
        const errorElement = this._form.querySelector(`#${input.name}-error`);
        input.classList.remove(this._data.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._data.errorClass);
    }

    _isValid(input) {
        if (!input.validity.valid) {
            this._showErrorMessage(input, input.validationMessage);
        } else {
            this._hideErrorMessage(input);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((input) => {
            return !input.validity.valid;
        })
    }

    _disabledBtn(buttonElement) {
        buttonElement.classList.add(this._data.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled');
    }
    
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
          this._disabledBtn(buttonElement)
        } else {
            buttonElement.classList.remove(this._data.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._data.inputSelector));
        const buttonElement = this._form.querySelector(this._data.submitButtonSelector);

        this._form.addEventListener('reset', () => {
          this._disabledBtn(buttonElement)
        })
        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._isValid(input);
                this._toggleButtonState(inputList, buttonElement);
            });
        })
    }

    enableValidation() {
        this._setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
    }
}