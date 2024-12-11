// Темплейт карточки 
const cardTemplate = document.querySelector('#card-template').content;


// создать и вернуть элемент карточки
function createCard(name, link, likes, deleteCallback, clickLike, openImage, isOwner) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title')
  const cardImage = cardElement.querySelector('.card__image')
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count'); 
  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (!isOwner) {
    deleteButton.classList.add('hidden');
  }
  cardTitle.textContent = name; 
  cardImage.src = link; 
  cardImage.alt = name;
  likeCount.textContent = likes;

  //открытие модального окна картинки
  cardImage.addEventListener('click', function () {
    openImage(name, link );
  });
 
  if (isOwner) {
    deleteButton.classList.remove('hidden');
    deleteButton.addEventListener('click', () => { 
      deleteCallback(cardElement) 
    }); 
  }
  

  likeButton.addEventListener('click', clickLike)

  return cardElement; 
} 

// удалить карточку
function deleteCard(card) {
  card.remove(); 
}; 

// поставить лайк на карточку
function clickLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { clickLike, createCard, deleteCard };