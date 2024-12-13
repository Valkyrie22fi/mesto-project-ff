import './pages/index.css';
import { clickLike, createCard, deleteCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getCards, getUserInfo, postCards, patchUserInfo, changeAvatar } from './components/api.js';

// Глобальные переменные 
const cardsList = document.querySelector('.places__list'); 
const profileInfo = document.querySelector('.profile__info');
const avatarImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupForm = document.querySelector('.popup__form');

// вывести все карточки на страницу 
function presentData() {
  Promise.all([getCards(), getUserInfo()])
  .then(([allCards, aboutMe]) => {
    addCardList(allCards, aboutMe);
    addUserInfo(aboutMe)
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`)
  })
}; 
presentData();

function addCardList(allCards, aboutMe) {
  allCards.forEach((el) => { 
    const card = addCardItem(el, aboutMe._id)
    cardsList.append(card) 
}) 
}

function addCardItem(cardData, userId) {
  const cardPermitions = {
    isOwner: userId === cardData.owner._id,
    isLike: Boolean(cardData.likes.find(like => like._id === userId)),
  };
  const likes = cardData.likes.length;
  const id = cardData._id;
  const card = createCard(cardData.name, cardData.link, likes, id, deleteCard, clickLike, openImage, cardPermitions)
  return card
}

// Вывод аватара и описания
function addUserInfo(userData) {
  avatarImage.style.backgroundImage = `url(${userData.avatar})`;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileInfo.id = userData._id;
}; 

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
  clearValidation(popupForm, validationConfig);
});

// Обработка формы обновления аватара
function changeAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupButtonChangeAvatar)
  const avatar = avatarInput.value;
  changeAvatar({avatar})
  .then((data) => {
    avatarImage.style.backgroundImage = `url(${data.avatar})`;
    closeModal(popupChangeAvatar);
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`)
  })
  .finally(() => {
    renderLoading(false, popupButtonChangeAvatar);
  });
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

// Открытие редактирования профиля
editButton.addEventListener('click', function () {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Закрытие редактирования профиля
closeButtonPopupTypeEdit.addEventListener('click', function () {
  closeModal(popupTypeEdit);
  clearValidation(popupForm, validationConfig);
});

// Обработка формы редактирования профиля
function editFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupButtonTypeEdit);
  const name = nameInput.value;
  const about = jobInput.value; 
  patchUserInfo({name, about})
  .then((response) => {
    if (response.ok) {
      profileTitle.textContent = name;
      profileDescription.textContent = about;
      closeModal(popupTypeEdit);
    }
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`)
  })
  .finally(() => {
    renderLoading(false, popupButtonTypeEdit);
  });
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
  formNewCard.reset();
  clearValidation(popupTypeNewCard, validationConfig);
});

// добавить карточку в начало списка
function addNewCard(evt) {
  evt.preventDefault();
  renderLoading(true, popupButtonTypeNewCard)
  const name = newPlaceNameInput.value;
  const link = newPlaceLinkInput.value;
  postCards({
    name,
    link,
  })
  .then((data) => {
    const card = addCardItem(data, profileInfo.id);
    closeModal(popupTypeNewCard);
    cardsList.prepend(card);
    clearValidation(popupTypeNewCard, validationConfig);
    formNewCard.reset();
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`);
    })
  .finally(() => {
    renderLoading(false, popupButtonTypeNewCard);
  });
  
}

// Обработка формы
formNewCard.addEventListener('submit', addNewCard); 

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

// Error
function renderError(err) {
  console.log('Ошибка. Запрос не выполнен: ', err)
} 
