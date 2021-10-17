import {getResponse, getUserProfile, loadRender, saveProfileAvatar, saveProfileData} from "./api";
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

export const renderUserProfile = () => {
    getUserProfile()
        .then(res => getResponse(res))
        .then(res => {
            profileName.textContent = res.name
            profileWork.textContent = res.about
            profileAvatar.src = res.avatar
            console.log(res._id)
        })
        .catch(err => {
            console.log(err)
        })
}

export function handlerProfileFormSubmit() {
    saveProfileData(inputName.value, inputProfile.value)
        .then(res => getResponse(res))
        .then((res) => {
            loadRender(true)
            profileName.textContent = res.name;
            profileWork.textContent = res.about;
            loadRender(false)
            closePopup(modalProfile);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
        })
}

export function updateAva () {
    saveProfileAvatar(inputAvatar.value)
        .then(res => getResponse(res))
        .then(res => {
            loadRender(true)
            profileAvatar.src = res.avatar
            loadRender(false)
            closePopup(modalAvatar)
        })
        .catch(res => console.log(res))
}