import './pages/index.css';
import { clickLike, createCard, deleteCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getCards, getUserInfo, postCards, patchUserInfo, changeAvatar } from './components/api.js';

// Вывод карточек на страницу 
const cardsList = document.querySelector('.places__list'); 

// вывести все карточки на страницу 
function addCardList() {
  Promise.all([getCards(), getUserInfo()])
  .then(([allCards, aboutMe]) => {
    allCards.forEach((el) => { 
        const cardPermitions = {
          isOwner: aboutMe._id === el.owner._id,
          isLike: Boolean(el.likes.find(like => like._id === aboutMe._id)),
        };
        const likes = el.likes.length;
        const id = el._id;
        const card = createCard(el.name, el.link, likes, id, deleteCard, clickLike, openImage, cardPermitions)
        cardsList.append(card) 
    }) 
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`)
  })
}; 
addCardList() 

// Вывод аватара и описания
function addUserInfo() {
  const avatar = document.querySelector('.profile__image');
  const userName = document.querySelector('.profile__title');
  const userAbout = document.querySelector('.profile__description');
  getUserInfo()
  .then((data) => {
    avatar.style.backgroundImage = `url(${data.avatar})`;
    userName.textContent = data.name;
    userAbout.textContent = data.about;
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`)
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

// Попап обновления аватара
// Константы обновления аватара
const changeAvatarButton = document.querySelector('.profile__change-avatar-button');
const popupChangeAvatar = document.querySelector('.popup_change-avatar');
const closeButtonPopupChangeAvatar = popupChangeAvatar.querySelector('.popup__close');
const popupButtonChangeAvatar = popupChangeAvatar.querySelector('.popup__button');
const formChangeAvatar = document.querySelector('[name="change-avatar"]');
const avatarInput = document.querySelector('.popup__input_avatar');

// Открытие обновления аватара
changeAvatarButton.addEventListener('click', function () {
  openModal(popupChangeAvatar);
});

// Закрытие обновления аватара
closeButtonPopupChangeAvatar.addEventListener('click', function () {
  closeModal(popupChangeAvatar);
  const formChangeAvatar = popupChangeAvatar.querySelector('.popup__form');
  clearValidation(formChangeAvatar, validationConfig);
});

// Обработка формы обновления аватара
function changeAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupButtonChangeAvatar)
  const avatar = avatarInput.value;
  const avatarImage = document.querySelector('.profile__image');
  changeAvatar({avatar})
  .then((data) => {
    avatarImage.style.backgroundImage = `url(${data.avatar})`;
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`)
  })
  .finally(() => {
    renderLoading(false, popupButtonChangeAvatar);
  });
  closeModal(popupChangeAvatar);
}
formChangeAvatar.addEventListener('submit', changeAvatarFormSubmit); 

// Попап редактирования профиля
// Константы редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const closeButtonPopupTypeEdit = popupTypeEdit.querySelector('.popup__close');
const popupButtonTypeEdit = popupTypeEdit.querySelector('.popup__button');
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
  renderLoading(true, popupButtonTypeEdit);
  const name = nameInput.value;
  const about = jobInput.value;  
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  patchUserInfo({name, about})
  .catch((err) => {
    renderError(`Ошибка: ${err}`)
  })
  .finally(() => {
    renderLoading(false, popupButtonTypeEdit);
  });
  closeModal(popupTypeEdit);
}

formProfile.addEventListener('submit', editFormSubmit); 

// Попап добавления новой карточки
// Константы добавления новой карточки
const addButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const closeButtonPopupTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const popupButtonTypeNewCard = popupTypeNewCard.querySelector('.popup__button');
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
  renderLoading(true, popupButtonTypeNewCard)
  const name = newPlaceNameInput.value;
  const link = newPlaceLinkInput.value;
  const likes = "";
  const isOwner = true;
  const id = "";
  const card = createCard(name, link, likes, id, deleteCard, clickLike, openImage, isOwner)
  cardsList.prepend(card);
  newPlaceNameInput.value = "";
  newPlaceLinkInput.value = "";
  closeModal(popupTypeNewCard);
  clearValidation(popupTypeNewCard, validationConfig);
  postCards({
    name,
    link,
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`);
    })
  .finally(() => {
    renderLoading(false, popupButtonTypeNewCard);
  });
}

// Обработка формы
formNewCard.addEventListener('submit', addCard); 

// Попап открытия картинки по клику
// Константы открытия картинки по клику
const popupTypeImage = document.querySelector('.popup_type_image');
const closeButtonPopupTypeImage = popupTypeImage.querySelector('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image')
const popupCaption = popupTypeImage.querySelector('.popup__caption')

// Открытие открытия картинки по клику
function openImage(name, link) {
  openModal(popupTypeImage);
  popupImage.src = link;
  popupImage.alt = name; 
  popupCaption.textContent = name;
}

// Закрытие открытия картинки по клику
closeButtonPopupTypeImage.addEventListener('click', function () {
  closeModal(popupTypeImage);
});

enableValidation(validationConfig);

// Loading
function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
} 
