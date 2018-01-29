
export const favoriteOnlyFilter = (contacts) => {
  const clone = contacts.slice(0);
  return clone.filter(c => c.isFavorite === true);
};
export const getContactsPages = (contacts, limit) => {
  const clone = contacts.slice(0);
  const data = [];
  for (let i = 0; i < clone.length; i += limit) {
    data.push(clone.slice(i, i + limit));
  }
  return data;
};
export const filterContacts = (key, data = []) => {
  return data.sort((a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    const vA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
    const vB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
    return vA > vB ? 1 : vA < vB ? -1 : 0;
  });
};
export const numberOfPages = (total, limit) => {
  return Math.ceil(total / limit);
};
export const sanitizeContactsData = (contacts = []) => {
  return contacts.map(contact => {
    if (contact.isFavorite === 'false') {
      contact.isFavorite = false;
    }
    if (contact.isFavorite === 'true') {
      contact.isFavorite = true;
    }
    return {
      _id: contact._id,
      firstName: contact.firstName.toLowerCase(),
      lastName: contact.lastName.toLowerCase(),
      email: contact.email.toLowerCase(),
      isFavorite: contact.isFavorite,
      gender: contact.gender.toLowerCase(),
      info: contact.info
    };
  });
};
export const createCsvBlob = (contacts = [], separator = ',') => {
  let s = separator;
  let csv = `"Nome"${s}"Sobrenome"${s}"E-mail"${s}"Sexo"${s}"Favorito"${s}"Empresa"${s}"Telefone"${s}"Endreço"\r\n`;
  let csvRow = '';
  contacts.forEach(c => {
    csvRow = `"${c['firstName']}"${s}"${c['lastName']}"${s}"${c['email']}"${s}"${c['gender']}"${s}"${c['isFavorite'] ? 'favorito': ''}"${s}"${c['info']['company']}"${s}"${c['info']['phone']}"${s}"${c['info']['address']}"\r\n`;
    csv += csvRow;
    csvRow = '';
  });
  return new Blob([csv], { type: 'text/csv;charset=utf-8' });
};
export const downloadBlob = (blob, filename = 'contacts.csv') => {
  const csvURL = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = csvURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
};