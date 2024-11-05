// Темплейт карточки 
const cardTemplate = document.querySelector('#card-template').content; 

// создать и вернуть элемент карточки
function createCard(name, link, deleteCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  cardElement.querySelector('.card__title').textContent = name; 
  cardElement.querySelector('.card__image').src = link; 
  cardElement.querySelector('.card__image').alt = name;
 
  deleteButton.addEventListener('click', () => { 
    deleteCallback(cardElement) 
  }); 

  return cardElement; 
} 

// удалить карточку
function deleteCard(card) {
  card.remove(); 
}; 

// поставить лайк на карточку
function likeButton(item) {
  const likeButton = item.querySelector('.card__like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.add('card__like-button_is-active');
  });
}

export { likeButton, createCard, deleteCard };