import './pages/index.css';
import { addCardList } from './components/card.js';
import { openPopupTypeEdit, closePopupTypeEdit, popupTypeEdit, formProfile, handleFormSubmit } from './components/popupTypeEdit.js';
import { openImage, closePopupTypeImage, popupTypeImage } from './components/popupTypeImage.js';
import { openPopupTypeNewCard, closePopupTypeNewCard, popupTypeNewCard, formNewCard, addCard } from './components/popupTypeNewCard.js'

export function openPopup(item) {
  "открыть попап"
  item.classList.add('popup_is-opened');
  closePopupEsc(item);
}

export function closePopup(item) {
  "закрыть попап"
  item.classList.remove('popup_is-opened');
}

function closePopupEsc(item) {
  "закрыть попап по нажатию на Esc"
  
  document.addEventListener('keydown', function (evt) {
    if(evt.key === 'Escape') {
      item.classList.remove('popup_is-opened');
    }
  }); 
}

export function closePopupOverlay(item) {
  "закрыть попап кликом по оверлей"
  item.addEventListener('click', function (evt) {
    evt.target.classList.remove('popup_is-opened');
  }); 
}

// Вывод карточек на страницу 
addCardList() 

// Попап редактирования
// Открытие
openPopupTypeEdit() 
// Закрытие
closePopupTypeEdit() 
closePopupOverlay(popupTypeEdit);
// Обработка формы
formProfile.addEventListener('submit', handleFormSubmit); 

// Попап добавления новой карточки
// Открытие
openPopupTypeNewCard() 
// Закрытие
closePopupTypeNewCard() 
closePopupOverlay(popupTypeNewCard);
// Обработка формы
formNewCard.addEventListener('submit', addCard); 

// Попап открытия картинки по клику
// Закрытие
closePopupTypeImage() 
closePopupOverlay(popupTypeImage);
