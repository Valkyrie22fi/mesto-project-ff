// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const addButton = container.querySelector('.profile__add-button');

// @todo: Функция создания карточки
function addCards(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement)
  });
  
  return cardElement;
}

// @todo: Вывести карточки на страницу
addButton.addEventListener('click', () => {
  initialCards.forEach((el) => {
    cardsContainer.append(addCards(el.name, el.link)); 
  })
});

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
};
