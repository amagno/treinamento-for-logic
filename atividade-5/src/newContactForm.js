import jQuery from 'jquery';
import { fetchAndMakeContactsList } from './contactsList';

const API_POST = 'http://localhost:3000/v1/contacts';

const closeForm = (button, form) => {
  button.removeClass(['active', 'btn-outline-danger']);
  button.addClass('btn-outline-primary');
  button.html('Novo Contato<i class="material-icons ml-1">person_add</i>');
  form.fadeOut(100);
};
const openForm = (button, form) => {
  button.removeClass('btn-outline-primary');
  button.addClass(['active', 'btn-outline-danger']);
  button.html('Cancelar<i class="material-icons ml-1">cancel</i>');
  form.fadeIn(300);
};
const favoriteUnchecked = (button, checkbox) => {
  button.removeClass(['active', 'btn-primary']);
  button.children('i').html('star_border');
  button.addClass('btn-outline-secondary');
  checkbox.prop('checked', false);
};
const favoriteChecked = (button, checkbox) => {
  checkbox.prop('checked', true);
  button.addClass(['active', 'btn-primary']);
  button.children('i').html('star');
  button.removeClass('btn-outline-secondary');
};

export const initFormContactToggle = ($ = jQuery, apiUrl = API_POST) => {

  const newButton = $('#contact-new-button').html('Novo Contato<i class="material-icons ml-1">person_add</i>');
  const formElement = $('#contact-new-form');
  const favoriteCheckbox = $('#contact-new-favorite-checkbox');
  const favoriteFormButton = $('#contact-new-favorite-button');
  // Hide form element
  formElement.hide();
  // Form Submit
  formElement.submit(function (event) {
    console.log(this);
    event.preventDefault();
    if (!formElement[0].checkValidity()) {
      formElement.addClass('was-validated');      
      event.stopPropagation();
      return;
    }
    const formData = Array.from($(this).serializeArray());
    const data = {
      favorite: false,
      info: {}
    };
    formData.forEach(input => {
      if (input.name.includes('info')) {
        data.info[input.name.split('.')[1]] = input.value;
        return;
      }
      data[input.name] = input.value;
    });
    if (!data.info.avatar) {
      data.info.avatar = 'http://via.placeholder.com/128x128';
    }
    console.log(data);
    // POST DATA
    $.post(apiUrl, data)
      .done(data => {
        console.log(data, 'added to database');
        fetchAndMakeContactsList($, '.contacts-list', API_POST);
        closeForm(newButton, formElement);
        formElement[0].reset();
        formElement.hide();
      })
      .catch(error => {
        console.log(error);
      });
  });
  // Toggle form
  newButton.click(function () {
    const button = $(this);
    if (button.hasClass('active')) {
      closeForm(button, formElement);
      return;
    }
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