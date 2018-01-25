import jquery from 'jquery';
// import { defaultAvatarLink } from './contactFormFunctions';

const urlApi = 'http://localhost:3000/v1/contacts';

export const sanitizeContactsData = (contacts = []) => {
  return contacts.map(contact => {
    if (contact.isFavorite === 'false') {
      contact.isFavorite = false;
    }
    if (contact.isFavorite === 'true') {
      contact.isFavorite = true;
    }
    return {
      _id: contact._id,
      firstName: contact.firstName.toLowerCase(),
      lastName: contact.lastName.toLowerCase(),
      email: contact.email.toLowerCase(),
      isFavorite: contact.isFavorite,
      gender: contact.gender.toLowerCase(),
      info: contact.info
    };
  });
};
export const filterContacts = (key, data = []) => {
  return data.sort((a, b) => {
    return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
  });
};
export const store = {
  findContactById: (id) => {
    return store.getStore().find(contact => contact._id === id);
  },
  findIndexById: (id) => {
    return store.getStore().findIndex(contact => contact._id === id);
  },
  removeContactById: (id) => {
    return store.getStore().filter(contact => contact._id !== id);
  },
  setStore: (data) => {
    window.__CONTACTS__STORE__ = data;    
  },
  getStore: () => {
    return filterContacts(window.__CONTACTS__STORE__FILTER__, window.__CONTACTS__STORE__);
    // return window.__CONTACTS__STORE__;
  },
  setFilter: (filter) => {
    window.__CONTACTS__STORE__FILTER__ = filter;
  },
  getFilter: () => {
    return window.__CONTACTS__STORE__FILTER__;
  },
  dispatch: (eventString) => {
    const fetchEvent = new Event(eventString);
    window.dispatchEvent(fetchEvent);
  }
};
export const fetchAllContacts = (url = urlApi, $ = jquery) => {
  $.get(url)
    .done(response => {
      const data = sanitizeContactsData([
        ...store.getStore(),
        ...response
      ]);
      console.log('fetch: ', data);
      store.dispatch('contacts-loading-show');
      store.setStore(data);
      store.dispatch('contacts-fetch');
      store.dispatch('contacts-loading-hide');
    })
    .catch(error => console.error(error));
    
};
export const createContact = (contact, url = urlApi, $ = jquery) => {
  $.post(url, contact)
    .done((response) => {
      contact._id = response;
      const data = sanitizeContactsData([
        ...store.getStore(),
        contact
      ]);
      console.log('created: ', data);
      store.dispatch('contacts-loading-show');
      store.setStore(data);
      store.dispatch('contacts-fetch');
      store.dispatch('contacts-loading-hide');
    })
    .catch(error => console.log(error));
};
// go finish implement
export const updateContact = (contactAttributes, id) => {
  const storeContact = store.findContactById(id);
  // contactAttributes.info.avatar = contactAttributes.info.avatar === defaultAvatarLink && storeContact.info.avatar
  // ? storeContact.info.avatar
  // : contactAttributes.info.avatar;
  if (!storeContact) throw new Error(`contact: ${id} not found on store`);

  const contact = {
    ...storeContact,
    ...contactAttributes,  
  };
  console.log(contact);
  const data = sanitizeContactsData([
    ...store.removeContactById(id),
    contact
  ]);
  console.log(data);

  store.setStore(data);
  store.dispatch('contacts-fetch');
};
export const deleteContact = (id, url = urlApi, $ = jquery) => {
  if (!id) throw new Error('_id is not defined for delete!');
    $.ajax({
      method: 'DELETE',
      url: `${url}/${id}`
    })
      .done(response => {
        console.log(response);
        // console.log(store.removeContactById(id));
        const data = sanitizeContactsData(store.removeContactById(id));
        store.dispatch('contacts-loading-show');
        store.setStore(data);
        store.dispatch('contacts-fetch');
        store.dispatch('contacts-loading-hide');
      })
      .catch(error => console.log(error));
};
export const handleFilterChange = (filter) => {
  if (filter !== 'firstName' && filter !== 'lastName' && filter !== 'email') {
    throw new Error(`Filter: ${filter} is invalid!`);
  } 
  store.dispatch('contacts-loading-show');
  store.setFilter(filter);
  store.dispatch('contacts-fetch');
  store.dispatch('contacts-loading-hide');
};
export const handleSearch = (field, value, url = urlApi, $ = jquery) => {
  const sU = `${url}?${field}=${value}`;
  console.log(sU);
  $.get(sU)
    .done(response => {
      console.log('Send reqeust search');
      const data = sanitizeContactsData([
        ...response
      ]);
      console.log(data);

      store.setStore(data);
      store.dispatch('contacts-fetch');
    })
    .catch(error => console.error(error));
};