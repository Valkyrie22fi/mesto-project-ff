export const BASE_URL = "https://nomoreparties.co/v1/wff-cohort-22";
export const TOKEN = "5779ed29-805b-4362-b372-0770a26315b6";

const handleResponse = (response) => {
  return response.json();
};

// GET запрос загрузки карточек
export const getCards = () => {
  return fetch(`${BASE_URL}/cards`, {
    method: "GET",
    headers: {
      authorization: TOKEN
    },
  }).then(handleResponse)
}

// GET запрос загрузки информации о пользователе
export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: TOKEN
    },
  }).then(handleResponse)
}

// PATCH редактирование профиля
export const patchUserInfo = ({name, about}) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      about
    })
  });
}

// POST запрос добавления карточки
export const postCards = ({name, link}) => {
  return fetch(`${BASE_URL}/cards`, {
    method: "POST",
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json; charset=UTF-8'
    },
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
  return fetch(`${BASE_URL}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json; charset=UTF-8'
    },
  }).then(handleResponse)
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  }); ;
}

// PUT постановка лайка
export const likeCard = (cardId) => {
  return fetch(`${BASE_URL}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json; charset=UTF-8'
    },
  }).then(handleResponse)
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  }); ;
}

// DELETE снятие лайка
export const unlikeCard = (cardId) => {
  return fetch(`${BASE_URL}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json; charset=UTF-8'
    },
  }).then(handleResponse)
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  }); ;
}

// PATCH обновление аватарки
export const changeAvatar = ({avatar}) => {
  console.log('avatar', avatar)
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      avatar
    }),
  }).then(handleResponse)
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  }); ;
}