import $ from 'jquery';
import Util from 'bootstrap/js/src/util';
import 'bootstrap/js/dist/collapse';
import './styles.scss';

import { fetchAndMakeContactsList } from './contactsList';
import { initFormContactToggle } from './newContactForm';


$(document).ready(() => {
  window.Util = Util;
  fetchAndMakeContactsList($, '.contacts-list', 'http://localhost:3000/v1/contacts');
  initFormContactToggle();
});