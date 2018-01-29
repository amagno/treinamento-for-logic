export const contactItem = (contact) => `
<div class="col-12 col-md-6 col-xl-4 mt-1 mb-1 contact-card" id="contact-${contact._id}" data-name="${contact.firstName}">
  <div class="card">
  <div class="card-header d-flex h-100" style="min-height: 100px;">
    <div class="d-flex flex-column align-items-center mt-1 mr-2">
      <img class="rounded d-flex" src="${contact.info.avatar}" alt="${contact.firstName}" style="width: 50px; height: 50px;">   
    </div>
      <div class="d-flex justify-content-between w-100">
        <div class="d-flex flex-column">
          <b class="text-uppercase">${contact.firstName} ${contact.lastName}</b>
          <a href="#" class="text-lowercase badge text-left badge-info" style="white-space: inherit; width: 200px;">
            ${contact.email}
          </a>
          <button class="btn btn-outline-secondary collapse-contact-button text-uppercase d-flex justify-content-between pr-2" data-target="collapse-contact-${contact._id}" style="margin-top: 41px; padding: 0; width: 200px;">
            <i class="material-icons">expand_more</i> Info
          </button>
        </div>
        <div class="d-flex flex-column">
          <a href="#" class="contact-buttons contact-edit-favorite-button rounded-circle d-flex p-1 ${contact.isFavorite === true || contact.isFavorite === 'true' ? 'btn-primary active' : 'btn-outline-primary '}" data-target="${contact._id}">
            <i class="material-icons md-36 ${contact.isFavorite === true || contact.isFavorite === 'true' ? '' : 'd-none'}">star</i>
            <i class="material-icons md-36 ${!contact.isFavorite || contact.isFavorite === 'false' ? '' : 'd-none'}">star_border</i>
          </a>
          <a href="#" class="contact-buttons edit-contact-button rounded-circle btn-secondary d-flex p-1 mt-2" data-target="${contact._id}">
            <i class="material-icons md-36">edit</i>
          </a>
          <a href="#" class="contact-buttons delete-contact-button rounded-circle btn-danger d-flex p-1 mt-2" data-target="${contact._id}">
            <i class="material-icons md-36 text-white">delete</i>
          </a>
        </div>
      </div>

  </div>

  <div class="collapse-contact p-3 d-none flex-wrap" id="collapse-contact-${contact._id}" style="display: none">
    <div class="d-flex flex-column">
      <b>Sexo:</b>      
      <span>${contact.gender === 'f' ? 'feminino' : contact.gender === 'm' ? 'masculino' : ''}</span>
      <b>Empresa:</b>      
      <span>${contact.info.company}</span>
      <b>Endereço:</b>      
      <span>${contact.info.address}</span>
      <b>Telefone:</b>      
      <span>${contact.info.phone}</span>
      <b>Comentários:</b>      
      <span>${contact.info.comments}</span>
    </div>
  </div>
  </div>
</div>
`;
export const makeContactsHtml = (contacts = []) => {
  if (!contacts.length) {
    return '<h2>Não à contatos para exibir...</h2>';
  }
  let html = '';
  contacts.forEach(contact => {
    html += contactItem(contact);
  });
  return html;
};
