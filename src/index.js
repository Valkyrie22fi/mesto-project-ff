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
const editButton = content.querySelector('.profile__edit-button');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const closeButtonPopupTypeEdit = popupTypeEdit.querySelector('.popup__close');
const closeButtonPopupTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const closeButtonPopupTypeImage = popupTypeImage.querySelector('.popup__close');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formProfile = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const formNewCard = document.querySelector('[name="new-place"]');
const newPlaceNameInput = document.querySelector('.popup__input_type_card-name');
const newPlaceLinkInput = document.querySelector('.popup__input_type_url');

function likeButton(item) {
  "поставить лайк на карточку"
  const likeButton = item.querySelector('.card__like-button');
  likeButton.addEventListener('click', function () {
  likeButton.classList.add('card__like-button_is-active');
});
}

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
 
function deleteCard(card) {
  "Удалить карточку"
  card.remove(); 
}; 

function openPopup(item) {
  "открыть попап"
  item.classList.add('popup_is-opened');
  closePopupEsc(item);
}

function openImage(item, element) {
  "открыть попап картинки"
  openPopup(item);
  item.querySelector('.popup__image').src = element.link;
  item.querySelector('.popup__image').alt = element.name; 
  item.querySelector('.popup__caption').textContent = element.name;
}

function closePopup(item) {
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

function closePopupOverlay(item) {
  "закрыть попап кликом по оверлей"
  item.addEventListener('click', function (evt) {
    evt.target.classList.remove('popup_is-opened');
  }); 
}


// Модальное окно редактирования
editButton.addEventListener('click', function () {
  openPopup(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

closeButtonPopupTypeEdit.addEventListener('click', function () {
  closePopup(popupTypeEdit);
});

closePopupOverlay(popupTypeEdit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let job = jobInput.value;  
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closePopup(popupTypeEdit);
}
formProfile.addEventListener('submit', handleFormSubmit); 


// Модальное окно добавления
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
    openImage(popupTypeImage, link);
  });

  cardsList.prepend(card);
  closePopup(popupTypeNewCard);
}
formNewCard.addEventListener('submit', addCard); 


// Модальное окно картинки
closeButtonPopupTypeImage.addEventListener('click', function () {
  closePopup(popupTypeImage);
});

closePopupOverlay(popupTypeImage);
