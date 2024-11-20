import './pages/index.css';
import { addCardList } from './components/cards.js';
import { openPopupTypeEdit, closePopupTypeEdit, popupTypeEdit, formProfile, handleFormSubmit } from './components/popupTypeEdit.js';
import { openPopupTypeNewCard, closePopupTypeNewCard, popupTypeNewCard, formNewCard, addCard } from './components/popupTypeNewCard.js'
import { closePopupTypeImage, popupTypeImage } from './components/popupTypeImage.js';

// открыть попап
export function openModal(item) {
  item.classList.add('popup_is-opened', 'popup_is-animated');
  item.removeEventListener('click', openPopupClick);
  document.addEventListener('keydown', closePopupEsc);
}

// закрыть попап
export function closeModal(item) {
  item.classList.remove('popup_is-opened');
  item.addEventListener('click', openPopupClick); 
  item.removeEventListener('keydown', closePopupEsc);
}

// открыть попап по клику
function openPopupClick(evt) {
  evt.target.classList.remove('popup_is-opened');
}

// закрыть попап по нажатию на Esc
function closePopupEsc(evt) {
  if(evt.key === 'Escape') {
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  }
}
// Вывод карточек на страницу 
addCardList() 

// Попап редактирования
// Открытие
openPopupTypeEdit() 
// Закрытие
closePopupTypeEdit() 
closeModal(popupTypeEdit);
// Обработка формы
formProfile.addEventListener('submit', handleFormSubmit); 

// Попап добавления новой карточки
// Открытие
openPopupTypeNewCard() 
// Закрытие
closePopupTypeNewCard() 
closeModal(popupTypeNewCard);
// Обработка формы
formNewCard.addEventListener('submit', addCard); 

// Попап открытия картинки по клику
// Закрытие
closePopupTypeImage() 
closeModal(popupTypeImage);
