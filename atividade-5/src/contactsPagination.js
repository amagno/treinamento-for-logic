import $ from 'jquery';
import { handlePageLimitChange } from './contactStore';
import createPaginationButtons from './createPaginationButtons';

export const contactsPaginationOptionsDefault = {
  contactsPageLimitSelect: $('#contacts-page-limit-select'),
  contactsPaginationButtons: $('#contacts-pagination-buttons'),
};
export const makePaginationButtons = (pages, active, options = contactsPaginationOptionsDefault) => {
  return createPaginationButtons(pages, active, options.contactsPaginationButtons);
};
export const initContactsPagination = (options = contactsPaginationOptionsDefault) => {
  options.contactsPageLimitSelect.change(event => {
    const limit = event.target.value;
    handlePageLimitChange(parseInt(limit));
  });
};