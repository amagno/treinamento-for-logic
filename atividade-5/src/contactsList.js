import jquery from 'jquery';
import { openForm, closeForm, formReset, setContactInputValues } from './contactFormFunctions';
import { makeContactsHtml } from './contactHTML';
import { modalContactDelete } from './contactModal';
import { formOptionsDefault } from './contactForm';
import { store, deleteContact, updateContact } from './contactStore';

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
    const buttonToggle = $(this);
    const target = $(`#${this.dataset.target}`);
    if (buttonToggle.hasClass('active')) {
      buttonToggle.removeClass('active');
      buttonToggle.html('<i class="material-icons">expand_more</i> Info');
    }
    if (target.hasClass('show')) {
      target.removeClass('show');
      target.fadeOut(300);
      setTimeout(() => {
        target.removeClass('d-flex');        
        target.addClass('d-none');
      }, 300);
      return;
    }
    buttonToggle.addClass('active');
    buttonToggle.html('<i class="material-icons">expand_less</i> Info');    
    target.fadeIn(300);
    target.removeClass('d-none');
    target.addClass('show');
    target.addClass('d-flex');
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
export const isFavoriteContact = (isFavoriteButton) => {
  isFavoriteButton.click(function(event) {
    event.preventDefault();
    const id = this.dataset.target;
    const contact = store.findContactById(id);
    if (!contact) throw new Error(`Contact is not found on isFavorite update`);
    const isFavorite = !contact.isFavorite;
    updateContact({ isFavorite }, id);
  });
};
export const editContact = (editContactButton, form, buttonForm, favoriteFormButton, favoriteCheckbox) => {
  editContactButton.click(function(event) {
    event.preventDefault();
    const button = editContactButton;
    const formHTMLElement = form[0];
    const id = this.dataset.target;    
    const contact = store.findContactById(id);
     
    if (button.hasClass('active')) {
      button.html('<i class="material-icons md-36">edit</i>');  
      button.removeClass('active');
      formHTMLElement.dataset.formType = 'update';
      formHTMLElement.dataset.updateId = id;
      closeForm(buttonForm, form);
      formReset(form);
      return;
    }
    console.log('edit: ', id);
    // implement store
    button.html('<i class="material-icons md-36">cancel</i>');
    button.addClass('active');    
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
  // build html list 
  const cotactsList = contactsListContainer.html(makeContactsHtml(contacts));
  const $collapseContactButton = $('.collapse-contact-button');
  const $editContactButton = $('.edit-contact-button');
  const $deleteContactButton = $('.delete-contact-button');
  const $isFavoriteContactButton = $('.contact-edit-favorite-button');
  collapseContactToggle($collapseContactButton);
  deleteContactBt($deleteContactButton, url);
  isFavoriteContact($isFavoriteContactButton);
  editContact($editContactButton, form, buttonForm, favoriteFormButton, favoriteCheckbox, url);
  return cotactsList;
};
