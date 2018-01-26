import $ from 'jquery';
import { makeContactsList, contactListOptionsDefault } from './contactsList';
import { initFormSubmit } from './contactForm';
import { fetchAllContacts } from './contactStore';
import { store } from './contactStore';
import { initSearchForm } from './contactSearchForm';

import './styles.scss';
import 'bootstrap';
// import 'bootstrap/js/dist/modal';
// import 'bootstrap/js/dist/dropdown';
// import Util from 'bootstrap/js/src/util';

// window.Util = Util;

$(document).ready(() => {
  initFormSubmit();
  initSearchForm();  
  fetchAllContacts();
  // Bootstrap tooltip
  $('[data-tooltip="true"]').tooltip();
  // contacts fetch event
  window.addEventListener('contacts-fetch', event => {
    event.preventDefault();
    console.log('contacts-fetch event', store.getStore());
    makeContactsList(store.getStore());
  });
  window.addEventListener('contacts-loading-show', event => {
    event.preventDefault();
    const pageLoader = $('#page-loader');
    console.log('contacts-loading-show event');
    const container = contactListOptionsDefault.contactsListContainer;
    container.hide();
    pageLoader.show();
  });
  window.addEventListener('contacts-loading-hide', event => {
    event.preventDefault();
    console.log('contacts-loading-hide event');

    const pageLoader = $('#page-loader');
    const container = contactListOptionsDefault.contactsListContainer;
    pageLoader.hide();
    container.fadeIn(500);
  });
});