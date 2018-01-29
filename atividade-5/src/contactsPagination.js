import $ from 'jquery';
import { actions, store } from './data';
import createPaginationButtons from './createPaginationButtons';

const { handlePageLimitChange } = actions;

export const contactsPaginationOptionsDefault = {
  contactsPageLimitSelect: $('#contacts-page-limit-select'),
  contactsPaginationButtons: $('#contacts-pagination-buttons'),
};
// Create pagination buttons html
export const makePaginationButtons = (pages, active, options = contactsPaginationOptionsDefault) => {
  return createPaginationButtons(pages, active, options.contactsPaginationButtons);
};
// Init paginations events
export const initContactsPagination = (options = contactsPaginationOptionsDefault) => {
  const storeLimit = store.getPaginationInfo().limit;
  // console.log('Store limit', storeLimit);
  options.contactsPageLimitSelect.children(`[value="${storeLimit}"]`).prop('selected', true);
  options.contactsPageLimitSelect.fadeIn(300);
  options.contactsPageLimitSelect.change(event => {
    const limit = event.target.value;
    handlePageLimitChange(parseInt(limit));
  });
};