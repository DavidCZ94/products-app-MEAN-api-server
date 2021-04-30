const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

const authApi = require('./routes/auth');
const { config } = require('./config/index');
const productsApi = require('./routes/products');
const usersApi = require('./routes/users');

const {
  logErrors,
  errorHandler,
  wrapError,
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFountHandler');

// Cors
//app.use(cors({ origin: "http://localhost:4200" }))
app.use(cors());

// Body Parser
app.use(express.json());

app.use(helmet());

// api Router
authApi(app);
productsApi(app);
usersApi(app);
// catch 404 error
app.use(notFoundHandler);

// Error middleware
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening on  http:localhost ${config.port}`);
});
