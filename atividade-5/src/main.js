import $ from 'jquery';
import './styles.scss';
import { fetchAndMakeContactsList } from './contactsList';
import { initFormContactToggle } from './newContactForm';
/**
 *  <div class="card-body">
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
 */

$(document).ready(() => {
  require('bootstrap');  
  fetchAndMakeContactsList($, '.contacts-list', 'http://localhost:3000/v1/contacts');
  initFormContactToggle();
});