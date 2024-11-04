import './pages/index.css';

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

 
// DOM узлы 
const content = document.querySelector('.content'); 

const cardsList = content.querySelector('.places__list'); 
const addButton = content.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

const popup_type_image = document.querySelector('.popup_type_image');
const popup_type_edit = document.querySelector('.popup_type_edit');
const popup_type_new_card = document.querySelector('.popup_type_new-card');

const closeButtonPopupTypeEdit = popup_type_edit.querySelector('.popup__close');
const closeButtonPopupTypeNewCard = popup_type_new_card.querySelector('.popup__close');
const closeButtonPopupTypeImage = popup_type_image.querySelector('.popup__close');



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
 
function addCardList() {
  "вывести все карточки на страницу"
  initialCards.forEach((el) => { 
    let card = createCard(el.name, el.link, deleteCard)
    //открытие модального окна картинки
    card.addEventListener('click', function () {
      openImage(popup_type_image, el);
    });

    cardsList.append(card) 
  }) 
}; 

// Вывод карточек на страницу 
addCardList() 
 
function deleteCard(card) {
  "Удалить карточку"
  card.remove(); 
}; 

function openPopup(event) {
  "открыть попап"
  event.classList.add('popup_is-opened');
}

function openImage(event, element) {
  "открыть попап картинки"
  openPopup(event);
  event.querySelector('.popup__image').src = element.link;
  event.querySelector('.popup__image').alt = element.name; 
  event.querySelector('.popup__caption').textContent = element.name;
}

function closePopup(event) {
  "закрыть попап"
  event.classList.remove('popup_is-opened');
}

function closePopupEsc(event) {
  "закрыть попап по нажатию на Esc"
  if(event.key === 'Escape') {
    console.log(event.key)
    closePopup(document.querySelector('.popup_is-opened'))
  }
}

function closePopupOverlay(event) {
  "закрыть попап кликом по оверлей"
  event.addEventListener('click', function (evt) {
    evt.target.classList.remove('popup_is-opened');
    console.log(evt.target)
  }); 
}


// Модальное окно редактирования
editButton.addEventListener('click', function () {
  openPopup(popup_type_edit);
});

closeButtonPopupTypeEdit.addEventListener('click', function () {
  closePopup(popup_type_edit);
});

document.querySelector('.popup').addEventListener('keydown', function (evt) {
  console.log(evt)
}); 

closePopupOverlay(popup_type_edit);


// Модальное окно добавления
addButton.addEventListener('click', function () {
  openPopup(popup_type_new_card);
});

closeButtonPopupTypeNewCard.addEventListener('click', function () {
  closePopup(popup_type_new_card);
  closePopupEsc(popup_type_new_card);
});

closePopupOverlay(popup_type_new_card);


// Модальное окно картинки
closeButtonPopupTypeImage.addEventListener('click', function () {
  closePopup(popup_type_image);
});

closePopupOverlay(popup_type_image);
