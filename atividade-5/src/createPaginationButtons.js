import jquery from 'jquery';
import { handlePageChange } from './contactStore';
const paginationButton = (page, active = false) => `
<li class="page-item">
<a class="btn btn-outline-secondary contacts-pagination rounded-0 font-weight-bold ${active ? 'active' : ''}" href="#" data-page="${page}">${page}</a>
</li>
`;
const beforeButtons = (active) => `
<li class="page-item">
  <a class="btn btn-outline-secondary font-weight-bold d-flex contacts-pagination-first ${active === 1 ? 'disabled' : ''}" href="#" style="border-radius: 0.25rem 0 0 0.25rem;">
    <<
  </a>
</li>
<li class="page-item">
  <a class="btn btn-outline-secondary font-weight-bold d-flex rounded-0 contacts-pagination-before ${active === 1 ? 'disabled' : ''}" href="#">
    <
  </a>
</li>
`;
const nextButtons = (active, pages) => `
<li class="page-item">
  <a class="btn btn-outline-secondary font-weight-bold d-flex rounded-0 contacts-pagination-next ${active === pages ? 'disabled' : ''}" href="#">
    >
  </a>
</li>
<li class="page-item ">
  <a class="btn btn-outline-secondary font-weight-bold d-flex contacts-pagination-last ${active === pages ? 'disabled' : ''}" href="#" style="border-radius: 0 0.25rem 0.25rem 0;">
    >>
  </a>
</li>
`;
const paginationsButtons = (pages, active, show) => {
  let html = '';
  const divisor = Math.floor(show / 2);
  const max = show - 1;
  let p = (active - divisor) > 1 ? (active - divisor) : 1 ;
  if ((p + max) > pages) {
    p = (pages - max) > 1 ? (pages - max): 1;
  }
  for (let i = 0; i < 5; i++) {
    if (p > pages) {
      break;
    }
    if (p === active) {
      html += paginationButton(p, true);
    } else {
      html += paginationButton(p);
    }
    p++;
  }
  return html;
};
export default (pages, active, container, show = 5, $ = jquery) => {
  let html = '';
  html += beforeButtons(active);
  html += paginationsButtons(pages, active, show);
  html += nextButtons(active, pages);

  const buttons = container.html(html);
  $('.contacts-pagination').click(event => {
    event.preventDefault();
    const page = parseInt(event.target.dataset.page);
    console.log(page);
    handlePageChange(page);
  });
  $('.contacts-pagination-first').click(event => {
    event.preventDefault();
    handlePageChange(1);
  });
  $('.contacts-pagination-last').click(event => {
    event.preventDefault();
    console.log('LAST PAGE', pages);
    handlePageChange(pages);
  });
  $('.contacts-pagination-next').click(event => {
    event.preventDefault();
    const gP = (active + 1) > pages ? pages : (active + 1); 
    handlePageChange(gP);
  });
  $('.contacts-pagination-before').click(event => {
    event.preventDefault();
    const gP = (active - 1) < 1 ? 1 : (active - 1);
    handlePageChange(gP);
  });
  return buttons;
};