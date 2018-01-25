import $ from 'jquery';
import { 
  openForm, 
  closeForm,
  formReset, 
  favoriteChecked, 
  favoriteUnchecked, 
  makeDataForPost 
} from './contactFormFunctions';
import { createContact, updateContact, store } from './contactStore';
import { modalContactUpdate } from './contactModal';

const urlApi = 'http://localhost:3000/v1/contacts';
const $form = $('#contact-new-form');
const $buttonForm = $('#contact-new-button');
const $favoriteFormButton = $('#contact-new-favorite-button');
const $favoriteCheckbox = $('#contact-new-favorite-checkbox');

export const formOptionsDefault = {
  form: $form,
  buttonForm: $buttonForm,
  favoriteCheckbox: $favoriteCheckbox,
  favoriteFormButton: $favoriteFormButton,
  url: urlApi,
};

export const submitDone = (form, buttonForm, favoriteFormButton, favoriteCheckbox) => {
  formReset(form);
  closeForm(buttonForm, form);
  favoriteUnchecked(favoriteFormButton, favoriteCheckbox);
};
export const initFormToggles = (form, buttonForm, favoriteFormButton, favoriteCheckbox) => {
  buttonForm.click((event) => {
    event.preventDefault();
    const formHTMLElement = form[0];    
    if (buttonForm.hasClass('active')) {
      formHTMLElement.dataset.formType = '';
      formReset(form);
      closeForm(buttonForm, form);
      return;
    }
    formHTMLElement.dataset.formType = 'new';
    openForm(buttonForm, form);
  });
  // Favorite form button
  favoriteFormButton.click((event) => {
    event.preventDefault();
    if (favoriteFormButton.hasClass('active')) {
      favoriteUnchecked(favoriteFormButton, favoriteCheckbox);
      return;
    }
    favoriteChecked(favoriteFormButton, favoriteCheckbox);
  });
};

export const initFormSubmit = (options = formOptionsDefault) => {
  const { form, buttonForm, favoriteCheckbox, favoriteFormButton, url } = options;
  initFormToggles(form, buttonForm, favoriteFormButton, favoriteCheckbox);
  form.submit((event) => {
    // DOM Element
    const formHTMLElement = form[0];    
    event.preventDefault();
    // Check form validation
    if (!formHTMLElement.checkValidity()) {
      form.addClass('was-validated');
      event.stopPropagation();
      return;
    }
    // if form type to create new contact
    if (formHTMLElement.dataset.formType === 'new') {
      const postData = makeDataForPost(Array.from(form.serializeArray()));      
      createContact(postData, url);
      submitDone(form, buttonForm, favoriteFormButton, favoriteCheckbox);
    }
    if (formHTMLElement.dataset.formType === 'update') {
      const postData = makeDataForPost(Array.from(form.serializeArray()));      
      const id = formHTMLElement.dataset.updateId;
      if (id) {
        console.log('Open modal update for', id);
        modalContactUpdate(store.findContactById(id), () => {
          updateContact(postData, id);
          submitDone(form, buttonForm, favoriteFormButton, favoriteCheckbox);
        });
      }
    }
    
  });
  return form;
};