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

// @todo: Темплейт карточки 
const cardTemplate = document.querySelector('#card-template').content; 
 
// @todo: DOM узлы 
const content = document.querySelector('.content'); 
const cardsList = content.querySelector('.places__list'); 
const addButton = content.querySelector('.profile__add-button'); 
 
// @todo: Функция создания карточки 
function createCard(name, link, deleteCallback) { 
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
 
// @todo: Вывести карточки на страницу 
function addCardList() { 
  initialCards.forEach((el) => { 
    cardsList.append(createCard(el.name, el.link, deleteCard)) 
  }) 
}; 
 
addCardList() 
 
// @todo: Функция удаления карточки 
function deleteCard(card) { 
  card.remove(); 
}; 

// Функция открытия popup
function open(event) {
  event.classList.add('popup_is-opened');
}

// Функция закрытия popup
function close(event) {
  event.classList.remove('popup_is-opened');
}

// Функция закрытия по Esc



function closeEsc(event) {
  if(event.key === 'Escape') {
    console.log(event.key)
    close(document.querySelector('.popup_is-opened'))
  }
}

//открытие модального окна редактирования
let edit_button = document.querySelector('.profile__edit-button');
let popup_type_edit = document.querySelector('.popup_type_edit');
let close_button_popup_type_edit = popup_type_edit.querySelector('.popup__close');


edit_button.addEventListener('click', function () {
  open(popup_type_edit);
});

close_button_popup_type_edit.addEventListener('click', function () {
  close(popup_type_edit);
});

document.querySelector('.popup').addEventListener('keydown', function () {
  console.log('На что ни нажми — я появлюсь');
}); 



//открытие модального окна добавления
let add_button = document.querySelector('.profile__add-button');
let popup_type_new_card = document.querySelector('.popup_type_new-card');
let close_button_popup_type_new_card = popup_type_new_card.querySelector('.popup__close');


add_button.addEventListener('click', function () {
  open(popup_type_new_card);
});

close_button_popup_type_new_card.addEventListener('click', function () {
  close(popup_type_new_card);
  closeEsc(popup_type_new_card);
});

//открытие модального окна картинки
let image_button = document.querySelector('.card__image');
let popup_type_image = document.querySelector('.popup_type_image');
let close_button_popup_type_image = popup_type_image.querySelector('.popup__close');


image_button.addEventListener('click', function () {
  popup_type_image.classList.add("popup_is-opened")
});

close_button_popup_type_image.addEventListener('click', function () {
  popup_type_image.classList.remove("popup_is-opened");
});


//закрытие кликом по оверлей
let ovarlay = document.querySelector('.popup');

// ovarlay.addEventListener('click', function () {
//   ovarlay.classList.remove("popup_is-opened");
// });

ovarlay.addEventListener('click', function (evt) {
  evt.target.classList.remove('popup_is-opened');
  console.log(evt)
}); 