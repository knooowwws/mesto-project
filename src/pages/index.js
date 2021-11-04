import { Api } from "../components/api";
import Card from "../components/newCard"
import PopUp from "../components/PopUp"
import PopupWithImg from "../components/popupWithImg"
import PopupWithForm from "../components/popupWithForm"
import Section from "../components/Section"
import { UserInfo } from "../components/UserInfo"
import FormValidator from "../components/validate"
import config from "../components/constants"

const api = new Api (config.baseUrl , config.headers)
const renderProfile = new UserInfo(api.getUserProfile.name, api.getUserProfile.about, api.getUserProfile.avatar)
const popUpWithImg = new PopupWithImg('.popup__photo')
const popUpSetPhoto  = new PopupWithForm('.popup_avatar', (data) => {
    api.saveProfileAvatar(data.avatar)
})
const popUpAddMesto  = new PopupWithForm('.popup_mesto', (data) => {
    api.addNewCard(data.name, data.link)
})


//вызовы
popUpWithImg.setEventListeners()
popUpSetPhoto.setEventListener()
popUpAddMesto.setEventListener()
