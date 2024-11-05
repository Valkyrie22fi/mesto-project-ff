// Темплейт карточки 
const cardTemplate = document.querySelector('#card-template').content; 


function createCard(name, link, deleteCallback) {
  "создать и вернуть элемент карточки"
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  console.log('link', link)
  console.log('name', name)
  cardElement.querySelector('.card__title').textContent = name; 
  cardElement.querySelector('.card__image').src = link; 
  cardElement.querySelector('.card__image').alt = name;
 
  deleteButton.addEventListener('click', () => { 
    deleteCallback(cardElement) 
  }); 

  return cardElement; 
} 

function deleteCard(card) {
  "Удалить карточку"
  card.remove(); 
}; 

function likeButton(item) {
  "поставить лайк на карточку"
  const likeButton = item.querySelector('.card__like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.add('card__like-button_is-active');
  });
}

export { likeButton, createCard, deleteCard };