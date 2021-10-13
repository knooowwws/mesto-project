import {openModalPhoto} from './modal'

export const makeCard = (cardEl) => {
    const cardTemplate = document.querySelector('.card').content;
    const card = cardTemplate.querySelector('.cards__item').cloneNode(true);
    card.querySelector('.cards__name').textContent = cardEl.name;
    card.querySelector('.cards__img').src = cardEl.url;
    card.querySelector('.cards__btn').addEventListener('click', (evt) => {evt.target.classList.toggle('cards__btn_like')})
    card.querySelector('.cards__trash').addEventListener('click', (evt) => {evt.target.closest('.cards__item').remove()})
    card.querySelector('.cards__img').addEventListener('click', () => openModalPhoto(cardEl))
    return card;
}

export const addCards = (cardEl) => {
    document.querySelector('.cards').prepend(makeCard(cardEl));
}
