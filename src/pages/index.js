import './index.css';
import {Api} from "../components/Api";
import {Card} from "../components/Card"
import {PopupWithImage} from "../components/PopupWithImg"
import {PopupWithForm} from '../components/PopupWithForm';
import {Section} from "../components/Section"
import {UserInfo} from "../components/UserInfo"
import {FormValidate} from "../components/FormValidate"
import {
    config,
    cardConfig,
    profile,
    avatar,
    avatarObj,
    imagePreviewConfig,
    popupEditConfig,
    popupPhoto,
    nameInput,
    aboutInput,
    profileAvatar,
    popupAddConfig,
    validateConfig,
    buttons,
    popupsWithForm
} from "../utils/constants"

//api
const api = new Api(config)

// user Info
const userInfo = new UserInfo(popupEditConfig.nameInfo, popupEditConfig.jobInfo, profileAvatar);

// Модальные окна
const popupWithImg = new PopupWithImage(popupPhoto);

const popupAdd = new PopupWithForm(popupsWithForm.addPopup, {
    submitHandler: (data) => {
        buttons.add.textContent = 'Сохранение ...';
        api.addNewCard(data.location, data.url)
            .then(result => {
                const addCard = createCard(result);
                section.addItem(addCard, 'prepend');
                popupAdd.close();
            })
            .catch(result => console.log(result))
            .finally(() => {
                buttons.add.textContent = 'Сохранить'
            })
    }
});
const popupEdit = new PopupWithForm(popupsWithForm.editPopup, {
    submitHandler: (data) => {
        buttons.edit.textContent = 'Сохранение ...';
        api.saveProfileData(data.name, data.profession)
            .then(result => {
                console.log(result)
                userInfo.setUserInfo(result.name, result.about)
                popupEdit.close()
            })
            .catch(result => console.log(result))
            .finally(() => buttons.edit.textContent = 'Сохранить')
    }
});
const popupAvatar = new PopupWithForm(popupsWithForm.avatar, {
    submitHandler: (data) => {
        buttons.avatar.textContent = 'Сохранение ...';
        api.saveProfileAvatar(data.avatar)
            .then(result => {
                userInfo.setUserAvatar(result.avatar)
                popupAvatar.close()
            })
            .catch(result => console.log(`${result} ошибка тут`))
            .finally(() => buttons.avatar.textContent = 'Сохранить')
    }
})

// Вызов модальных окон
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
    popupEdit.open();
}

popupEditConfig.editBtn.addEventListener('click', handlePopupEdit);

popupAvatar.setEventListeners()
profile.image.addEventListener('click', () => {
    popupAvatar.open()
})

// Section
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
        }
    }, '.card', userId, api, cardConfig);
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

const formProfileValidation = new FormValidate(validateConfig, popupsWithForm.editPopup);
formProfileValidation.enableValidation();

const addCardValidation = new FormValidate(validateConfig, popupsWithForm.addPopup);
addCardValidation.enableValidation();

const avatarValidation = new FormValidate(validateConfig, popupsWithForm.avatar);
avatarValidation.enableValidation();