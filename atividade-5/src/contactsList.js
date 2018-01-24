import jquery from 'jquery';
import { openForm, formElement, newButton } from './newContactForm';
const API_URL = 'http://localhost:3000/v1/contacts';

export const contactItem = (contact) => `
  <div class="col-12 col-md-6 col-xl-4 mt-1 mb-1 contact-card" id=contact-${contact._id} data-name="${contact.firstName}">
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
    <a href="#" class="btn btn-primary rounded-0 w-100 collapse-contact-button" data-target="collapse-contact-${contact._id}">More info</a>
    <div class="collapse-contact p-3 d-none" id="collapse-contact-${contact._id}">
      <button class="btn btn-danger delete-contact-button text-uppercase" data-target="${contact._id}">Delete</button>
      <button class="btn btn-primary edit-contact-button text-uppercase" data-target="${contact._id}">Edit</button>
    </div>
    </div>
  </div>
`;
const collapseContactToggle = ($collapseContactButton) => {
  $collapseContactButton.click(function() {
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
};
// DELETE CONTACT
const deleteContactButton = ($deleteContactButton) => {
    $deleteContactButton.click(function() {
    // console.log(this.dataset.target);
    const id = this.dataset.target;
    if (!id) throw new Error('_id is not defined for delete!');

    $.ajax({
      method: 'DELETE',
      url: `${API_URL}/${id}`
    })
      .done(response => {
        console.log(response);
        $(`#contact-${id}`).remove();
      })
      .catch(error => console.log(error));
  });
};
const editContactButton = ($editContactButton) => {
  $editContactButton.click(function() {
    const id = this.dataset.target;
    const contact = window.__CONTACTS__STORE__.find(contact => contact._id === id);
    if (!contact) throw new Error('_id or contact is not defined for edit!');
    for (const key of Object.keys(contact)) {
      console.log(key);
      //console.log(value);
      if (key === 'gender') {
        if (contact[key] === 'm') formElement.find('#gender-male').prop('checked', true);
        if (contact[key] === 'f') formElement.find('#gender-female').prop('checked', true);
      }
      if (key === 'info') {
        const info = contact[key];
        for (const infoKey of Object.keys(info)) {
          console.log(infoKey);
          const input = formElement.find(`[name=info-${infoKey}]`);
          input.val(info[infoKey]);
        }
      }
      const input = formElement.find(`[name=${key}]`);
      input.val(contact[key]);
      }
      const openFormUpdateEvent = new Event('open-form-update');
      window.dispatchEvent(openFormUpdateEvent);
  
  });
    // $.get(`${API_URL}/${id}`)
    //   .done(response => {
    //     console.log(response);
    //     // console.log();
    //     // formElement.find('input[name=firstName]').val(response.firstName);
    //     for (const key of Object.keys(response)) {
    //       console.log(key);
    //       // console.log(value);
    //       if (key === 'gender') {
    //         if (response[key] === 'm') formElement.find('#gender-male').prop('checked', true);
    //         if (response[key] === 'f') formElement.find('#gender-female').prop('checked', true);
    //       }
    //       if (key === 'info') {
    //         const info = response[key];
    //         for (const infoKey of Object.keys(info)) {
    //           console.log(infoKey);
    //           const input = formElement.find(`[name=info-${infoKey}]`);
    //           input.val(info[infoKey]);
    //         }
    //       }
    //       const input = formElement.find(`[name=${key}]`);
    //       input.val(response[key]);
    //     }
    //     formElement[0].dataset.formType = 'update';
    //     openForm(newButton, formElement);
    //   })
    //   .catch(error => console.log(error));
};
const makeContactsHtml = (contacts = []) => {
  let html = '';
  contacts.forEach(contact => {
    html += contactItem(contact);
  });
  return html;
};
// Make list
export const makeContactsList = (contacts = [], jqueryListContainer) => {
  const contactsList = jqueryListContainer.html(makeContactsHtml(contacts)).fadeIn(300);
  collapseContactToggle($('.collapse-contact-button'));
  deleteContactButton($('.delete-contact-button'));
  editContactButton($('.edit-contact-button'));
  return contactsList;
};

export const contactsListContainer = $('.contacts-list');

export const fetchContacts = (urlApi = API_URL, $ = jquery) => {
  $.get(urlApi)
    .done(data => {
      window.__CONTACTS__STORE__ = data;
      const fetchEvent = new Event('contacts-fetch');
      window.dispatchEvent(fetchEvent);
    })
    .catch(error => console.error(error));
};
export const fetchAndMakeContactsList = (jqueryListContainer = contactsListContainer, urlApi = API_URL, $ = jquery) => {

  $.get(urlApi)
    .done(data => {
      // console.log(data);
      // localStorage.setItem('data-contacts-list', JSON.stringify(data));
      // makeContactsList(data, jqueryListContainer);
      window.__CONTACTS__STORE__ = data;
      const fetchEvent = new Event('contacts-fetch');
      window.dispatchEvent(fetchEvent);

      // Collapse contact info
      $('.collapse-contact-button').click(function() {
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
      // DELETE CONTACT
      $('.delete-contact-button').click(function() {
        // console.log(this.dataset.target);
        const id = this.dataset.target;
        $.ajax({
          method: 'DELETE',
          url: `${urlApi}/${id}`
        })
          .done(response => {
            console.log(response);
            $(`#contact-${id}`).remove();
          })
          .catch(error => console.log(error));
      });
      // EDIT CONTACT
      $('.edit-contact-button').click(function() {
        const id = this.dataset.target;
        $.get(`${urlApi}/${id}`)
          .done(response => {
            console.log(response);
            // console.log();
            // formElement.find('input[name=firstName]').val(response.firstName);
            for (const key of Object.keys(response)) {
              console.log(key);
              // console.log(value);
              if (key === 'gender') {
                if (response[key] === 'm') formElement.find('#gender-male').prop('checked', true);
                if (response[key] === 'f') formElement.find('#gender-female').prop('checked', true);
              }
              if (key === 'info') {
                const info = response[key];
                for (const infoKey of Object.keys(info)) {
                  console.log(infoKey);
                  const input = formElement.find(`[name=info-${infoKey}]`);
                  input.val(info[infoKey]);
                }
              }
              const input = formElement.find(`[name=${key}]`);
              input.val(response[key]);
            }
            formElement[0].dataset.formType = 'update';
            openForm(newButton, formElement);
          })
          .catch(error => console.log(error));
      });
    })
    .catch(error => {
      console.error(error);
    });

    // Observer
    // const observer = new MutationObserver((mutationList) => {
    //   console.log('MUTATION: ', mutationList);
    //   const nodeList = jqueryListContainer.children('.contact-card');
    //   console.log(nodeList);
    //   const sortedNodeList = nodeList.sort((a,b) => {
    //     return a.dataset.name > b.dataset.name ? 1 : -1;
    //     // console.log(a.dataset.name);
    //     // console.log(b.dataset.name);
    //   });
    //   console.log(sortedNodeList);
    //   // jqueryListContainer.html(sortedNodeList);
    // });
  
    // observer.observe(jqueryListContainer[0], { childList: true, characterData: true });
};