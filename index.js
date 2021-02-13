const express = require('express');
const app = express();

const { config } = require('./config/index');
const productsApi = require('./routes/products');

// Body Parser
app.use(express.json());

productsApi(app);

app.listen(config.port, function () {
  console.log(`Listening on  http:localhost ${config.port}`);
});
