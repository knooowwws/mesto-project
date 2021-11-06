// import {loadRender} from './utils'
// import {formMesto, inputLocation, inputUrl, modalAdd, modalAddBtn} from '../pages/index'
// import {arrForValidation, disableSubmitBtn} from "./validate";
// import { PopupWithImg } from './popupWithImg';

export class Card {
  constructor({name , link , owner , likes , _id}, selector, api, liked , myCard, handleClickImg){
    this.name = name;
    this.owner = owner;
    this.link = link;
    this._id = _id;
    this.selector = selector;
    this.likes = likes;
    this.api = api;
    this._liked = liked;
    this._myCard = myCard;
    this.handleClickImg = handleClickImg
  }
  _createCard() {
    const cardElement = document.querySelector(this.selector).content;
    const card = cardElement.querySelector('.cards__item').cloneNode(true);
    // const cardId = this._id
    // card.querySelector('.cards__name').textContent = this.name;
    // card.querySelector('.cards__img').src = this.link;
    // card.querySelector('.cards__img').alt = this.name;
    // if (card.likes) {
    //     card.likes.forEach(el => {
    //         if (el._id === this.userId) {
    //             card.querySelector('.cards__btn').classList.add('cards__btn_like')
    //         }
    //     })
    // }
    // card.querySelector('.cards__like-counter').textContent = this.likes.length;
    return card
}

_setEventListeners() {
    this.element.querySelector('.cards__btn').addEventListener('click', (evt) => {
        this._handleLikeClick()
    })
    this.element.querySelector('.cards__img').addEventListener('click', () => this.handleClickImg(this.name , this.link))
    
    this.element.querySelector('.cards__trash').addEventListener('click', (evt) => {
        this.api.deleteCard(this._id) //?
            .then(r => {
                evt.target.closest('.cards__item').remove()
            }).catch(res => {
                console.log(res)
            })
        })

}
_handleLikeClick() {
    const likeButton = this.element.querySelector('.cards__btn')
    const likeCount = this.element.querySelector('.cards__like-counter')
    if (this._liked) {
        this.api.toggleLikeCard(evt, this._id).then(r => {
            likeCount = r.likes.length
            likeButton.classList.add('cards__btn-like')
        })
    } else {
        this.api.toggleLikeCard(evt, this._id).then(r => {
            likeCount = r.likes.length
            likeButton.classList.remove('cards__btn-like')
        })
    }
}
_handleDeleteIconClick() {
    if (this._myCard) {
        this.element.querySelector('.cards__trash').classList.add('cards__trash_status_visible')
    }
}
// _handleCardClick() {
//     this.handleClickImg.open(this._element)
// }
// _addCards = (cardEl) => {
//     document.querySelector('.cards').prepend(cardEl);
// }
// _addInitialCards = () => {
//     cardEl.reverse().forEach(card => {
//         addCards(this._createCard())
//     })
// }
// _addNewUserCard() {
//     loadRender(modalAdd, true);
//     this.api.addNewCard(inputLocation.value, inputUrl.value).then(res => {
//         this._addCards(res)
//         // disableSubmitBtn(modalAddBtn, arrForValidation.disabledButtonSelector)
//         closePopup(modalAdd);
//         formMesto.reset()
//     }).catch((err) => {
//         console.log(err);
//     }).finally(r => {
//         loadRender(modalAdd, false)
//     })
// }
addCard(template, cardSection ) {
   cardSection.prepend(this.createCard(template));
}

generate() {
    this.element = this._createCard()
    this._setEventListeners()
    this._handleLikeClick()
    this._handleDeleteIconClick()
    this._handleCardClick()

    this.element.querySelector('.cards__name').textContent = this.name;
    this.element.querySelector('.cards__img').src = this.link;
    this.element.querySelector('.cards__img').alt = this.name;
    this.element.querySelector('.cards__like-counter').textContent = this.likes.length;
    return this.element
}
}
