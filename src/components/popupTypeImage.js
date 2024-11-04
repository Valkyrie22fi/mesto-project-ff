import { openPopup, closePopup, closePopupOverlay} from '../index.js'

// Модальное окно картинки
const popupTypeImage = document.querySelector('.popup_type_image');
const closeButtonPopupTypeImage = popupTypeImage.querySelector('.popup__close');

closeButtonPopupTypeImage.addEventListener('click', function () {
  closePopup(popupTypeImage);
});

closePopupOverlay(popupTypeImage);

function openImage(item, element) {
  "открыть попап картинки"
  openPopup(item);
  item.querySelector('.popup__image').src = element.link;
  item.querySelector('.popup__image').alt = element.name; 
  item.querySelector('.popup__caption').textContent = element.name;
}

export { openImage }