const contactItem = (contact) => `
  <div class="col-12 col-md-6 col-xl-4 mt-1 mb-1">
    <div class="card">
    <div class="card-header d-flex h-100">
      <img class="card-img-top mr-3" src="${contact.info.avatar}" alt="${contact.firstName}" style="width: 50px; height: 50px;">
      <div class="w-100 text-left">
        <div class="d-flex justify-content-between">
          <b class="text-uppercase">${contact.firstName} ${contact.lastName}</b>
          <i class="material-icons md-36 text-primary ${contact.isFavorite ? '' : 'd-none'}">star</i>
        </div>
        <a href="#" class="text-lowercase badge text-left badge-info" >
          ${contact.email}
        </a>
      </div>
    </div>
    <a href="#" class="btn btn-primary rounded-0" style="width: 100%;" data-toggle="collapse" data-target="#collapse-contact-${contact._id}" aria-expanded="false" aria-controls="collapse-contact-${contact._id}">More info</a>
    <div class="collapse collapse-contact" id="collapse-contact-${contact._id}">
      info.....
    </div>
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


export const fetchAndMakeContactsList = ($, containerClass, urlApi) => {
  $.get(urlApi)
  .done(data => {
    makeContactsList(data, $(containerClass));
  })
  .catch(error => {
    console.error(error);
  });
};