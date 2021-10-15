//POPUPS
export const modalPhoto = document.querySelector('.popup_photo')


export const openPopup = (popup) => {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', closePopUpWithEsc)
    popup.addEventListener('click', closePopupWithOverlay);
}

export const closePopup = (popup) => {
    popup.classList.remove('popup_opened')
    popup.addEventListener('click', closePopupWithOverlay);
}

export const closePopUpWithEsc = (evt) => {
    if (evt.key === "Escape") {
        const popup = document.querySelector(".popup_opened")
        closePopup(popup);
    }
}

export const closePopupWithOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
        const popup = document.querySelector(".popup_opened")
        closePopup(popup);
    }
}


 export const openModalPhoto = (cardEl) => {
    modalPhoto.querySelector('.popup__image').src = cardEl.url
    modalPhoto.querySelector('.popup__name').textContent = cardEl.name
    openPopup(modalPhoto)
}