// Темплейт карточки 
const cardTemplate = document.querySelector('#card-template').content;


// создать и вернуть элемент карточки
function createCard(name, link, deleteCallback, clickLike) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title')
  const cardImage = cardElement.querySelector('.card__image')
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  cardTitle.textContent = name; 
  cardImage.src = link; 
  cardImage.alt = name;
 
  deleteButton.addEventListener('click', () => { 
    deleteCallback(cardElement) 
  }); 

  likeButton.addEventListener('click', clickLike)

  return cardElement; 
} 

// удалить карточку
function deleteCard(card) {
  card.remove(); 
}; 

// поставить лайк на карточку
function clickLike(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    like(evt.target);
  }
}

function like(item) {
  item.classList.toggle('card__like-button_is-active');
}

export { clickLike, createCard, deleteCard };