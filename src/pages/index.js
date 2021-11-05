import { Api } from "../components/api";
import Card from "../components/newCard"
import PopUp from "../components/PopUp"
import PopupWithImg from "../components/popupWithImg"
import PopupWithForm from "../components/popupWithForm"
import Section from "../components/Section"
import { UserInfo } from "../components/UserInfo"
import FormValidator from "../components/validate"
import {config, profileName, profileWork, profileAvatar} from "../components/constants"

let myId
let section
function getId(id) {
    myId = id
}

const api = new Api (config.baseUrl , config.headers)
const userInfo = new UserInfo('profile__name', 'profile__work-place', api)


Promise.all([userInfo.getUserInfo(), api.getInitialCards()]).then(([userData, cards] => {
    getId(userData._id)
    profileName.textContent = userData.name
    profileWork.textContent = userData.about
    profileAvatar.textContent = userData.avatar
    section = new Section({
        items: cards,
        renderer: (item) => {

        }
    })
})

const popUpWithImg = new PopupWithImg('.popup__photo')


//вызовы
popUpWithImg.setEventListeners()
