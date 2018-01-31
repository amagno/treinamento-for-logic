import jquery from 'jquery';
import { sanitizeContactsData } from '../utils';
import store from './store';

const urlApi = 'http://localhost:3000/v1/contacts';
const loadingDelay = 600;
// Fetch all contacts
export const fetchAllContacts = (url = urlApi, $ = jquery) => {
  store.dispatch('contacts-loading-show');  
  $.get(url)
    .done(response => {
      const data = sanitizeContactsData(response);
      store.setPaginationInfo({}, data);
      store.setStore(data);
      store.dispatch('contacts-fetch');
      setTimeout(() => store.dispatch('contacts-loading-hide'), 1000);   
    })
    .catch(error => console.error(error));
};
// Create contacts
export const createContact = (contact, url = urlApi, $ = jquery) => {
  store.dispatch('contacts-loading-show');  
  $.post(url, contact)
    .done((response) => {
      contact._id = response;
      const data = sanitizeContactsData([
        ...store.getStore(),
        contact
      ]);
      store.setPaginationInfo({}, data);
      store.setStore(data);
      store.dispatch('contacts-fetch');
      setTimeout(() => store.dispatch('contacts-loading-hide'), loadingDelay);      
    })
    .catch(error => console.log(error));
};
// Update contact
export const updateContact = (contactAttributes, id, url = urlApi, $ = jquery) => {
  const storeContact = store.findContactById(id);
  if (!storeContact) throw new Error(`contact: ${id} not found on store`);
  const contact = {
    ...storeContact,
    ...contactAttributes,  
  };
  $.ajax({
    method: 'PUT',
    url: `${url}/${id}`,
    data: contact
  })
    .done((response) => {
      console.log(response);
      const data = store.updateContact(contact);
      store.setStore(data);      
      store.setPaginationInfo({});
      store.dispatch('contacts-fetch');
    })
    .catch(error => console.error(error));
};
// Delete contacts
export const deleteContact = (id, url = urlApi, $ = jquery) => {
  if (!id) throw new Error('_id is not defined for delete!');
    $.ajax({
      method: 'DELETE',
      url: `${url}/${id}`
    })
      .done(() => {
        const data = sanitizeContactsData(store.removeContactById(id));
        store.setPaginationInfo({}, data);
        store.setStore(data);
        store.dispatch('contacts-fetch');
      })
      .catch(error => console.log(error));
};
// Order change
export const handleFilterChange = (filter) => {
  if (filter !== 'firstName' && filter !== 'lastName' && filter !== 'email') {
    throw new Error(`Filter: ${filter} is invalid!`);
  } 
  store.dispatch('contacts-loading-show');
  store.setFilter(filter);
  store.dispatch('contacts-fetch');
  setTimeout(() => store.dispatch('contacts-loading-hide'), loadingDelay);
};
// Handle search input
export const handleSearch = (field, value, url = urlApi, $ = jquery) => {
  const sU = `${url}?${field}=${value}`;
  $.get(sU)
    .done(response => {
      const data = sanitizeContactsData(response);
      store.setPaginationInfo({}, data);
      store.setStore(data);
      store.dispatch('contacts-fetch');
      store.dispatch('contacts-loading-hide');
    })
    .catch(error => console.error(error));
};
// Favorite only contacts
export const favoriteOnly = (state) => {
  store.dispatch('contacts-loading-show');
  store.setIsFavorite(state);
  store.setPaginationInfo({});
  store.dispatch('contacts-fetch');
  setTimeout(() => store.dispatch('contacts-loading-hide'), loadingDelay);
};
// Page limit change
export const handlePageLimitChange = (limit) => {
  store.dispatch('contacts-loading-show');
  store.setPaginationInfo({ limit });
  store.dispatch('contacts-fetch');
  setTimeout(() => store.dispatch('contacts-loading-hide'), loadingDelay);  
};
// Page change
export const handlePageChange = (page) => {
  store.setPaginationInfo({ page });
  store.dispatch('contacts-fetch');
};