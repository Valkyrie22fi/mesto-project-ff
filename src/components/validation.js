const formElement = document.querySelector('.popup__form');

const showError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  if (inputElement.validity.patternMismatch && inputElement.id !== "link-input") {
    errorElement.textContent = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
  } else {
    errorElement.textContent = errorMessage;
  }
  errorElement.classList.add(errorClass);
};

const hideError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}; 

// Установить слушатель на все инпуты формы
const setEventListeners = (formElement, formClasses) => {
  const inputList = Array.from(formElement.querySelectorAll(formClasses.inputSelector));
  const buttonElement = formElement.querySelector(formClasses.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formClasses.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formClasses.inputErrorClass, formClasses.errorClass);
      toggleButtonState(inputList, buttonElement, formClasses.inactiveButtonClass);
    });
  });
};

// Включить валидацию
export const enableValidation = (formClasses) => {
  const formList = Array.from(document.querySelectorAll(formClasses.formSelector));


  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, formClasses);
  });
};
