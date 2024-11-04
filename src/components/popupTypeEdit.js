import { openPopup, closePopup, closePopupOverlay } from '../index.js'

// Модальное окно редактирования
const editButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const closeButtonPopupTypeEdit = popupTypeEdit.querySelector('.popup__close');
const formProfile = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

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