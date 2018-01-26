import $ from 'jquery';
import { handleFilterChange, handleSearch, fetchAllContacts, store } from './contactStore';

export const searchFormDefaultOptions = {
  buttonSearchField: $('.dropdown-toggle.search'),
  dropdownSearchField: $('.dropdown-item.search'),
  selectFilterOrder: $('#contacts-filter-order'),
  contactSearchInput: $('#contact-search-input'),
  contactSearchInputButton: $('#contact-search-input-button'),
  contactsInputLimitPage: $('#contacts-input-limit-page')
};
// Init search contacts form
export const initSearchForm = (options = searchFormDefaultOptions) => {
  let time;
  let fieldSearch = 'firstName';
  options.contactsInputLimitPage.val(store.getPaginationInfo().limit);
  // Serach input keyupeventhandler
  options.contactSearchInput.keyup(event => {
    store.dispatch('contacts-loading-show');
    const value = event.target.value;
    clearTimeout(time);
    time = setTimeout(() => {
      console.log('send request', value, fieldSearch);
      handleSearch(fieldSearch, value);
    }, 1000);
  });
  // Set order of contacts list
  options.selectFilterOrder.change(event => {
    console.log(event.target.value);
    const filter = event.target.value;
    handleFilterChange(filter);
  });
  // Dropdown into serach input
  options.dropdownSearchField.click(event => {
    console.log('dropdown clicked!');
    console.log();
    const text = event.target.innerText;
    const value = event.target.dataset.value;
    options.buttonSearchField.html(text);
    fieldSearch = value;
    options.contactSearchInput.val('').focus();
    fetchAllContacts();
    store.dispatch('contacts-fetch');
    // console.log(value);
  });
  // handle focus on button search click
  options.contactSearchInputButton.click(event => {
    event.preventDefault();
    options.contactSearchInput.focus();
  });
};