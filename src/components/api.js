
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
  headers: {
    authorization: '5779ed29-805b-4362-b372-0770a26315b6',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (response) => {
  return response.json();
};

// GET запрос загрузки карточек
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse)
}

// GET запрос загрузки информации о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse)
}

// PATCH редактирование профиля
export const patchUserInfo = ({name, about}) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  });
}

// POST запрос добавления карточки
export const postCards = ({name, link}) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    }),
  }).then(handleResponse)
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  }); ;
}

// DELETE запрос удаления карточки
export const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse)
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  }); ;
}

// PUT постановка лайка
export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse)
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  }); ;
}

// DELETE снятие лайка
export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse)
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  }); ;
}

// PATCH обновление аватарки
export const changeAvatar = ({avatar}) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar
    }),
  }).then(handleResponse)
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  }); ;
}