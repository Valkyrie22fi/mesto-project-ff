import './pages/index.css';
import { clickLike, createCard, deleteCard } from './components/card.js';
import { initialCards } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';


// Вывод карточек на страницу 
const cardsList = document.querySelector('.places__list'); 

// вывести все карточки на страницу 
function addCardList() {
  initialCards.forEach((el) => { 
    const card = createCard(el.name, el.link, deleteCard, clickLike, openImage)
    cardsList.append(card) 
  }) 
}; 
addCardList() 

// Попап редактирования
// Константы
const editButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const closeButtonPopupTypeEdit = popupTypeEdit.querySelector('.popup__close');
const formProfile = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Открытие
editButton.addEventListener('click', function () {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Закрытие
closeButtonPopupTypeEdit.addEventListener('click', function () {
  closeModal(popupTypeEdit);
});

// Обработка формы
function editFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;  
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closeModal(popupTypeEdit);
}

formProfile.addEventListener('submit', editFormSubmit); 

// Попап добавления новой карточки
// Константы
const addButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const closeButtonPopupTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const formNewCard = document.querySelector('[name="new-place"]');
const newPlaceNameInput = document.querySelector('.popup__input_type_card-name');
const newPlaceLinkInput = document.querySelector('.popup__input_type_url');

// Открытие
addButton.addEventListener('click', function () {
  openModal(popupTypeNewCard);
});

// Закрытие
closeButtonPopupTypeNewCard.addEventListener('click', function () {
  closeModal(popupTypeNewCard);
});

// добавить карточку в начало списка
function addCard(evt) {
  evt.preventDefault();
  const name = newPlaceNameInput.value;
  const link = newPlaceLinkInput.value;
  const card = createCard(name, link, deleteCard, clickLike, openImage)
  cardsList.prepend(card);
  closeModal(popupTypeNewCard);
  newPlaceNameInput.value = "";
  newPlaceLinkInput.value = "";
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

// Валидация
const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  if (inputElement.validity.patternMismatch) {
    errorElement.textContent = "Может содержать только латинские и кириллические буквы, знаки дефиса и пробелы"
  } else {
    errorElement.textContent = errorMessage;
  }
  errorElement.classList.add('popup__input-error_active');
};

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  console.log(inputElement.validity.valid)
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    
    buttonElement.disabled = true;
    buttonElement.classList.add('button_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('button_inactive');
  }
}; 

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  console.log(inputList)
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__set'));

    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

enableValidation();