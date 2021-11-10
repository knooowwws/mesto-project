import './index.css';

import { Api } from "../components/api";
import {Card} from "../components/newCard"
import PopUp from "../components/PopUp"
import {PopupWithImg} from "../components/popupWithImg"
import {PopupWithForm} from "../components/popupWithForm"
import {Section} from "../components/Section"
import { UserInfo } from "../components/UserInfo"
import FormValidator from "../components/validate"
import {config, profileName, profileWork, profileAvatar,modalProfile, template, cardSection , photoModal} from "../components/constants"

let myId
let section
function getId(id) {
    myId = id
}

const popUpWithImg = new PopupWithImg('.popup_photo')
const api = new Api (config)
const userInfo = new UserInfo('profile__name', 'profile__work-place', api)

const cardRender = (item) => {
	let liked = false;
	let myCard = false;
	item.likes.forEach(function (el) {
		if (el._id === myId) {
			liked = true;
		}
	});
	if (item.owner._id === myId) {
		myCard = true;
	}
	const card = new Card(item, api, liked, myCard, (evt) => {
	    console.log(card)


    });
	card.addCard(template, cardSection);

};

Promise.all([api.getUserProfile(), api.getInitialCards()]).then(([userData, cards]) => {
    getId(userData._id)
    profileName.textContent = userData.name
    profileWork.textContent = userData.about
    profileAvatar.src = userData.avatar
    section = new Section({
        items: cards,
        renderer: function (item) {
         cardRender(item);
        }
    }, cardSection);
   section.renderItems();
})


// const popupFormEditProfile = new PopupWithForm(modalProfile, (newData) => {
//     // popupFormEditProfile.renderLoading(true)
//     api.saveProfileData(newData.name , newData.about)
//       .then((res) => {
//         userInfo.setUserInfo(res)
//         popupFormEditProfile.close()
//       })
//       .catch((err) => console.log(err))
//     //   .finally(() => popupFormEditProfile.renderLoading(false))
//   })
//   popupFormEditProfile.setEventListeners();


popUpWithImg.setEventListeners()

