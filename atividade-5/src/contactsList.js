import jquery from 'jquery';
import { openForm, setContactInputValues } from './contactFormFunctions';
import { makeContactsHtml } from './contactHTML';
import { modalContactDelete } from './contactModal';
import { formOptionsDefault } from './contactForm';
import { store, deleteContact } from './contactStore';

const urlApi = 'http://localhost:3000/v1/contacts';;
const $contactsListContainer = $('.contacts-list');

export const contactListOptionsDefault = {
  contactsListContainer: $contactsListContainer,
  form: formOptionsDefault.form,
  buttonForm: formOptionsDefault.buttonForm,
  favoriteFormButton: formOptionsDefault.favoriteFormButton,
  favoriteCheckbox: formOptionsDefault.favoriteCheckbox,
  url: urlApi,
  $: jquery
};

export const collapseContactToggle = (collapseContactButton, $ = jquery) => {
  collapseContactButton.click(function(event) {
    console.log('toggle');
    event.preventDefault();
    const target = $(`#${this.dataset.target}`);
    if (target.hasClass('show')) {
      target.removeClass('show');
      target.fadeOut(300);      
      setTimeout(() => target.addClass('d-none'), 500);
      return;
    }
    target.fadeIn(300);
    target.removeClass('d-none');
    target.addClass('show');
  });
  return collapseContactButton;
};
// DELETE CONTACT
export const deleteContactBt = (deleteContactButton, url) => {
    deleteContactButton.click(function(event) {
    console.log('Delete: ', this.dataset.target);
    event.preventDefault();
    const id = this.dataset.target;
    const contact = store.findContactById(id);
    modalContactDelete(contact, () => {
      deleteContact(id, url);
    });
  });
};

export const editContact = (editContactButton, form, buttonForm, favoriteFormButton, favoriteCheckbox) => {
  editContactButton.click(function(event) {
    event.preventDefault();
    const id = this.dataset.target;
    const formHTMLElement = form[0];
    console.log('edit: ', id);
    // implement store
    const contact = store.findContactById(id);
    setContactInputValues(contact, form, favoriteFormButton, favoriteCheckbox);
    formHTMLElement.dataset.formType = 'update';
    formHTMLElement.dataset.updateId = id;
    openForm(buttonForm, form);
    window.scroll(0, 0);    
  });
};

// Make list
export const makeContactsList = (contacts = [], options = contactListOptionsDefault) => {
  const {
    contactsListContainer,
    form,
    buttonForm,
    favoriteFormButton,
    favoriteCheckbox,
    url
  } = options;
  const cotactsList = contactsListContainer.html(makeContactsHtml(contacts));
  const $collapseContactButton = $('.collapse-contact-button');
  const $editContactButton = $('.edit-contact-button');
  const $deleteContactButton = $('.delete-contact-button');
  collapseContactToggle($collapseContactButton);
  deleteContactBt($deleteContactButton, url);
  editContact($editContactButton, form, buttonForm, favoriteFormButton, favoriteCheckbox, url);
  return cotactsList;
};
