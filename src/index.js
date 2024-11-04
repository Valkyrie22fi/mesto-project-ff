import './pages/index.css';
import { addCardList } from './components/card.js';
import './components/popupTypeEdit.js';
import './components/popupTypeImage.js';
import './components/popupTypeNewCard.js'

export function openPopup(item) {
  "открыть попап"
  item.classList.add('popup_is-opened');
  closePopupEsc(item);
}

export function closePopup(item) {
  "закрыть попап"
  item.classList.add('popup_is-animated');
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