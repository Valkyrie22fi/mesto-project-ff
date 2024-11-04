import { popupTypeImage, openImage} from './popupTypeImage.js'

const initialCards = [
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
const cardsList = document.querySelector('.places__list'); 

function createCard(name, link, deleteCallback) {
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

function deleteCard(card) {
  "Удалить карточку"
  card.remove(); 
}; 

function likeButton(item) {
  "поставить лайк на карточку"
  const likeButton = item.querySelector('.card__like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.add('card__like-button_is-active');
  });
}
 
function addCardList() {
  "вывести все карточки на страницу"
  initialCards.forEach((el) => { 
    let card = createCard(el.name, el.link, deleteCard)
    //открытие модального окна картинки
    let cardImage = card.querySelector('.card__image')
    cardImage.addEventListener('click', function () {
      openImage(popupTypeImage, el.link, el.name );
    });

    likeButton(card);

    cardsList.append(card) 
  }) 
}; 

export { likeButton, cardsList, createCard, deleteCard, addCardList };