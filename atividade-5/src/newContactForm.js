import jQuery from 'jquery';
import { fetchAndMakeContactsList } from './contactsList';

const API_URL = 'http://localhost:3000/v1/contacts';

export const closeForm = (button, form) => {
  button.removeClass(['active', 'btn-outline-danger']);
  button.addClass('btn-outline-primary');
  button.html('Novo Contato<i class="material-icons ml-1">person_add</i>');
  form.fadeOut(100);
};
export const openForm = (button, form) => {
  button.removeClass('btn-outline-primary');
  button.addClass(['active', 'btn-outline-danger']);
  button.html('Cancelar<i class="material-icons ml-1">cancel</i>');
  form.fadeIn(300);
};
export const favoriteUnchecked = (button, checkbox) => {
  button.removeClass(['active', 'btn-primary']);
  button.children('i').html('star_border');
  button.addClass('btn-outline-secondary');
  checkbox.prop('checked', false);
};
export const favoriteChecked = (button, checkbox) => {
  checkbox.prop('checked', true);
  button.addClass(['active', 'btn-primary']);
  button.children('i').html('star');
  button.removeClass('btn-outline-secondary');
};

export const formReset = (form) => {
  form[0].reset();
  form.hide();
};
// Make post data object
export const makeDataForPost = (formDataArray) => {
  const data = {
    isFavorite: false,
    info: {}
  };
  formDataArray.forEach(input => {
    if (input.name.includes('favorite')) {
      data.isFavorite = true;
      return;
    }
    if (input.name.includes('info')) {
      data.info[input.name.split('-')[1]] = input.value;
      return;
    }
    data[input.name] = input.value;
  });
  if (!data.info.avatar) {
    data.info.avatar = 'http://via.placeholder.com/128x128';
  }
  return data;
};
export const formElement = $('#contact-new-form');
export const newButton = $('#contact-new-button').html('Novo Contato<i class="material-icons ml-1">person_add</i>');

export const initFormContactToggle = (apiUrl = API_URL, $ = jQuery) => {
  const favoriteFormButton = $('#contact-new-favorite-button');
  const favoriteCheckbox = $('#contact-new-favorite-checkbox');
  // Hide form element
  formElement.hide();
  // Form Submit
  formElement.submit(function (event) {
    event.preventDefault();
    if (!formElement[0].checkValidity()) {
      formElement.addClass('was-validated');
      event.stopPropagation();
      return;
    }
    const formData = Array.from($(this).serializeArray());
    const postData = makeDataForPost(formData);
    console.log(apiUrl, postData);
    // POST DATA
    if (formElement[0].dataset.formType === 'new') {
      console.log('NEW USER CALLED');
      $.post(apiUrl, postData)
        .done(() => {
          // Reset form
          formReset(formElement);
          closeForm(newButton, formElement);
          favoriteUnchecked(favoriteFormButton, favoriteCheckbox);
          // Fetch contacts list
          fetchAndMakeContactsList();
          window.scroll(0, 0);
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
  // Toggle form
  newButton.click(function () {
    const button = $(this);
    if (button.hasClass('active')) {
      formElement[0].dataset.formType = '';
      formReset(formElement);
      closeForm(button, formElement);
      return;
    }
    formElement[0].dataset.formType = 'new';
    openForm(button, formElement);
  });
  // Favorite form button
  favoriteFormButton.click(function () {
    const button = $(this);
    if (button.hasClass('active')) {
      favoriteUnchecked(button, favoriteCheckbox);
      return;
    }
    favoriteChecked(button, favoriteCheckbox);
  });
};