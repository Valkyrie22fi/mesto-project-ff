import './pages/index.css';
import { clickLike, createCard, deleteCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getCards, getUserInfo, postCards, patchUserInfo } from './components/api.js';

// Вывод карточек на страницу 
const cardsList = document.querySelector('.places__list'); 

// вывести все карточки на страницу 
function addCardList() {
  Promise.all([getCards(), getUserInfo()])
  .then(([allCards, aboutMe]) => {
    allCards.forEach((el) => { 
        const isOwner = (aboutMe._id === el.owner._id);
        const likes = el.likes.length;
        const card = createCard(el.name, el.link, likes, deleteCard, clickLike, openImage, isOwner)
        cardsList.append(card) 
    }) 
  })
}; 
addCardList() 

// Вывод аватара и описания
function addUserInfo() {
  const avatar = document.querySelector('.profile__image');
  const userName = document.querySelector('.profile__title');
  const userAbout = document.querySelector('.profile__description');
  getUserInfo().then((data) => {
    avatar.style.backgroundImage = `url(${data.avatar})`;
    userName.textContent = data.name;
    userAbout.textContent = data.about;
  })
}; 
addUserInfo();

// Валидация константы
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Попап редактирования профиля
// Константы редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const closeButtonPopupTypeEdit = popupTypeEdit.querySelector('.popup__close');
const formProfile = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Открытие редактирования профиля
editButton.addEventListener('click', function () {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Закрытие редактирования профиля
closeButtonPopupTypeEdit.addEventListener('click', function () {
  closeModal(popupTypeEdit);
  const profileForm = popupTypeEdit.querySelector('.popup__form');
  clearValidation(profileForm, validationConfig);
});

// Обработка формы редактирования профиля
function editFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = jobInput.value;  
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  patchUserInfo({name, job})
  closeModal(popupTypeEdit);
}

formProfile.addEventListener('submit', editFormSubmit); 

// Попап добавления новой карточки
// Константы добавления новой карточки
const addButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const closeButtonPopupTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const formNewCard = document.querySelector('[name="new-place"]');
const newPlaceNameInput = document.querySelector('.popup__input_type_card-name');
const newPlaceLinkInput = document.querySelector('.popup__input_type_url');

// Открытие добавления новой карточки
addButton.addEventListener('click', function () {
  openModal(popupTypeNewCard);
});

// Закрытие добавления новой карточки
closeButtonPopupTypeNewCard.addEventListener('click', function () {
  closeModal(popupTypeNewCard);
  const inputList = Array.from(popupTypeNewCard.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    inputElement.value = "";
  })
  clearValidation(popupTypeNewCard, validationConfig);
});

// добавить карточку в начало списка
function addCard(evt) {
  evt.preventDefault();
  const name = newPlaceNameInput.value;
  const link = newPlaceLinkInput.value;
  const likes = "";
  const isOwner = true;
  const card = createCard(name, link, likes, deleteCard, clickLike, openImage, isOwner)
  cardsList.prepend(card);
  newPlaceNameInput.value = "";
  newPlaceLinkInput.value = "";
  closeModal(popupTypeNewCard);
  clearValidation(popupTypeNewCard, validationConfig);
  postCards({
    name,
    link,
  });
}

// Обработка формы
formNewCard.addEventListener('submit', addCard); 


// Попап открытия картинки по клику
// Константы
const popupTypeImage = document.querySelector('.popup_type_image');
const closeButtonPopupTypeImage = popupTypeImage.querySelector('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image')
const popupCaption = popupTypeImage.querySelector('.popup__caption')

// Открытие
function openImage(name, link) {
  openModal(popupTypeImage);
  popupImage.src = link;
  popupImage.alt = name; 
  popupCaption.textContent = name;
}

// Закрытие
closeButtonPopupTypeImage.addEventListener('click', function () {
  closeModal(popupTypeImage);
});

enableValidation(validationConfig);

getCards();
getUserInfo();
