import $ from 'jquery';
import { handleFilterChange, handleSearch, fetchAllContacts, favoriteOnly, store } from './contactStore';

export const searchFormDefaultOptions = {
  buttonSearchField: $('.dropdown-toggle.search'),
  dropdownSearchField: $('.dropdown-item.search'),
  selectFilterOrder: $('#contacts-filter-order'),
  contactSearchInput: $('#contact-search-input'),
  contactSearchInputButton: $('#contact-search-input-button'),
  contactFavoriteOnlyButton: $('#contact-favorite-only-button')
};
// Init search contacts form
export const initSearchForm = (options = searchFormDefaultOptions) => {
  let time;
  let fieldSearch = 'firstName';
  // contact favorite only toggle
  options.contactFavoriteOnlyButton.click(event => {
    event.preventDefault();
    if (options.contactFavoriteOnlyButton.hasClass('active')) {
      options.contactFavoriteOnlyButton.removeClass('active');
      fetchAllContacts();
      return;
    }
    options.contactFavoriteOnlyButton.addClass('active');
    favoriteOnly();
  });
  // Serach input keyupeventhandler
  options.contactSearchInput.keyup(event => {
    store.dispatch('contacts-loading-show');
    const value = event.target.value;
    clearTimeout(time);
    time = setTimeout(() => {
      handleSearch(fieldSearch, value);
    }, 1000);
  });
  // handle sort of contacts list
  options.selectFilterOrder.change(event => {
    const filter = event.target.value;
    handleFilterChange(filter);
  });
  // Dropdown into serach input
  options.dropdownSearchField.click(event => {
    const text = event.target.innerText;
    const value = event.target.dataset.value;
    options.buttonSearchField.html(text);
    fieldSearch = value;
    if (options.contactSearchInput.val()) {
      fetchAllContacts();
    }
    options.contactSearchInput.val('').focus();
    // store.dispatch('contacts-fetch');
    // console.log(value);
  });
  // handle focus on button search click
  options.contactSearchInputButton.click(event => {
    event.preventDefault();
    options.contactSearchInput.focus();
  });
};