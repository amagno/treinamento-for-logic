const express = require('express');
const path = require('path');
const fs = require('fs');
const app  = express();
const htmlFile = path.join(__dirname, 'src', 'index.html');
const distFolder = path.join(__dirname, 'dist');

app.get('/', (req, res) => {
  const file = fs.readFileSync(htmlFile).toString('utf-8');
  res.send(file);
});

app.listen(3000, () => {
  console.log('Server is running on por 3000');
});

