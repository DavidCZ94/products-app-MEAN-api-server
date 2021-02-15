const express = require('express');
const app = express();

const { config } = require('./config/index');
const productsApi = require('./routes/products');

const {
  logErrors,
  errorHandler,
  wrapError,
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFountHandler');

// Body Parser
app.use(express.json());

// api Router
productsApi(app);
// catch 404 error
app.use(notFoundHandler);

// Error middleware
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening on  http:localhost ${config.port}`);
});
