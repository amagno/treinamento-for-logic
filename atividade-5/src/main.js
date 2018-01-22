import $ from 'jquery';

window.$ = $;
window.jQuery = $;


const API_URL = 'http://localhost:3000/v1';

/**
 *  <div class="card-body">
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
 */
const contactItem = (contact) => `
  <div class="card" style="width: 20rem; margin: 5px;">
    <div class="card-header">
      <img class="card-img-top" src="${contact.info.avatar}" alt="${contact.firstName}" style="width: 50px; margin-right: 10px;">
      ${contact.firstName} ${contact.lastName} 
    </div>
    

    <ul class="list-group list-group-flush">
      <li class="list-group-item"><a href="#">${contact.email}</a></li>    
      <li class="list-group-item"><a href="#">${contact.info.phone}</a></li>    
    </ul>
    <div class="card-body">
      <a href="#" class="btn btn-primary" style="width: 100%;">More info</a>
    </div>
  </div>
`;
const makeContactsList = (contacts = [], jqueryContainer) => {
  let html = '';
  contacts.forEach(contact => {
    html += contactItem(contact);
  });
  jqueryContainer.html(html);
};
$(document).ready(() => {
  $.get(`${API_URL}/contacts`)
  .done(data => {
    makeContactsList(data, $('.contacts-list'));
  })
  .catch(error => {
    console.error(error);
  });
});