import $ from 'jquery';
import { handlePageLimitChange } from './contactStore';

export const contactsPaginationOptionsDefault = {
  contactsPageLimitSelect: $('#contacts-page-limit-select'),
  contactsPaginationButtons: $('#contacts-pagination-buttons')
};

const paginationButton = (page, active = false) => `
  <li class="page-item">
  <a class="btn btn-outline-secondary rounded-0 font-weight-bold ${active ? 'active' : ''}" href="#">${page}</a>
  </li>
`;
export const makePaginationButtons = (pages, active, options = contactsPaginationOptionsDefault) => {
  let html = '';
  for (let i = 1; i <= pages; i++) {
    if (i === active) {
      html += paginationButton(i, true);
    } else {
      html += paginationButton(i);
    }
  }
  options.contactsPaginationButtons.html(html);
};

export const initContactsPagination = (options = contactsPaginationOptionsDefault) => {
  options.contactsPageLimitSelect.change(event => {
    const limit = event.target.value;
    handlePageLimitChange(parseInt(limit));
  });
};