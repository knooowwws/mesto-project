import {loadRender} from './utils'
import {formMesto, inputLocation, inputUrl, modalAdd, modalAddBtn} from '../pages/index'
import {arrForValidation, disableSubmitBtn} from "./validate";

export class Card {
  constructor({name , link , owner , likes , _id},selector){
    this.name = name;
    this.owner = owner;
    this.link = link;
    this._id = _id;
    this.selector = selector;
    this.likes = likes;
  }
  _createCard() {
    const cardElement = document.querySelector(this.selector).content;
    const card = cardElement.querySelector('.cards__item').cloneNode(true);
    const cardId = this._id
    card.querySelector('.cards__name').textContent = this.name;
    card.querySelector('.cards__img').src = this.link;
    card.querySelector('.cards__img').alt = this.name;
    if (card.likes) {
      card.likes.forEach(el => {
          if (el._id === this.userId) {
              card.querySelector('.cards__btn').classList.add('cards__btn_like')
          }
      })
  }
    card.querySelector('.cards__like-counter').textContent = this.likes.length;

    return card
  }
   _setEventListeners() {
   const element = this._createCard()
   element.querySelector('.cards__btn').addEventListener('click', (evt) => {
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
   }

   _addCards = (cardEl) => {
    document.querySelector('.cards').prepend(cardEl);
}

   _addInitialCards = () => {
    cardEl.reverse().forEach(card => {
        addCards(this._createCard())
    })
}
  _addNewUserCard() {
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
}