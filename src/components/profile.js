import {getResponse, getUserProfile, saveProfileAvatar, saveProfileData} from "./api";
import {
    inputAvatar,
    inputName,
    inputProfile, modalAvatar,
    modalProfile,
    profileAvatar,
    profileName,
    profileWork
} from "../pages/index";
import {closePopup} from "./modal";
import {loadRender} from "./utils";

export const renderUserProfile = (name, about, avatar) => {

            profileName.textContent = name
            profileWork.textContent = about
            profileAvatar.src = avatar
}

export function handlerProfileFormSubmit() {
    loadRender(modalProfile, true)
    saveProfileData(inputName.value, inputProfile.value)
        .then((res) => {
            profileName.textContent = res.name;
            profileWork.textContent = res.about;
            closePopup(modalProfile);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            loadRender(modalProfile, false)
        })
}

export function updateAva () {
    loadRender(modalAvatar, true)
    saveProfileAvatar(inputAvatar.value)
        .then(res => {
            profileAvatar.src = res.avatar
            closePopup(modalAvatar)
        })
        .catch(res => console.log(res))
        .finally(res => {
            loadRender(modalAvatar, false)
        })
}