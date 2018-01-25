import $ from 'jquery';
import './styles.scss';

import { makeContactsList } from './contactsList';
import { initFormSubmit } from './contactForm';
import { fetchAllContacts } from './contactStore';
import { store } from './contactStore';


$(document).ready(() => {
  initFormSubmit();
  fetchAllContacts();

  window.addEventListener('contacts-fetch', (event) => {
    console.log('Contacts fetched!', event);
    makeContactsList(store.getStore());
  });
  
  // window.addEventListener('open-form-update', () => {
  //   formElement[0].dataset.formType = 'update';
  //   openForm(newButton, formElement);
  // });
  // fetchAndMakeContactsList();
  // initFormContactToggle();
});