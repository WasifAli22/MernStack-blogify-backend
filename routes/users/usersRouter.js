const { register } = require("../../controllers/users/UsersCtrl");
const { login } = require("../../controllers/users/UsersCtrl");
const express = require("express");
const usersRouter = express.Router();
// register route
usersRouter.post('/api/v1/users/register',register);
// login route
usersRouter.post('/api/v1/users/login',login);

module.exports = usersRouter;