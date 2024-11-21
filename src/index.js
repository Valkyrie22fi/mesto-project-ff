import './pages/index.css';
import { clickLike, createCard, deleteCard } from './components/card.js';
import { initialCards } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';


// Вывод карточек на страницу 
const cardsList = document.querySelector('.places__list'); 

// вывести все карточки на страницу 
function addCardList() {
  initialCards.forEach((el) => { 
    const card = createCard(el.name, el.link, deleteCard, clickLike)
    //открытие модального окна картинки
    const cardImage = card.querySelector('.card__image')
    cardImage.addEventListener('click', function () {
      openImage(el.name, el.link );
    });

    cardsList.append(card) 
  }) 
}; 
addCardList() 

// Добавление анимации попапа
// Константы
const popup = document.querySelector('.popup');
// Добавление класса анимации
popup.classList.add('popup_is-animated');


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
function openPopupTypeEdit(item) {
  editButton.addEventListener('click', function () {
    openModal(popupTypeEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  });
}
openPopupTypeEdit() 

// Закрытие
function closePopupTypeEdit() {
  closeButtonPopupTypeEdit.addEventListener('click', function () {
    closeModal(popupTypeEdit);
  });
}
closePopupTypeEdit() 
closeModal(popupTypeEdit);

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
function openPopupTypeNewCard(item) {
  addButton.addEventListener('click', function () {
    openModal(popupTypeNewCard);
  });
}
openPopupTypeNewCard() 

// Закрытие
function closePopupTypeNewCard() {
  closeButtonPopupTypeNewCard.addEventListener('click', function () {
    closeModal(popupTypeNewCard);
  });
}
closePopupTypeNewCard() 
closeModal(popupTypeNewCard);

// добавить карточку в начало списка
function addCard(evt) {
  evt.preventDefault();
  const name = newPlaceNameInput.value;
  const link = newPlaceLinkInput.value;

  const card = createCard(name, link, deleteCard, clickLike)
   //открытие модального окна картинки
   const cardImage = card.querySelector('.card__image')
   cardImage.addEventListener('click', function () {
     openImage(name, link);
   });
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

// Открытие
function openImage(name, link) {
  openModal(popupTypeImage);
  popupTypeImage.querySelector('.popup__image').src = link;
  popupTypeImage.querySelector('.popup__image').alt = name; 
  popupTypeImage.querySelector('.popup__caption').textContent = name;
}

// Закрытие
function closePopupTypeImage() {
  closeButtonPopupTypeImage.addEventListener('click', function () {
    closeModal(popupTypeImage);
  });
}
closePopupTypeImage() 
closeModal(popupTypeImage);
