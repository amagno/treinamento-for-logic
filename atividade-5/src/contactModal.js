import jquery from 'jquery';

const makeModalDelete = (contact) => `
<div class="modal fade" id="modal-delete-contact-${contact._id}" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal-title">Deletar contato!</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Deseja deletar o contato: <b>${contact.firstName} ${contact.lastName}</b> ?
        <p><small>${contact.email}</small></p>
      </div>
      <div class="modal-footer">
        <button type="button" id="dismiss-modal-delete-contact-${contact._id}" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" id="confirm-modal-delete-contact-${contact._id}" class="btn btn-danger">Confirmar</button>
      </div>
    </div>
  </div>
</div>
`;
const makeModalUpdate = (contact) => `
<div class="modal fade" id="modal-update-contact-${contact._id}" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal-title">Confirmar alteração!</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Tem certeza que deseja atualizar o contato: <b>${contact.firstName} ${contact.lastName}</b> ?
        <p><small>${contact.email}</small></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" id="confirm-modal-update-contact-${contact._id}" class="btn btn-danger">Confirmar</button>
      </div>
    </div>
  </div>
</div>
`;
export const modalContactDelete = (contact, callback, $ = jquery) => {
  const modal = makeModalDelete(contact);
  $('body').append(modal);
  $(`#modal-delete-contact-${contact._id}`).modal('show');
  $(`#confirm-modal-delete-contact-${contact._id}`).click((event) => {
    event.preventDefault();
    callback();
    $(`#modal-delete-contact-${contact._id}`).modal('hide');
    setTimeout(() => $(`#modal-delete-contact-${contact._id}`).remove(), 1000);
  });
  $(`#dismiss-modal-delete-contact-${contact._id}`).click((event) => {
    event.preventDefault();
    setTimeout(() => $(`#modal-delete-contact-${contact._id}`).remove(), 1000);
  });
};
export const modalContactUpdate = (contact, callback, $ = jquery) => {
  const modal = makeModalUpdate(contact);
  $('body').append(modal);
  $(`#modal-update-contact-${contact._id}`).modal('show');
  $(`#confirm-modal-update-contact-${contact._id}`).click((event) => {
    event.preventDefault();
    callback();
    $(`#modal-update-contact-${contact._id}`).modal('hide');
    setTimeout(() => $(`#modal-update-contact-${contact._id}`).remove(), 1000);
  });
};