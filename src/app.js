const express = require('express');
const loginController = require('./controllers/login.controller');
const userController = require('./controllers/user.controller');
 const validateJWT = require('./auth/validateJWT');
// ...

const app = express();

app.use(express.json());

app.post('/login', loginController.login);

app.post('/user', userController.addUser);

app.get('/user', validateJWT, userController.getAll);

app.get('/user/:id', validateJWT, userController.getUserById);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
