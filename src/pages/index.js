import { Api } from "../components/api";
import {Card} from "../components/newCard"
import PopUp from "../components/PopUp"
import {PopupWithImg} from "../components/popupWithImg"
import PopupWithForm from "../components/popupWithForm"
import {Section} from "../components/Section"
import { UserInfo } from "../components/UserInfo"
import FormValidator from "../components/validate"
import {config, profileName, profileWork, profileAvatar, template, cardSection , photoModal} from "../components/constants"

let myId
let section
function getId(id) {
    myId = id
}

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
	const card = new Card(item, template, api, liked, myCard, /*photoModal.open.bind(photoModal) */);
	card.addCard(template, cardSection);
};

console.log(api.getUserProfile())
console.log(api.getInitialCards())

Promise.all([api.getUserProfile(), api.getInitialCards()]).then(([userData, cards]) => {
    getId(userData._id)
    profileName.textContent = userData.name
    profileWork.textContent = userData.about
    profileAvatar.textContent = userData.avatar
    section = new Section({
        items: cards,
        renderer: function (item) {
         cardRender(item);
        }
    }, cardSection);
   section.renderItems();
})

const popUpWithImg = new PopupWithImg('.popup_photo')


//вызовы
popUpWithImg.setEventListeners()
