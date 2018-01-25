export const contactItem = (contact) => `
<div class="col-12 col-md-6 col-xl-4 mt-1 mb-1 contact-card" id="contact-${contact._id}" data-name="${contact.firstName}">
  <div class="card">
  <div class="card-header d-flex h-100" style="min-height: 100px;">
    <img class="rounded w-25 h-25 mr-3" src="${contact.info.avatar}" alt="${contact.firstName}" style="min-width: 50px; min-height: 50px;">
    <div class="w-100 text-left">
      <div class="d-flex justify-content-between">
        <b class="text-uppercase">${contact.firstName} ${contact.lastName}</b>
        <i class="material-icons md-36 text-primary ${contact.isFavorite === true || contact.isFavorite === 'true' ? '' : 'd-none'}">star</i>
        <i class="material-icons md-36 text-primary ${!contact.isFavorite || contact.isFavorite === 'false' ? '' : 'd-none'}">star_border</i>
      </div>
      <a href="#" class="text-lowercase badge text-left badge-info" >
        ${contact.email}
      </a>
    </div>
  </div>
  <button type="button" class="btn btn-primary rounded-0 w-100 collapse-contact-button" data-target="collapse-contact-${contact._id}">More info</button>
  <div class="collapse-contact p-3 d-none" id="collapse-contact-${contact._id}">
    <button class="btn btn-danger delete-contact-button text-uppercase" data-target="${contact._id}">Delete</button>
    <button class="btn btn-primary edit-contact-button text-uppercase" data-target="${contact._id}">Edit</button>
  </div>
  </div>
</div>
`;
export const makeContactsHtml = (contacts = []) => {
  let html = '';
  contacts.forEach(contact => {
    html += contactItem(contact);
  });
  return html;
};
