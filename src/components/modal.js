// открыть попап
export function openModal(item) {
  item.classList.add('popup_is-opened', 'popup_is-animated');
  item.addEventListener('click', closePopupOverlay); 
  
  document.addEventListener('keydown', closePopupEsc);
}

// закрыть попап
export function closeModal(item) {
  item.classList.remove('popup_is-opened');
  item.removeEventListener('keydown', closePopupEsc);
  item.removeEventListener('click', closePopupOverlay);
}

// закрыть попап кликом по оверлей
function closePopupOverlay(evt) {
  evt.target.classList.remove('popup_is-opened');
}

// закрыть попап по нажатию на Esc
function closePopupEsc(evt) {
  if(evt.key === 'Escape') {
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  }
}