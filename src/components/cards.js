import { popupTypeImage, openImage} from './popupTypeImage.js'
import { createCard, deleteCard, likeButton, } from './card.js'

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

const cardsList = document.querySelector('.places__list'); 

// вывести все карточки на страницу 
function addCardList() {
  initialCards.forEach((el) => { 
    const card = createCard(el.name, el.link, deleteCard)
    //открытие модального окна картинки
    const cardImage = card.querySelector('.card__image')
    cardImage.addEventListener('click', function () {
      openImage(el.name, el.link );
    });

    likeButton(card);

    cardsList.append(card) 
  }) 
}; 

export { addCardList, cardsList };