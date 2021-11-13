export class Card {
    constructor({name, link, likes, owner, _id}, { handleImageClick}, template, userId , api) {
      this._template = template;
      this._element = this._getCardElement();
      this._name = name;
      this._link = link;
      this._likes = likes;
      this._idElement = _id;
      this._owner = owner._id;
      this._handleImageClick = handleImageClick;
      this._userId = userId;
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
     
    _handleDeleteCard() {
      this.api.deleteCard(this._idElement)
          .then(() => this._element.remove())
          .catch((err) => {
            console.log(err);
          })
    }

    _toggleLike(cardId){
      if (cardId.querySelector('.cards__btn').classList.contains('cards__btn_like')) {
          this.api.dislikeCard(cardId.id)
              .then(result => this.removeLike(cardId, result.likes))
              .catch(result => console.log(result))
      } else {
          this.api.likeCard(cardId.id)
              .then(result => this.addLike(cardId, result.likes))
              .catch(result => console.log(result))
      }
  }

    _handleLikeCard() {
      this._toggleLike(this._element);
    }

    removeLike(cardId, likes) {
      cardId.querySelector('.cards__btn').classList.remove('cards__btn_like');
      cardId.querySelector('.cards__like-counter').textContent = likes.length;
    }
  
    addLike(cardId, likes) {
      cardId.querySelector('.cards__btn').classList.add('cards__btn_like');
      cardId.querySelector('.cards__like-counter').textContent = likes.length;
    }

    _setEventListeners() {
      this._element.querySelector('.cards__btn').addEventListener('click', () => this._handleLikeCard());
      this._element.querySelector('.cards__img').addEventListener('click', () => this._handleImageClick(this._link, this._name));
      this._element.querySelector('.cards__trash').addEventListener('click', () => this._handleDeleteCard())
  }

    generateCard() {
      this._setEventListeners();
      this._element.querySelector('.cards__img').src = this._link;
      this._element.querySelector('.cards__img').alt = this._name;
      this._element.querySelector('.cards__name').textContent = this._name;
      this._element.querySelector('.cards__like-counter').textContent = this._likes.length;
      this._element.id = this._idElement;
      if (this._userId === this._owner) {
        this._element.querySelector('.cards__trash').classList.add('cards__trash_status_visible');
      }
      this._likes.forEach(like => {
        if (like._id === this._userId) {
          this._element.querySelector('.cards__btn').classList.add('cards__btn_like');
        }
      })
      return this._element;
    }

  }
