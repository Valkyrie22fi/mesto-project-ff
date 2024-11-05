import { openModal, closeModal  } from '../index.js'
import { openImage } from './popupTypeImage.js';
import { createCard, deleteCard, likeButton} from './card.js';
import { cardsList } from './cards.js';

// Модальное окно добавления
const addButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const closeButtonPopupTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const formNewCard = document.querySelector('[name="new-place"]');
const newPlaceNameInput = document.querySelector('.popup__input_type_card-name');
const newPlaceLinkInput = document.querySelector('.popup__input_type_url');

// открыть попап добавления новой карточки
function openPopupTypeNewCard(item) {
  addButton.addEventListener('click', function () {
    openModal(popupTypeNewCard);
  });
}

// закрыть попап добавления новой карточки
function closePopupTypeNewCard() {
  closeButtonPopupTypeNewCard.addEventListener('click', function () {
    closeModal(popupTypeNewCard);
  });
}

// добавить карточку в начало списка
function addCard(evt) {
  evt.preventDefault();
  const name = newPlaceNameInput.value;
  const link = newPlaceLinkInput.value;

  const card = createCard(name, link, deleteCard)
   //открытие модального окна картинки
   const cardImage = card.querySelector('.card__image')
   cardImage.addEventListener('click', function () {
     openImage(name, link);
   });
   likeButton(card);
  cardsList.prepend(card);
  closeModal(popupTypeNewCard);
  newPlaceNameInput.value = "";
  newPlaceLinkInput.value = "";
}

export { openPopupTypeNewCard, closePopupTypeNewCard, popupTypeNewCard, formNewCard, addCard }