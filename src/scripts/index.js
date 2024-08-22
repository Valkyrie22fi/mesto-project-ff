// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardsList = content.querySelector('.places__list');
const addButton = content.querySelector('.profile__add-button');

// @todo: Функция создания карточки
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

// @todo: Вывести карточки на страницу
function addCardList() {
  initialCards.forEach((el) => {
    cardsList.append(createCard(el.name, el.link, deleteCard))
  })
};

addCardList()

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
};
