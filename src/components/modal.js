// открыть попап
export function openModal(item) {
  item.classList.add('popup_is-opened');
  item.addEventListener('click', closePopupOverlay); 
  document.addEventListener('keydown', closePopupEsc);
}

// закрыть попап
export function closeModal(item) {
  item.classList.remove('popup_is-opened');
  item.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
}

// закрыть попап кликом по оверлей
function closePopupOverlay(evt) {
  if(evt.target.classList.contains('popup_is-opened')) {
    closeModal(evt.target)
  }
}

// закрыть попап по нажатию на Esc
function closePopupEsc(evt) {
  if(evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'))
  }
}