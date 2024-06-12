const { register } = require("../../controllers/users/UsersCtrl");
const express = require("express");
const usersRouter = express.Router();
// register route
usersRouter.post('/api/v1/users/register',register);

module.exports = usersRouter;