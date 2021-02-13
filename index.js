const express = require('express');
const app = express();

const { config } = require('./config/index');
const productsApi = require('./routes/products');

const { logErrors, errorHandler } = require('./utils/middleware/errorHandlers');

// Body Parser
app.use(express.json());

productsApi(app);

// Using the error handler middleware

app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening on  http:localhost ${config.port}`);
});
