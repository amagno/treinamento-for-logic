const express = require('express');
const path = require('path');
const app  = express();

const publicFolder = path.join(__dirname, 'public');

app.use('/', express.static(publicFolder));

app.listen(3001, () => {
  console.log('Server is running on por 3001');
});

