import { openModal, closeModal } from '../index.js'

// Модальное окно редактирования
const editButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const closeButtonPopupTypeEdit = popupTypeEdit.querySelector('.popup__close');
const formProfile = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function openPopupTypeEdit(item) {
  "открыть попап редактирования"
  editButton.addEventListener('click', function () {
    openModal(popupTypeEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  });
}

function closePopupTypeEdit() {
  "закрыть попап редактирования"
  closeButtonPopupTypeEdit.addEventListener('click', function () {
    closeModal(popupTypeEdit);
  });
}

function editFormSubmit(evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let job = jobInput.value;  
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closeModal(popupTypeEdit);
}

export { openPopupTypeEdit, closePopupTypeEdit, popupTypeEdit, formProfile, editFormSubmit as handleFormSubmit }