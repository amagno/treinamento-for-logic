import $ from 'jquery';
import { initEventListeners } from './eventListeners';
import { initFormSubmit } from './contactForm';
import { initSearchForm } from './contactSearchForm';
import { initContactsPagination } from './contactsPagination';
import { actions } from './data';

import './styles.scss';
import 'bootstrap';

const { fetchAllContacts } = actions;

$(document).ready(() => {
  // EVENTS
  initEventListeners();
  initFormSubmit();
  initSearchForm();  
  initContactsPagination();
  fetchAllContacts();
});