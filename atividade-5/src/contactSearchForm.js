import $ from 'jquery';
import { actions, store } from './data';
import { createCsvBlob, downloadBlob } from './utils';

export const searchFormDefaultOptions = {
  buttonSearchField: $('.dropdown-toggle.search'),
  dropdownSearchField: $('.dropdown-item.search'),
  selectFilterOrder: $('#contacts-filter-order'),
  contactSearchInput: $('#contact-search-input'),
  contactSearchInputButton: $('#contact-search-input-button'),
  contactFavoriteOnlyButton: $('#contact-favorite-only-button'),
  exportContactsButton: $('#contact-export-button'),
  helpButton: $('#contact-help-button'),
  tooltipSelector: $('[data-tooltip="true"]')
};
const { handleFilterChange, handleSearch, fetchAllContacts, favoriteOnly } = actions;
// Init search contacts form
export const initSearchForm = (options = searchFormDefaultOptions) => {
  let time;
  let fieldSearch = 'firstName';
  options.tooltipSelector.tooltip('dispose');
  options.helpButton.click(event => {
    event.preventDefault();
    if (options.helpButton.hasClass('active')) {
      options.tooltipSelector.tooltip('dispose');
      options.helpButton.removeClass('active');
      return;
    }
    options.tooltipSelector.tooltip('show');
    setTimeout(() => options.tooltipSelector.tooltip('hide'), 3000);
    options.helpButton.addClass('active');
  });
  options.exportContactsButton.click(event => {
    event.preventDefault();
    const csv = createCsvBlob(store.getStore());
    downloadBlob(csv);
  });
  // contact favorite only toggle
  options.contactFavoriteOnlyButton.click(event => {
    event.preventDefault();
    if (options.contactFavoriteOnlyButton.hasClass('active')) {
      options.contactFavoriteOnlyButton.removeClass('active');
      favoriteOnly(false);
      return;
    }
    options.contactFavoriteOnlyButton.addClass('active');
    favoriteOnly(true);
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
  });
  // handle focus on button search click
  options.contactSearchInputButton.click(event => {
    event.preventDefault();
    options.contactSearchInput.focus();
  });
};