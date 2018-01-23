import jQuery from 'jquery';

const openContactText = 'Novo Contato<i class="material-icons ml-1">person_add</i>';
const closeContactText = 'Cancelar<i class="material-icons ml-1">cancel</i>';

export const initFormContactToggle = ($ = jQuery) => {
  const newButton = $('#contact-new-button');
  const formElement = $('#contact-new-form');
  formElement.hide();  
  newButton.html(openContactText);

  formElement.submit(event => {
    if (!formElement[0].checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    formElement.addClass('was-validated');
  });
  newButton.click(function() {
    const target = $(this);
    if (target.hasClass('active')) {
      target.removeClass(['active', 'btn-outline-danger']);
      target.addClass('btn-outline-primary');
      target.html(openContactText);
      formElement.fadeOut(100);
      return;
    }
    target.removeClass('btn-outline-primary');
    target.addClass(['active', 'btn-outline-danger']);
    target.html(closeContactText);
    formElement.fadeIn(300);
  });
};