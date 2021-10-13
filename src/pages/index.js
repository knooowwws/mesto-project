import './index.css'
import  {makeCard, addCards} from "../components/card";
import {openPopup, closePopup, closePopUpWithEsc, closeAllPopUps, closePopupWithOverlay, openModalPhoto, modalPhoto} from "../components/modal";
import {enableValidation, disableSubmitBtn, obj} from "../components/validate";
import {initialCardGenerate} from "../components/utils";

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


const modalProfile = document.querySelector('.popup_profile')
const inputName = modalProfile.querySelector('.form__input_name');
const inputProfile = modalProfile.querySelector('.form__input_profile');


const modalAdd = document.querySelector('.popup_mesto')
const inputLocation = modalAdd.querySelector('.form__input_location');
const inputUrl = modalAdd.querySelector('.form__input_url');



//CARDS GENERATE

initialCardGenerate(initialCards);


// CALLBACKS
// profile

closeAllPopUps();
document.querySelector('.popup__close').addEventListener('click', closePopup)

//открытие попапа с редактирование профиля
profileEditButton.addEventListener('click', () => {
    openPopup(modalProfile);
    inputName.value = profileName.textContent;
    inputProfile.value = profileWork.textContent;
})

//Обработка события форма редактирования профиля
modalProfile.querySelector('.form_profile').addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileWork.textContent = inputProfile.value;
    closePopup(modalProfile)
})

// add
//Открытие попапа с добавлением места
profile.querySelector('.profile__btn-add').addEventListener('click', () => {
    openPopup(modalAdd)
    disableSubmitBtn(obj.submitButtonSelector, obj.disabledButtonSelector)
});


modalAdd.querySelector('.form_mesto').addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cardEl = {
        name: inputLocation.value,
        url: inputUrl.value
    }
    addCards(cardEl);
    inputLocation.value = ''
    inputUrl.value = ''
    closePopup(modalAdd);
})



//validity

enableValidation(obj)





