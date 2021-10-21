//validity
export const arrForValidation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButton: '.popup__submit',
    disabledButtonSelector: 'popup__submit_status_error',
    errorInputSelector: 'form__input_status_error',
    errorClass: '.form__input-error_visible'
};


export const enableSubmitBtn = (submitButton, disabledButtonSelector) => {
    submitButton.classList.remove(disabledButtonSelector)
    submitButton.removeAttribute('disabled')
};

export const disableSubmitBtn = (submitButton, disabledButtonSelector) => {
    submitButton.classList.add(disabledButtonSelector);
    submitButton.setAttribute('disabled', 'disabled')
};`

`
export function hasInvalidInput (inputs) {
    return inputs.every((input) => {
        return input.validity.valid;
    })

}

export function toggleButtonState (inputs, submitButton, disabledButtonSelector) {
    if (hasInvalidInput(inputs)) {
        enableSubmitBtn(submitButton , disabledButtonSelector)
    } else {
        disableSubmitBtn(submitButton , disabledButtonSelector)
    }
}





const hideInputError = (inputSelector, errorInputSelector, errorClass) => {
    const errorPlace = document.getElementById(`${inputSelector.name}-error`)
    inputSelector.classList.remove(errorInputSelector);
    errorPlace.classList.remove(errorClass);
    errorPlace.textContent = '';
};

const showInputError = (inputSelector, errorInputSelector, errorClass) => {
    const errorPlace = document.getElementById(`${inputSelector.name}-error`)
    inputSelector.classList.add(errorInputSelector);
    errorPlace.textContent = inputSelector.validationMessage;
    errorPlace.classList.add(errorClass);
};

export const inputIsValid = (inputSelector, errorInputSelector, errorClass) => {
    if (inputSelector.validity.valid) {
        hideInputError(inputSelector, errorInputSelector, errorClass)
    } else {
        showInputError(inputSelector, errorInputSelector, errorClass)
    }
}



export function enableValidation ({formSelector, inputSelector, submitButton, disabledButtonSelector, errorInputSelector, errorClass}) {
    const forms = document.querySelectorAll(formSelector)
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

