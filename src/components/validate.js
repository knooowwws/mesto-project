//validity
export const arrForValidation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__submit',
    disabledButtonSelector: 'popup__submit_status_error',
    errorInputSelector: 'form__input_status_error',
    errorClass: '.form__input-error_visible'
};


const enableSubmitBtn = (submitButtonSelector, disabledButtonSelector) => {
    submitButtonSelector.classList.remove(disabledButtonSelector)
    submitButtonSelector.removeAttribute('disabled')
};

export const disableSubmitBtn = (submitButtonSelector, disabledButtonSelector) => {
    document.querySelector('.popup__submit').classList.add(disabledButtonSelector);
    document.querySelector('.popup__submit').setAttribute('disabled', 'disabled')
};


function hasInvalidInput (inputs) {
    return inputs.every((input) => {
        return input.validity.valid;
    })

}

function toggleButtonState (inputs, submitButtonSelector, disabledButtonSelector) {
    if (hasInvalidInput(inputs)) {
        enableSubmitBtn(submitButtonSelector , disabledButtonSelector)
    } else {
        disableSubmitBtn(submitButtonSelector , disabledButtonSelector)
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

const inputIsValid = (inputSelector, errorInputSelector, errorClass) => {
    if (inputSelector.validity.valid) {
        hideInputError(inputSelector, errorInputSelector, errorClass)
    } else {
        showInputError(inputSelector, errorInputSelector, errorClass)
    }
}



export function enableValidation ({formSelector, inputSelector, submitButtonSelector, disabledButtonSelector, errorInputSelector, errorClass}) {
    const forms = document.querySelectorAll(formSelector)
    forms.forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault()
        })
        const inputs = Array.from(form.querySelectorAll(inputSelector))
        const submitButt = form.querySelector(submitButtonSelector)

        inputs.forEach(input => {
            input.addEventListener('input', (_) => {
                toggleButtonState(inputs, submitButt, disabledButtonSelector)
                inputIsValid(input, errorInputSelector, errorClass)
            })
        })
    })
}

enableValidation(arrForValidation)
