import { openModal, closeModal } from '../index.js'

// Модальное окно картинки
const popupTypeImage = document.querySelector('.popup_type_image');
const closeButtonPopupTypeImage = popupTypeImage.querySelector('.popup__close');

function closePopupTypeImage() {
  "закрыть попап редактирования"
  closeButtonPopupTypeImage.addEventListener('click', function () {
    closeModal(popupTypeImage);
  });
}

function openImage(link, name) {
  "открыть попап картинки"
  openModal(popupTypeImage);
  popupTypeImage.querySelector('.popup__image').src = link;
  popupTypeImage.querySelector('.popup__image').alt = name; 
  popupTypeImage.querySelector('.popup__caption').textContent = name;
}

export { openImage, closePopupTypeImage }