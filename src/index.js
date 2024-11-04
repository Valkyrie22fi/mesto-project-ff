import './pages/index.css';
import './components/popupTypeEdit.js';
import './components/popupTypeImage.js';
import './components/popupTypeNewCard.js'
import { cardsList } from './components/popupTypeNewCard.js'

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

// Темплейт карточки 
const cardTemplate = document.querySelector('#card-template').content; 

 
// DOM узлы 
export const content = document.querySelector('.content'); 

export function likeButton(item) {
  "поставить лайк на карточку"
  const likeButton = item.querySelector('.card__like-button');
  likeButton.addEventListener('click', function () {
  likeButton.classList.add('card__like-button_is-active');
});
}

export function createCard(name, link, deleteCallback) {
  "создать и вернуть элемент карточки"
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
 
  cardElement.querySelector('.card__title').textContent = name; 
  cardElement.querySelector('.card__image').src = link; 
  cardElement.querySelector('.card__image').alt = name;
 
  deleteButton.addEventListener('click', () => { 
    deleteCallback(cardElement) 
  }); 

  return cardElement; 
} 
 
function addCardList() {
  "вывести все карточки на страницу"
  initialCards.forEach((el) => { 
    let card = createCard(el.name, el.link, deleteCard)
    //открытие модального окна картинки
    let cardImage = card.querySelector('.card__image')
    cardImage.addEventListener('click', function () {
      openImage(popupTypeImage, el);
    });

    likeButton(card);

    cardsList.append(card) 
  }) 
}; 

// Вывод карточек на страницу 
addCardList() 
 
export function deleteCard(card) {
  "Удалить карточку"
  card.remove(); 
}; 

export function openPopup(item) {
  "открыть попап"
  item.classList.add('popup_is-opened');
  closePopupEsc(item);
}

export function closePopup(item) {
  "закрыть попап"
  item.classList.add('popup_is-animated');
  item.classList.remove('popup_is-opened');
}

function closePopupEsc(item) {
  "закрыть попап по нажатию на Esc"
  
  document.addEventListener('keydown', function (evt) {
    if(evt.key === 'Escape') {
      item.classList.remove('popup_is-opened');
    }
  }); 
}

export function closePopupOverlay(item) {
  "закрыть попап кликом по оверлей"
  item.addEventListener('click', function (evt) {
    evt.target.classList.remove('popup_is-opened');
  }); 
}