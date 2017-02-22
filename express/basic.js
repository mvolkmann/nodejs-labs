const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/year', (req, res) => {
  res.send(new Date().getFullYear().toString());
});

const PORT = 1919;
app.listen(PORT, () => {
  console.log('browse http://localhost:' + PORT);
});
