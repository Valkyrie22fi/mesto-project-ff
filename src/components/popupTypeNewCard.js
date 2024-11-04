import { openPopup, closePopup, closePopupOverlay  } from '../index.js'
import { openImage, popupTypeImage } from './popupTypeImage.js';
import { createCard, deleteCard, likeButton, cardsList } from './card.js';

// Модальное окно добавления
const addButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const closeButtonPopupTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const formNewCard = document.querySelector('[name="new-place"]');
const newPlaceNameInput = document.querySelector('.popup__input_type_card-name');
const newPlaceLinkInput = document.querySelector('.popup__input_type_url');



addButton.addEventListener('click', function () {
  openPopup(popupTypeNewCard);
});

closeButtonPopupTypeNewCard.addEventListener('click', function () {
  closePopup(popupTypeNewCard);
});

closePopupOverlay(popupTypeNewCard);

function addCard(evt) {
  "добавить карточку в начало списка"
  evt.preventDefault();
  let name = newPlaceNameInput.value;
  let link = newPlaceLinkInput.value;
  
  let card = createCard(name, link, deleteCard)
  
  //открытие модального окна картинки
  let cardImage = card.querySelector('.card__image')
  cardImage.addEventListener('click', function () {
    openImage(popupTypeImage, link, name);
  });
  likeButton(card);

  cardsList.prepend(card);
  closePopup(popupTypeNewCard);
}
formNewCard.addEventListener('submit', addCard); 