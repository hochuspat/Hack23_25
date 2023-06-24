const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); 

app.use(bodyParser.json());
app.use(cors()); 

const fields = [];

app.get('/fields', (req, res) => {
  res.json(fields);
});

app.post('/fields', (req, res) => {
  if (req.body.name && req.body.crop && req.body.coordinates) { 
    const newField = {
      _id: Date.now().toString(),
      name: req.body.name,
      crop: req.body.crop,
      coordinates: req.body.coordinates,
    };

    fields.push(newField);

    res.json(newField);
  } else {
    res.status(400).send('Неверный формат данных');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
