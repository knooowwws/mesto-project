const profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileWork = profile.querySelector('.profile__work-place');
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
const modalAdd = document.querySelector('.popup_mesto')
const modalPhoto = document.querySelector('.popup_photo')



// FUNCTIONS
let openPopup = (popup) => {
    popup.classList.add('popup_opened')
}

let closePopup = (popup) => {
    popup.classList.remove('popup_opened')
}

let closeAllPopUps = () => {
    document.querySelectorAll('.popup__close').forEach(elem => {
        elem.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup')))
    })
}
closeAllPopUps();

let openModalPhoto = (cardEl) => {
    modalPhoto.querySelector('.popup__image').src = cardEl.url
    modalPhoto.querySelector('.popup__name').textContent = cardEl.name
    openPopup(modalPhoto)
}

let makeCard = (cardEl) => {
    const card = cardTemplate.querySelector('.cards__item').cloneNode(true);
    card.querySelector('.cards__name').textContent = cardEl.name;
    card.querySelector('.cards__img').src = cardEl.url;
    card.querySelector('.cards__btn').addEventListener('click', (evt) => {evt.target.classList.toggle('cards__btn_like')})
    card.querySelector('.cards__trash').addEventListener('click', (evt) => {evt.target.closest('.cards__item').remove()})
    card.querySelector('.cards__img').addEventListener('click', () => openModalPhoto(cardEl))
    return card;
}

let addCards = (cardEl) => {
    document.querySelector('.cards').prepend(makeCard(cardEl));
}

let initialCardGenerate = () => {
    initialCards.forEach(el => {
        addCards(el)
    })
}
initialCardGenerate();


// CALLBACKS
// profile
profileEditButton.addEventListener('click', () => {
    openPopup(modalProfile);
    modalProfile.querySelector('.form__input_name').value = profileName.textContent;
    modalProfile.querySelector('.form__input_profile').value = profileWork.textContent;
})

modalProfile.querySelector('.popup__submit_profile').addEventListener('click', (evt) => {
    evt.preventDefault();
    profileName.textContent = modalProfile.querySelector('.form__input_name').value;
    profileWork.textContent = modalProfile.querySelector('.form__input_profile').value;
    closePopup(modalProfile)
})

// add
profile.querySelector('.profile__btn-add').addEventListener('click', () => openPopup(modalAdd));
modalAdd.querySelector('.popup__submit_mesto').addEventListener('click', (evt) => {
    evt.preventDefault();
    const cardEl = {
        name: modalAdd.querySelector('.form__input_location').value,
        url: modalAdd.querySelector('.form__input_url').value
    }
    addCards(cardEl);
    modalAdd.querySelector('.form__input_location').value = ''
    modalAdd.querySelector('.form__input_url').value = ''
    closePopup(modalAdd);
})
