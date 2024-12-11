import { removeCard, unlikeCard, likeCard } from './api.js';

// Темплейт карточки 
const cardTemplate = document.querySelector('#card-template').content;


// создать и вернуть элемент карточки
function createCard(name, link, likes, id, deleteCallback, clickLike, openImage, cardPermitions) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title')
  const cardImage = cardElement.querySelector('.card__image')
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count'); 
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const isOwner = cardPermitions.isOwner;
  const isLike =cardPermitions.isLike;
  if (isOwner) {
    deleteButton.classList.remove('hidden');
    if (isLike) {
      likeButton.classList.add('card__like-button_is-active');
    }
  }
  cardTitle.textContent = name; 
  cardImage.src = link; 
  cardImage.alt = name;
  likeCount.textContent = likes;
  cardElement.id = id;

  //открытие модального окна картинки
  cardImage.addEventListener('click', function () {
    openImage(name, link );
  });
 
  if (isOwner) {
    deleteButton.classList.remove('hidden');
    deleteButton.addEventListener('click', () => { 
      deleteCallback(cardElement) 
    }); 
  }
  

  likeButton.addEventListener('click', clickLike)

  return cardElement; 
} 

// удалить карточку
function deleteCard(card) {
  removeCard(card.id)
  card.remove();
}; 

// поставить лайк на карточку
function clickLike(evt) {
  const isLiked = evt.srcElement.classList.contains('card__like-button_is-active')
  const cardId = evt.srcElement.offsetParent.id;

  evt.target.classList.toggle('card__like-button_is-active');
  const handler = isLiked ? unlikeCard : likeCard
  handler(cardId).then((data) => {
    evt.srcElement.nextElementSibling.textContent = data.likes.length
  });
}

export { clickLike, createCard, deleteCard };