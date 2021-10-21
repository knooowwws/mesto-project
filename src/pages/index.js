import './index.css';
import {addInitialCards, makeCard, addCards, getId, getArrayCards, userId, getUserId, addNewUserCard} from "../components/card";
import {openPopup, closePopup, closePopUpWithEsc, closePopupWithOverlay, openModalPhoto, modalPhoto} from "../components/modal";
import {enableValidation, disableSubmitBtn, arrForValidation} from "../components/validate";
// import {initialCardGenerate} from "../components/utils";
import {getInitialCards, getUserProfile, saveProfileAva, saveProfileAvatar} from "../components/api";
import {handlerProfileFormSubmit, renderUserProfile, updateAva} from "../components/profile";

const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profileWork = profile.querySelector('.profile__work-place');
const profileEditButton = profile.querySelector('.profile__btn-edit');
export const profileAvatar = profile.querySelector('.profile__avatar')

export const modalProfile = document.querySelector('.popup_profile')
export const inputName = modalProfile.querySelector('.form__input_name');
export const inputProfile = modalProfile.querySelector('.form__input_profile');

export const modalAvatar = document.querySelector('.popup_avatar')
export const formAvatar = modalAvatar.querySelector('.form_avatar')
export const inputAvatar = formAvatar.querySelector('.form__input_avatar')

export const modalAdd = document.querySelector('.popup_mesto')
export const formMesto = modalAdd.querySelector('.form_mesto')
export const inputLocation = modalAdd.querySelector('.form__input_location');
export const inputUrl = modalAdd.querySelector('.form__input_url');
export const modalAddBtn = modalAdd.querySelector('.popup__submit_mesto')

// CALLBACKS
// profile

// closeAllPopUps();
document.querySelectorAll('.popup__close').forEach(elem => {
    elem.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup')))
})

//открытие попапа с редактированием профиля
profileEditButton.addEventListener('click', () => {
    openPopup(modalProfile);
    inputName.value = profileName.textContent;
    inputProfile.value = profileWork.textContent;
})

//Обработка события форма редактирования профиля
modalProfile.querySelector('.form_profile').addEventListener('submit', (evt) => {
 handlerProfileFormSubmit()
})

//открытие попапа редактирования авы
profileAvatar.addEventListener('click', () => openPopup(modalAvatar))

formAvatar.addEventListener('submit', () => {
    updateAva()
})

// add
//Открытие попапа с добавлением места
profile.querySelector('.profile__btn-add').addEventListener('click', () => {
    openPopup(modalAdd)
    disableSubmitBtn(modalAddBtn, arrForValidation.disabledButtonSelector)
});


formMesto.addEventListener('submit', (evt) => {
    addNewUserCard()
    disableSubmitBtn(modalAddBtn, arrForValidation.disabledButtonSelector)
})

//рендер информации о пользователе и карточек с сервера
Promise.all([getUserProfile(), getInitialCards()]).then(r => {
    // console.log(r)
    getId(r[0]._id)
    renderUserProfile(r[0].name, r[0].about, r[0].avatar)
    addInitialCards(r[1])
})


//validity

enableValidation(arrForValidation)





