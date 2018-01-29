import jquery from 'jquery';
import { sanitizeContactsData, numberOfPages, filterContacts } from './utils';

const urlApi = 'http://localhost:3000/v1/contacts';
const loadingDelay = 600;

export const store = {
  getIsFavorite: () => {
    return window.__CONTACTS__STORE__IS_FAVORITE__;
  },
  setIsFavorite: (boolean) => {
    window.__CONTACTS__STORE__IS_FAVORITE__ = boolean;
  },
  setFilter: (filter) => {
    window.__CONTACTS__STORE__FILTER__ = filter;
  },
  getFilter: () => {
    return window.__CONTACTS__STORE__FILTER__;
  },
  getPaginationInfo: () => {
    return window.__CONTACTS__STORE__PAGINATION__;
  },
  setPaginationInfo: (data = {}, contacts = store.getStore(), paginationInfo = store.getPaginationInfo()) => {
    console.log(paginationInfo);
    const limit = data.limit || paginationInfo.limit;
    const total = data.total || contacts.length;
    const pages = data.pages || numberOfPages(total, limit);
    const page = data.page || paginationInfo.page;
    window.__CONTACTS__STORE__PAGINATION__ = {
      page: page > pages ? pages : page,
      pages,
      limit,
      total
    };
  },
  setStore: (data) => {
    window.__CONTACTS__STORE__ = data; 
  },
  getStore: () => {
    const store = window.__CONTACTS__STORE__;
    const filter = window.__CONTACTS__STORE__FILTER__;
    const isFavorite = window.__CONTACTS__STORE__IS_FAVORITE__;
    const filtered = filterContacts(filter, store);
    if(isFavorite) { 
      return filtered.filter(c => c.isFavorite === true);
    };
    return filtered;
    // return window.__CONTACTS__STORE__;
  },
  getContactsPages: () => {
    const clone = Array.from(store.getStore());
    const pages = store.getPaginationInfo().pages;
    const limit = store.getPaginationInfo().limit;
    const data = [];
    for (let i = 0; i < clone.length; i += limit) {
      data.push(clone.slice(i, i + limit));
    }
    console.log('DATA  ----> ', data);    
    console.log('CLONE ----> ', clone); 
    console.log('PAGES ----> ', pages);
    console.log('LIMIT ----> ', limit);
    return data;
    
  },
  findContactById: (id) => {
    return store.getStore().find(contact => contact._id === id);
  },
  findIndexById: (id) => {
    return store.getStore().findIndex(contact => contact._id === id);
  },
  removeContactById: (id) => {
    return store.getStore().filter(contact => contact._id !== id);
  },
  dispatch: (eventString) => {
    const fetchEvent = new Event(eventString);
    window.dispatchEvent(fetchEvent);
  }
};
// Fetch all contacts
export const fetchAllContacts = (url = urlApi, $ = jquery) => {
  store.dispatch('contacts-loading-show');  
  $.get(url)
    .done(response => {
      console.log('FETCH DATA: ', response);
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
  console.log(contact);
  const update = store.getStore().map(c => c._id === id ? contact : c);
  const data = sanitizeContactsData(update);
  // console.log(data);
  store.setPaginationInfo({}, data);
  store.setStore(data);
  store.dispatch('contacts-fetch');
  
  $.ajax({
    method: 'PUT',
    url: `${url}/${id}`,
    data: contact
  })
    .done((response) => {
      console.log(response);
      console.log(id);
    })
    .catch(error => console.error(error));
};
// Delete contacts
export const deleteContact = (id, url = urlApi, $ = jquery) => {
  if (!id) throw new Error('_id is not defined for delete!');
    // store.dispatch('contacts-loading-show'); 
    $.ajax({
      method: 'DELETE',
      url: `${url}/${id}`
    })
      .done(response => {
        console.log(response);
        const data = sanitizeContactsData(store.removeContactById(id));
        store.setPaginationInfo({}, data);
        store.setStore(data);
        store.dispatch('contacts-fetch');
        // setTimeout(() => store.dispatch('contacts-loading-hide'), loadingDelay);
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
  store.dispatch('contacts-loading-show');  
  const sU = `${url}?${field}=${value}`;
  console.log(sU);
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
  console.log('set pagination info: ', store.getPaginationInfo());  
  store.dispatch('contacts-fetch');
  setTimeout(() => store.dispatch('contacts-loading-hide'), loadingDelay);  
};
// Page change
export const handlePageChange = (page) => {
  store.setPaginationInfo({ page });
  console.log('Change page info: ', store.getPaginationInfo());  
  store.dispatch('contacts-fetch');
};