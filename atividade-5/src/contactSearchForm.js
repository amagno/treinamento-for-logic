import $ from 'jquery';
import { handleFilterChange, handleSearch, store } from './contactStore';
const searchFormDefaultOptions = {
  buttonSearchField: $('.dropdown-toggle.search'),
  dropdownSearchField: $('.dropdown-item.search'),
  selectFilterOrder: $('#contacts-filter-order'),
  contactSearchInput: $('#contact-search-input')
};

export const initSearchForm = (options = searchFormDefaultOptions) => {
  let time;
  let fieldSearch = 'firstName';
  options.contactSearchInput.keyup(event => {
    store.dispatch('contacts-loading-show');
    const value = event.target.value;
    clearTimeout(time);
    time = setTimeout(() => {
      
      console.log('send request', value, fieldSearch);
      handleSearch(fieldSearch, value);
      store.dispatch('contacts-loading-hide');

    }, 1000);
  });
  options.selectFilterOrder.change(event => {
    console.log(event.target.value);
    const filter = event.target.value;
    handleFilterChange(filter);
  });

  options.dropdownSearchField.click(event => {
    console.log('dropdown clicked!');
    console.log();
    const text = event.target.innerText;
    const value = event.target.dataset.value;
    options.buttonSearchField.html(text);
    fieldSearch = value;
    options.contactSearchInput.val('').focus();
    store.dispatch('contacts-fetch');
    // console.log(value);
  });
};