const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileWork = profile.querySelector('.profile__work-place');
const profileEditButton = profile.querySelector('.profile__btn-edit');
const initialCards = [
    {
        name: 'Бали',
        url: 'https://images.unsplash.com/photo-1599459657946-43a884745e2a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8JUQwJUIxJUQwJUIwJUQwJUJCJUQwJUI4fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'
    },
    {
        name: 'Паттайя',
        url: 'https://images.unsplash.com/photo-1599851245208-c1e43c053710?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGF0dGF5YXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'
    },
    {
        name: 'Астрахань',
        url: 'https://images.unsplash.com/photo-1598005532665-fe6b80edba55?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1866&q=80'
    },
    {
        name: 'Дагестан',
        url: 'https://images.unsplash.com/photo-1617911478288-ac9559802681?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFnZXN0YW58ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'
    },
    {
        name: 'Холмогорский район',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardTemplate = document.querySelector('.card').content;

const modalProfile = document.querySelector('.popup_profile')
const inputName = modalProfile.querySelector('.form__input_name');
const inputProfile = modalProfile.querySelector('.form__input_profile');


const modalAdd = document.querySelector('.popup_mesto')
const inputLocation = modalAdd.querySelector('.form__input_location');
const inputUrl = modalAdd.querySelector('.form__input_url');


const modalPhoto = document.querySelector('.popup_photo')



// FUNCTIONS

//POPUPS
const openPopup = (popup) => {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', closePopUpWithEsc)
    popup.addEventListener('click', closePopupWithOverlay);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened')
    popup.addEventListener('click', closePopupWithOverlay);
}

const closePopUpWithEsc = (evt) => {
    if (evt.key === "Escape") {
        const popup = document.querySelector(".popup_opened")
        closePopup(popup);
    }
}

const closePopupWithOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
        const popup = document.querySelector(".popup_opened")
        closePopup(popup);
    }
}

// document.querySelector('.popup').addEventListener('click', closePopup)


const closeAllPopUps = () => {
    document.querySelectorAll('.popup__close').forEach(elem => {
        elem.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup')))
    })
}
closeAllPopUps();

const openModalPhoto = (cardEl) => {
    modalPhoto.querySelector('.popup__image').src = cardEl.url
    modalPhoto.querySelector('.popup__name').textContent = cardEl.name
    openPopup(modalPhoto)
}

//CARDS

const makeCard = (cardEl) => {
    const card = cardTemplate.querySelector('.cards__item').cloneNode(true);
    card.querySelector('.cards__name').textContent = cardEl.name;
    card.querySelector('.cards__img').src = cardEl.url;
    card.querySelector('.cards__btn').addEventListener('click', (evt) => {evt.target.classList.toggle('cards__btn_like')})
    card.querySelector('.cards__trash').addEventListener('click', (evt) => {evt.target.closest('.cards__item').remove()})
    card.querySelector('.cards__img').addEventListener('click', () => openModalPhoto(cardEl))
    return card;
}

const addCards = (cardEl) => {
    document.querySelector('.cards').prepend(makeCard(cardEl));
}

const initialCardGenerate = () => {
    initialCards.forEach(el => {
        addCards(el)
    })
}
initialCardGenerate();


// CALLBACKS
// profile
profileEditButton.addEventListener('click', () => {
    openPopup(modalProfile);
    inputName.value = profileName.textContent;
    inputProfile.value = profileWork.textContent;
})

modalProfile.querySelector('.form_profile').addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileWork.textContent = inputProfile.value;
    closePopup(modalProfile)
})

// add
profile.querySelector('.profile__btn-add').addEventListener('click', () => openPopup(modalAdd));
modalAdd.querySelector('.form_mesto').addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cardEl = {
        name: inputLocation.value,
        url: inputUrl.value
    }
    addCards(cardEl);
    evt.reset()
    // inputLocation.value = ''
    // inputUrl.value = ''
    closePopup(modalAdd);
})



//validity
const obj = {
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

const disableSubmitBtn = (submitButtonSelector, disabledButtonSelector) => {
    submitButtonSelector.classList.add(disabledButtonSelector);
    submitButtonSelector.setAttribute('disabled', 'disabled')
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



function enableValidation ({formSelector, inputSelector, submitButtonSelector, disabledButtonSelector, errorInputSelector, errorClass}) {
    const forms = document.querySelectorAll(formSelector)
    forms.forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault()
            form.reset()
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

enableValidation(obj)





