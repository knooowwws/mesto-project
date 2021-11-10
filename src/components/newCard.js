// import {loadRender} from './utils'
// import {formMesto, inputLocation, inputUrl, modalAdd, modalAddBtn} from '../pages/index'
// import {arrForValidation, disableSubmitBtn} from "./validate";
// import { PopupWithImg } from './popupWithImg';

// export class Card {
//   constructor({name , link , owner , likes , _id}, selector, api, liked , myCard, /*handleClickImg */){
//     this.name = name;
//     this.owner = owner;
//     this.link = link;
//     this._id = _id;
//     this.selector = selector;
//     this.likes = likes;
//     this.api = api;
//     this._liked = liked;
//     this._myCard = myCard;
//     // this.handleClickImg = handleClickImg
//   }
//   _createCard() {
//     const cardElement = document.querySelector(this.selector).content;
//     const card = cardElement.querySelector('.cards__item').cloneNode(true);
//     return card
// }
//
// _setEventListeners() {
//     this.element.querySelector('.cards__btn').addEventListener('click', (evt) => {
//         this._handleLikeClick()
//     })
//     this.element.querySelector('.cards__img').addEventListener('click', () => this.handleClickImg(this.name , this.link))
//
//     this.element.querySelector('.cards__trash').addEventListener('click', (evt) => {
//         this.api.deleteCard(this._id) //?
//             .then(r => {
//                 evt.target.closest('.cards__item').remove()
//             }).catch(res => {
//                 console.log(res)
//             })
//         })
//
// }
// _handleLikeClick() {
//     const likeButton = this.element.querySelector('.cards__btn')
//     const likeCount = this.element.querySelector('.cards__like-counter')
//     if (this._liked) {
//         this.api.toggleLikeCard(evt, this._id).then(r => {
//             likeCount = r.likes.length
//             likeButton.classList.add('cards__btn-like')
//         })
//     } else {
//         this.api.toggleLikeCard(evt, this._id).then(r => {
//             likeCount = r.likes.length
//             likeButton.classList.remove('cards__btn-like')
//         })
//     }
// }
// _handleDeleteIconClick() {
//     if (this._myCard) {
//         this.element.querySelector('.cards__trash').classList.add('cards__trash_status_visible')
//     }
// }
//
// addCard(template, cardSection ) {
//    cardSection.prepend(this.createCard(template));
// }
//
// generate() {
//     this.element = this._createCard()
//     this._setEventListeners()
//     this._handleLikeClick()
//     this._handleDeleteIconClick()
//     this._handleCardClick()
//
//     this.element.querySelector('.cards__name').textContent = this.name;
//     this.element.querySelector('.cards__img').src = this.link;
//     this.element.querySelector('.cards__img').alt = this.name;
//     this.element.querySelector('.cards__like-counter').textContent = this.likes.length;
//     return this.element
// }
// }


export class Card {
    constructor({ link, name, likes, _id }, isLiked, cardIsMine ,api, handleOnImageClick) {
        this._link = link;
        this._name = name;
        this._likes = likes;
        this._id = _id;
        this._isLiked = isLiked;
        this._cardIsMine = cardIsMine;
        this._handleOnImageClick = handleOnImageClick;
        this._api = api;
    }

    createCard(template) {
        const clone = template.content.cloneNode(true);
        const pictureOnCard = clone.querySelector('.cards__img');
        this.pictureOnCard = pictureOnCard;
        pictureOnCard.src = this._link;
        pictureOnCard.alt = this._name;
        const textOnCard = clone.querySelector('.cards__name');
        textOnCard.textContent = this._name;
        const likeButton = clone.querySelector(".cards__btn");
        this.likeButton = likeButton;
        if (this._isLiked) {
            likeButton.classList.add('cards__btn-like');
        }
        const likesAmount = clone.querySelector('.cards__like-counter');
        likesAmount.textContent = this._likes.length;
        this._setEventListners(clone);
        return clone;
    }

    _setEventListners(cardItem) {
        // this.pictureOnCard.addEventListener('click', () => {
        //     this._handleOnImageClick(item);
        // });
        this.likeButton.addEventListener('click', () => this._switchLikeIcon(event.target, this._id));
        if (this._cardIsMine) {
            const deleteButton = cardItem.querySelector('.cards__trash');
            deleteButton.style.display = 'block';
            deleteButton.addEventListener('click', () => {
            });
        }
    }

    _switchLikeIcon(button, cardId) {
        button.classList.toggle('.cards__btn-like');
        const countElement = button.parentElement.querySelector('.cards__like-counter');
        if (Array.from(button.classList).includes('cards__btn-like')) {
            this._api.putLike(cardId)
            countElement.textContent = +countElement.textContent + 1;
        // } else {
        //     this._api.toggleLikeCard(evt , cardId)
        //     countElement.textContent = +countElement.textContent - 1;
        // }
    }
}

    addCard(template, photoGrid, deletePopup) {
        photoGrid.prepend(this.createCard(template, deletePopup));
    }
 }