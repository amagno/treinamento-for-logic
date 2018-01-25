export const defaultAvatarLink = 'http://fieldandstreams.com/wp-content/themes/tycoon/images/item.png';
export const closeForm = (button, form) => {
  button.removeClass(['active', 'btn-outline-danger']);
  button.addClass('btn-outline-primary');
  button.html('<i class="material-icons ml-1">person_add</i>');
  form.fadeOut(100);
};
export const openForm = (button, form) => {
  button.removeClass('btn-outline-primary');
  button.addClass(['active', 'btn-outline-danger']);
  button.html('<i class="material-icons ml-1">cancel</i>');
  form.fadeIn(300);
};
export const favoriteUnchecked = (button, checkbox) => {
  button.removeClass(['active', 'btn-primary']);
  button.children('i').html('star_border');
  button.addClass('btn-outline-secondary');
  checkbox.prop('checked', false);
};
export const favoriteChecked = (button, checkbox) => {
  checkbox.prop('checked', true);
  button.addClass(['active', 'btn-primary']);
  button.children('i').html('star');
  button.removeClass('btn-outline-secondary');
};

export const formReset = (form) => {
  form[0].reset();
  form.hide();
};
// Make post data object
export const makeDataForPost = (formDataArray) => {
  const data = {
    info: {},
    isFavorite: false,    
  };
  formDataArray.forEach(input => {
    if (input.name.includes('favorite')) {
      data.isFavorite = true;
      return;
    }
    if (input.name.includes('info')) {
      data.info[input.name.split('-')[1]] = input.value;
      return;
    }
    data[input.name] = input.value;
  });
  if (!data.info.avatar) {
    data.info.avatar = defaultAvatarLink;
  }
  return data;
};
export const setContactInputValues = (contact, form, favoriteFormButton, favoriteCheckbox) => {

  if (!contact) throw new Error('_id or contact is not defined for edit!');
  if (contact.isFavorite === 'true' || contact.isFavorite === true) {
    favoriteChecked(favoriteFormButton, favoriteCheckbox);
  }
  if (contact.isFavorite === 'false' || contact.isFavorite === false) {
    favoriteUnchecked(favoriteFormButton, favoriteCheckbox);
  }
  
  for (const key of Object.keys(contact)) {
    // console.log(key);
    // console.log(value);
    if (key === 'gender') {
      if (contact[key] === 'm') form.find('#gender-male').prop('checked', true);
      if (contact[key] === 'f') form.find('#gender-female').prop('checked', true);
    }
    if (key === 'info') {
      const info = contact[key];
      for (const infoKey of Object.keys(info)) {
        // console.log(infoKey);
        const input = form.find(`[name=info-${infoKey}]`);
        input.val(info[infoKey]);
      }
    }
    const input = form.find(`[name=${key}]`);
    input.val(contact[key]);
  }
};