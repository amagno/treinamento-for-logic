import { makeContactsList, contactListOptionsDefault } from './contactsList';
import { makePaginationButtons } from './contactsPagination';
import { getContactsPages } from './utils';
import { store } from './data';

export const initEventListeners = () => {
  window.addEventListener('contacts-fetch', event => {
    event.preventDefault();
    const { page, pages, limit } = store.getPaginationInfo();
    const contacts = store.getStore();    
    const contactsPages = getContactsPages(contacts, limit);

    console.log('CONTACTS PAGES', contactsPages);
    console.log('PAGINATION INFO: ', store.getPaginationInfo());

    makePaginationButtons(pages, page).fadeIn(300);
    makeContactsList(contactsPages[page - 1]);
  });
  // Loading
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
    container.fadeIn(300);
  });
};