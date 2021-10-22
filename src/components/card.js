import {formMesto, inputLocation, inputUrl, modalAdd, modalAddBtn} from '../pages/index'
import {closePopup, openModalPhoto} from './modal'
import {addNewCard, deleteCard, getInitialCards, getResponse, toggleLikeCard} from "./api";
import {arrForValidation, disableSubmitBtn} from "./validate";
import {loadRender} from './utils'

export let userId;
export const getId = (id) => {
    userId = id
}

export const makeCard = (cardEl) => {
    const cardTemplate = document.querySelector('.card').content;
    const card = cardTemplate.querySelector('.cards__item').cloneNode(true);
    const cardId = cardEl._id
    card.querySelector('.cards__name').textContent = cardEl.name;
    card.querySelector('.cards__img').src = cardEl.link;
    card.querySelector('.cards__img').alt = cardEl.name;
    card.querySelector('.cards__btn').addEventListener('click', (evt) => {
        toggleLikeCard(evt, cardEl)
            .then((res) => {
                evt.target.parentNode.querySelector('.cards__like-counter').textContent = res.likes.length;
                evt.target.classList.toggle('cards__btn_like');
            })
            .catch((err) => {
                console.log(err);
            })
    })
    card.querySelector('.cards__img').addEventListener('click', () => openModalPhoto(cardEl))
    if (cardEl.owner._id === userId) {
        card.querySelector('.cards__trash').classList.add('cards__trash_status_visible')
        card.querySelector('.cards__trash').addEventListener('click', (evt) => {
            deleteCard(cardId)
                .then(r => {
                    evt.target.closest('.cards__item').remove()
                })
                .catch(res => {
                    console.log(res)
                })
        })
    }

    if (cardEl.likes) {
        cardEl.likes.forEach(el => {
            if (el._id === userId) {
                card.querySelector('.cards__btn').classList.add('cards__btn_like')
            }
        })
    }
    card.querySelector('.cards__like-counter').textContent = cardEl.likes.length;
    return card;
}

export const addCards = (cardEl) => {
    document.querySelector('.cards').prepend(makeCard(cardEl));
}

export const addInitialCards = (cardEl) => {
    cardEl.reverse().forEach(card => {
        addCards(card)
    })
}

export function addNewUserCard() {
    loadRender(modalAdd, true);
    addNewCard(inputLocation.value, inputUrl.value)
        .then(res => {
            addCards(res)
            disableSubmitBtn(modalAddBtn, arrForValidation.disabledButtonSelector)
            closePopup(modalAdd);
            formMesto.reset()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(r => {
            loadRender(modalAdd, false)
        })
}

// function likeCard (evt, cardEl) {
//     toggleLikeCard(evt, cardEl)
//         .then((res) => {
//             evt.target.parentNode.querySelector('.cards__like-counter').textContent = res.likes.length;
//         })
//         .then(res => {
//             evt.target.classList.toggle('cards__btn_like');
//
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }

