import { openModal, closeModal } from '../index.js'

// Модальное окно картинки
const popupTypeImage = document.querySelector('.popup_type_image');
const closeButtonPopupTypeImage = popupTypeImage.querySelector('.popup__close');

// это не работает
// function openImage(link, name) {
//   "открыть попап картинки"
//   console.log('link', link)
//   console.log('name', name)
//   openModal(popupTypeImage);
//   popupTypeImage.querySelector('.popup__image').src = link;
//   popupTypeImage.querySelector('.popup__image').alt = name; 
//   popupTypeImage.querySelector('.popup__caption').textContent = name;
// }

// а так работает
function openImage(item, link, name) {
  "открыть попап картинки"
  openModal(item);
  item.querySelector('.popup__image').src = link;
  item.querySelector('.popup__image').alt = name; 
  item.querySelector('.popup__caption').textContent = name;
}

function closePopupTypeImage() {
  "закрыть попап редактирования"
  closeButtonPopupTypeImage.addEventListener('click', function () {
    closeModal(popupTypeImage);
  });
}



export { openImage, closePopupTypeImage, popupTypeImage }