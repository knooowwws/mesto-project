import './index.css';
import { Api } from "../components/api";
import {Card} from "../components/newCard"
import { Popup } from '../components/Popup';
import {PopupWithImage} from "../components/popupWithImg"
import { PopupWithForm } from '../components/popupWithForm';
import {Section} from "../components/Section"
import { UserInfo } from "../components/UserInfo"
import {FormValidate} from "../components/validate"
import {config , cardConfig , profile , avatar, avatarObj , imagePreviewConfig, popupEditConfig , popupPhoto , nameInput, aboutInput, profileAvatar, popupAddConfig , validateConfig, buttons} from "../components/constants"
//api
const api = new Api(config)
// user Info -
const userInfo = new UserInfo(popupEditConfig.nameInfo, popupEditConfig.jobInfo, profileAvatar);  //При изменении объекта на простую константу - всё ломается
// Модальные окна +
const popupWithImg = new PopupWithImage(popupPhoto);

const popupAdd = new PopupWithForm(popupAddConfig.popupAdd, {
    submitHandler: (data) => {
        buttons.add.textContent = 'Сохранение ...';
        api.addNewCard(data.place, data.link)
            .then(result => {
                const addCard = createCard(result);
                section.addItem(addCard, 'prepend');
                popupAdd.close();
            })
            .catch(result => console.log(`при добавлении карточки ошибка ${result}`))
            .finally(() => {
                buttons.add.textContent = 'Сохранить'
            })
    }
});
const popupEdit = new PopupWithForm(popupEditConfig.editPopup, {
    submitHandler: (data) => {
        buttons.edit.textContent = 'Сохранение ...';
        api.saveProfileData(data.name, data.about)
            .then(result => {
                userInfo.setUserInfo(result.name, result.about)
                popupEdit.close()
            })
            .catch(result => console.log(`${result} при отправке данных пользователя`))
            .finally(() => buttons.edit.textContent = 'Сохранить')
    }
});

const popupAvatar = new PopupWithForm(avatarObj.avatarPopup, {
    submitHandler: (data) => {
        buttons.avatar.textContent = 'Сохранение ...';
        api.saveProfileAvatar(data.avatar)
            .then(result => {
                console.log(data)
                userInfo.setUserAvatar(data.avatar)
                popupAvatar.close()
            })
            .catch(result => console.log(`${result} при отправке данных пользователя`))
            .finally(() => buttons.avatar.textContent = 'Сохранить')
    }
})

// consZ

// Вызов модальных окон +
popupWithImg.setEventListeners();
popupAdd.setEventListeners();
popupAddConfig.addButton.addEventListener('click', () => {
    popupAdd.open()
});
popupEdit.setEventListeners();
function handlePopupEdit() {
    const profileInfo = userInfo.getUserInfo();
    popupEditConfig.nameInput.value = profileInfo.name;
    popupEditConfig.jobInput.value = profileInfo.about;
    formEditValidate.clearValidationState();
    popupEdit.open();
}
popupEditConfig.editBtn.addEventListener('click', handlePopupEdit);

popupAvatar.setEventListeners()
profile.image.addEventListener('click', () => {
    popupAvatar.open()
})

// Section +
const section = new Section({
    renderer: (item) => {
        const newCard = createCard(item);
        section.addItem(newCard, 'append');
    }
}, '.cards');
// Create Card
function createCard(item) {
    const userId = userInfo.getUserId()
    const element = new Card(item, {
            handleImageClick: (link, alt) => {
                popupWithImg.open({link, alt});
            },
            toggleLike: (cardId) => {
                if (cardId.querySelector(cardConfig.elementLike).classList.contains(cardConfig.LikeActive)) {
                    api.dislikeCard(cardId.id)
                        .then(result => element.removeLike(cardId, result.likes))
                        .catch(result => console.log(`${result} при удалении лайка`))
                } else {
                    api.likeCard(cardId.id)
                        .then(result => element.addLike(cardId, result.likes))
                        .catch(result => console.log(`${result} при удалении лайка`))
                }
            }
        },
        cardConfig, '.card', userId, api);
    const card = element.generateCard();
    return card;
}
// Promise All
Promise.all([api.getUserProfile(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData.name, userData.about, userData._id);
        userInfo.setUserAvatar(userData.avatar);
        section.renderItems(cards)
        return section;
    })
//   .catch(result => console.log(`${result} при загрузке данных`))
//   .finally(function () {
//     whileLoading.profile.style.display = 'flex';
//     whileLoading.footer.style.display = 'flex';
//     whileLoading.loading.style.display = 'none';
//   })
// Validation
const formEditValidate = new FormValidate(validateConfig, popupEditConfig.editPopup);
formEditValidate.enableValidation();
const formAddValidate = new FormValidate(validateConfig, popupAddConfig.popupAdd);
formAddValidate.enableValidation();
const formAvatarValidate = new FormValidate(validateConfig, avatar)
formAvatarValidate.enableValidation();