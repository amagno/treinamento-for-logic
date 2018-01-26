import $ from 'jquery';
import { makeContactsList, contactListOptionsDefault } from './contactsList';
import { initFormSubmit } from './contactForm';
import { fetchAllContacts } from './contactStore';
import { initSearchForm } from './contactSearchForm';
import { initContactsPagination, makePaginationButtons } from './contactsPagination';
import { store, numberOfPages, initStore } from './contactStore';

import './styles.scss';
import 'bootstrap';
// import 'bootstrap/js/dist/modal';
// import 'bootstrap/js/dist/dropdown';
// import Util from 'bootstrap/js/src/util';

// window.Util = Util;

$(document).ready(() => {
  initStore();
  initFormSubmit();
  initSearchForm();  
  initContactsPagination();
  // Bootstrap tooltip
  $('[data-tooltip="true"]').tooltip();




  // EVENTS
  window.addEventListener('contacts-fetch', event => {
    event.preventDefault();
    const contacts = store.getStore();
    // console.log('contacts-fetch event', contacts);
    // const limit = store.getPaginationInfo().limit;
    // console.log('limit of contacts ', limit);
    // const pages = numberOfPages(limit, contacts);
    const { page, pages } = store.getPaginationInfo();
    // console.log('number of pages ', pages);
    makePaginationButtons(pages, page);
    console.log('PAGINATION INFO: ', store.getPaginationInfo());
    makeContactsList(contacts);
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