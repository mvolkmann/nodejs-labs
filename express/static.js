const express = require('express');
const app = express();

// Can have one line like the following to specify
// each directory to be searched for static files.
app.use(express.static(__dirname));

const PORT = 1919;
app.listen(PORT, () => {
  console.log('browse http://localhost:' + PORT + '/google.gif');
});
