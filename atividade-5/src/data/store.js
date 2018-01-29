import { numberOfPages, favoriteOnlyFilter, filterContacts } from '../utils';

const useLocalStorage = true;

const store = {
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
    return useLocalStorage ? window.__CONTACTS__STORE__PAGINATION__ || JSON.parse(localStorage.getItem('contacts-pagination-info')) : 
    window.__CONTACTS__STORE__PAGINATION__;
  },
  setPaginationInfo: (data = {}, contacts = store.getStore(), paginationInfo = store.getPaginationInfo()) => {
    const limit = data.limit || paginationInfo.limit;
    const total = data.total || contacts.length;
    const pages = data.pages || numberOfPages(total, limit);
    const page = data.page || paginationInfo.page;
    const obj = {
      page: page > pages ? pages : page,
      pages,
      limit,
      total
    };
    if (useLocalStorage) {
      window.__CONTACTS__STORE__PAGINATION__ = undefined;
      localStorage.setItem('contacts-pagination-info', JSON.stringify(obj));
    } else {
      window.__CONTACTS__STORE__PAGINATION__ = obj;
    } 
  },
  setStore: (data) => {
    window.__CONTACTS__STORE__ = data;
  },
  getStore: () => {
    const clone = window.__CONTACTS__STORE__.slice(0);
    const filter = store.getFilter();
    const isFavorite = store.getIsFavorite();
    const filtered = filterContacts(filter, clone);
    if(isFavorite) { 
      return favoriteOnlyFilter(filtered);
    };
    return filtered;
  },
  updateContact: (contact) => {
    const clone = window.__CONTACTS__STORE__.slice(0);
    return clone.map(c => contact._id === c._id ? contact : c);
  },
  findContactById: (id) => {
    const clone = window.__CONTACTS__STORE__.slice(0);    
    return clone.find(contact => contact._id === id);
  },
  findIndexById: (id) => {
    const clone = window.__CONTACTS__STORE__.slice(0);    
    return clone.findIndex(contact => contact._id === id);
  },
  removeContactById: (id) => {
    const clone = window.__CONTACTS__STORE__.slice(0);    
    return clone.filter(contact => contact._id !== id);
  },
  dispatch: (eventString) => {
    const fetchEvent = new Event(eventString);
    window.dispatchEvent(fetchEvent);
  }
};

export default store;