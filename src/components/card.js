// Темплейт карточки 
const cardTemplate = document.querySelector('#card-template').content; 

// создать и вернуть элемент карточки
function createCard(name, link, deleteCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title')
  const cardImage = cardElement.querySelector('.card__image')
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  cardTitle.textContent = name; 
  cardImage.src = link; 
  cardImage.alt = name;
 
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