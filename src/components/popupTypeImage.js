import { openModal, closeModal } from '../index.js'

// Модальное окно картинки
const popupTypeImage = document.querySelector('.popup_type_image');
const closeButtonPopupTypeImage = popupTypeImage.querySelector('.popup__close');

// открыть попап картинки
function openImage(name, link) {
  openModal(popupTypeImage);
  popupTypeImage.querySelector('.popup__image').src = link;
  popupTypeImage.querySelector('.popup__image').alt = name; 
  popupTypeImage.querySelector('.popup__caption').textContent = name;
}

//закрыть попап картинки
function closePopupTypeImage() {
  closeButtonPopupTypeImage.addEventListener('click', function () {
    closeModal(popupTypeImage);
  });
}

export { openImage, closePopupTypeImage, popupTypeImage }