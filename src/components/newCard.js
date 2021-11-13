import { cardConfig } from "./constants";
export class Card {
    constructor({name, link, likes, owner, _id}, { handleImageClick, toggleLike}, cardConfig, template, userId , api) {
      this._template = template;
      this._element = this._getCardElement();
      this._title = name;
      this._image = link;
      this._likes = likes;
      this._idElement = _id;
      this._owner = owner._id;
    //   this._cardImage = cardConfig.elementImage;
    //   this._cardTitle = cardConfig.elementTitle;
      this._cardLike = cardConfig.elementLike;
      this._cardDel = cardConfig.elementDel;
      this._handleImageClick = handleImageClick;
      this._userId = userId;
      this._toggleLike = toggleLike;
      this._likeCounter = this._element.querySelector(cardConfig.likeCounter)
      this.api = api;
    }
  
    _getCardElement() {
        const cardElement = document
        .querySelector(this._template)
        .content
        .querySelector('.cards__item')
        .cloneNode(true);
  
        return cardElement;
      }
     
    _setEventListeners() {
      this._element.querySelector(this._cardLike).addEventListener('click', () => this._handleLikeCard());
      this._element.querySelector('.cards__img').addEventListener('click', () => this._handleImageClick(this._image, this._title));
    }
  
    _handleLikeCard() {
      this._toggleLike(this._element);
    }
    
    removeLike(cardId, likes) {
      cardId.querySelector(cardConfig.elementLike).classList.remove(cardConfig.LikeActive);
      cardId.querySelector(cardConfig.likeCounter).textContent = likes.length;
    }
  
    addLike(cardId, likes) {
      cardId.querySelector(cardConfig.elementLike).classList.add(cardConfig.LikeActive);
      cardId.querySelector(cardConfig.likeCounter).textContent = likes.length;
    }
  
    generateCard() {
      this._setEventListeners();
      this._element.querySelector('.cards__img').src = this._image;
      this._element.querySelector('.cards__img').alt = this._title;
      this._element.querySelector('.cards__name').textContent = this._title;
      this._likeCounter.textContent = this._likes.length;
      this._element.id = this._idElement;
      if (this._userId === this._owner) {
        this._element.querySelector(this._cardDel).classList.add(cardConfig.elementDelVisible);
      }
      this._likes.forEach(like => {
        if (like._id === this._userId) {
          this._element.querySelector(this._cardLike).classList.add(cardConfig.LikeActive);
        }
      })
      return this._element;
    }

  }
