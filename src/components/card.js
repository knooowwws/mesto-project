import {formMesto, inputLocation, inputUrl, modalAdd, modalAddBtn} from '../pages/index'
import {closePopup, openModalPhoto} from './modal'
import {addNewCard, deleteCard, getInitialCards, getResponse, loadRender, toggleLikeCard} from "./api";
import {arrForValidation, disableSubmitBtn} from "./validate";

export let userId = '6ca02297585a915520ad15e2';

export const makeCard = (cardEl) => {
    const cardTemplate = document.querySelector('.card').content;
    const card = cardTemplate.querySelector('.cards__item').cloneNode(true);
    const cardId = cardEl._id
    card.querySelector('.cards__name').textContent = cardEl.name;
    card.querySelector('.cards__img').src = cardEl.link;
    card.querySelector('.cards__img').alt = cardEl.name;
    card.querySelector('.cards__btn').addEventListener('click', (evt) => likeCard(evt, cardEl))
    card.querySelector('.cards__img').addEventListener('click', () => openModalPhoto(cardEl))
    if (cardEl.owner._id === userId) {
        card.querySelector('.cards__trash').classList.add('cards__trash_status_visible')
        card.querySelector('.cards__trash').addEventListener('click', (evt) => {
            evt.target.closest('.cards__item').remove()
            deleteCard(cardId)
        })
    }

    if (cardEl.likes) {
        cardEl.likes.forEach(el => {
            if (el._id === userId) {
                card.querySelector('.cards__btn').classList.add('cards__btn_like')
            }
        })
    }
    // card.querySelector('.cards__trash').addEventListener('click', (evt) => {evt.target.closest('.cards__item').remove()})
    card.querySelector('.cards__like-counter').textContent = cardEl.likes.length;
    return card;
}

export const addCards = (cardEl) => {
    document.querySelector('.cards').prepend(makeCard(cardEl));
}

const addInitialCards = (cardEl) => {
    cardEl.reverse().forEach(card => {
        addCards(card)
    })
}

export function getArrayCards() {
    getInitialCards()
        .then(r => {
            if (r.ok) {
                return r.json()
            }
            return Promise.reject(`Статус ошибки: ${r.status}`)
        })
        .then(card => {
            console.log(card)
            addInitialCards(card)
        })
        .then(formMesto.reset())
        .catch(err => {
            console.log(err)
        })
}

export function addNewUserCard() {
    // renderLoad(true);
    addNewCard(inputLocation.value, inputUrl.value)
        .then(res => getResponse(res))
        .then(res => {
            loadRender(true)
            addCards(res)
            disableSubmitBtn(modalAddBtn, arrForValidation.disabledButtonSelector)
            loadRender(false)
            closePopup(modalAdd);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(formMesto.reset())
}

function likeCard (evt, cardEl) {
    evt.target.classList.toggle('cards__btn_like');
    toggleLikeCard(evt, cardEl)
        .then(res => getResponse(res))
        .then((res) => {
            evt.target.parentNode.querySelector('.cards__like-counter').textContent = res.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
}
