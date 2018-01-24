import './styles.scss';

import { fetchContacts, makeContactsList } from './contactsList';
import { initFormContactToggle } from './newContactForm';


$(document).ready(() => {
  fetchContacts();
  window.addEventListener('contacts-fetch', (event) => {
    console.log('Contacts fetched!', event);
    makeContactsList(window.__CONTACTS__STORE__, $('.contacts-list'));
  });
  window.addEventListener('open-form-update', () => {
    formElement[0].dataset.formType = 'update';
    openForm(newButton, formElement);
  });
  // fetchAndMakeContactsList();
  initFormContactToggle();
});