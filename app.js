const express = require('express');
const path = require('path');
const mainRouteHandler = require('./routes');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(mainRouteHandler);

app.listen(PORT, () => {
  console.log(`App listiening on port ${PORT}`);
});
