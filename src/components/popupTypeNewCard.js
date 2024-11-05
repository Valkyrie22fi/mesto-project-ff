import { openModal, closeModal  } from '../index.js'
import { openImage } from './popupTypeImage.js';
import { createCard, deleteCard, likeButton, cardsList } from './card.js';

// Модальное окно добавления
const addButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const closeButtonPopupTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const formNewCard = document.querySelector('[name="new-place"]');
const newPlaceNameInput = document.querySelector('.popup__input_type_card-name');
const newPlaceLinkInput = document.querySelector('.popup__input_type_url');

function openPopupTypeNewCard(item) {
  "открыть попап добавления новой карточки"
  addButton.addEventListener('click', function () {
    openModal(popupTypeNewCard);
  });
}

function closePopupTypeNewCard() {
  "закрыть попап добавления новой карточки"
  closeButtonPopupTypeNewCard.addEventListener('click', function () {
    closeModal(popupTypeNewCard);
  });
}

function addCard(evt) {
  "добавить карточку в начало списка"
  evt.preventDefault();
  let name = newPlaceNameInput.value;
  let link = newPlaceLinkInput.value;
  let card = createCard(name, link, deleteCard)
  //открытие модального окна картинки
  let cardImage = card.querySelector('.card__image')
  cardImage.addEventListener('click', function () {
    openImage(link, name);
  });
  likeButton(card);
  cardsList.prepend(card);
  closeModal(popupTypeNewCard);
}

export { openPopupTypeNewCard, closePopupTypeNewCard, popupTypeNewCard, formNewCard, addCard }