# Products App MEAN API Server

This repository is part of an application created with MEAN stack , this is the API server. You can see the other parts of the complete project in the next links [Angular Front end]( https://github.com/DavidCZ94/products-app-MEAN-frontend) and [proxy server](https://github.com/DavidCZ94/products-app-mean-proxy-server).

This project has been created with educational purposes and the objective is to achieve a complete web application using technologies based on JavaScript such as Mongodb, expressJs, Angular and nodeJs ( MEAN ).

This server is in charge of receiving the requests coming from the proxy server and carrying out the determined actions according to the request sent.

This project has been developed taking into account good security practices such as the implementation of a proxy server, the encryption of sensitive user information using [bcrypt]( https://www.npmjs.com/package/bcrypt) and the management of the information flow by implementing [Passport.js]( http://www.passportjs.org/), [Jason Web Tokens (JWT )]( https://jwt.io/), Api-Key-Tokens, validations to determine that the information received has the appropriate format for the database (schemas), scope validation handlers, helmet, and other good practices of professional production applications. With all of the above, endpoints were implemented that will allow the management of user authentication as well as the CRUD operations of Clients, orders and products.

To see more details of the code implementation you can review the repository files in more detail.

I invite you to review the code to see the details of the implementation.

I hope that you enjoy the application and feel free to mention if the code has any errors I will gladly correct them.

## Run the aplication
  - Install [node JS](https://nodejs.org/es/download/) on your PC.
  - Clone or download project files.
```sh
$ git clone git@github.com:DavidCZ94/products-app-MEAN-api-server.git # or clone your own fork
```
  - Install the dependences
  ```sh
$ npm install
```
  - Config environment variables.
  - Run the project
  ```sh
$ npm start
```
