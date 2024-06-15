const { register, login, getProfile } = require("../../controllers/users/UsersCtrl");
const express = require("express");
const usersRouter = express.Router();
isLoggin = require("../../middlewares/isLoggin");
// register route
usersRouter.post('/register', register);
// login route
usersRouter.post('/login', login);

// profile route
// isLoggin is a middleware that checks if the user is logged in or not before proceeding to the next function in the route handler
usersRouter.get('/profile/', isLoggin, getProfile);

module.exports = usersRouter;