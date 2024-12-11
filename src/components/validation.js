const showError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  if (inputElement.validity.patternMismatch) {
    errorElement.textContent = inputElement.dataset.error;
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
      changeValidation(formElement, formClasses, inputList, inputElement, buttonElement);
    });
  });
};

// Проверка валидации инпутов и переключение состояния кнопки
export const changeValidation = (profileForm, formClasses, inputList, inputElement, buttonElement) => {
  checkInputValidity(profileForm, inputElement, formClasses.inputErrorClass, formClasses.errorClass);
  toggleButtonState(inputList, buttonElement, formClasses.inactiveButtonClass);
}

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

// Очистка ошибок валидации вызовом clearValidation
export const clearValidation = (profileForm, formClasses) => {
  const inputList = Array.from(profileForm.querySelectorAll(formClasses.inputSelector));
  const buttonElement = profileForm.querySelector(formClasses.submitButtonSelector);
  buttonElement.disabled = true;
  buttonElement.classList.add(formClasses.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    hideError(profileForm, inputElement, formClasses.inputErrorClass, formClasses.errorClass);
  });
}
