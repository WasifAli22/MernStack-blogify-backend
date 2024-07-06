const { register, login, getProfile, blockUser, unblockUser, profileViewers, followingUser, unFollowingUser, forgotpassword, resetPassword, accountVerificationEmail, verifyAccount } = require("../../controllers/users/UsersCtrl");
const express = require("express");
const isLoggin = require("../../middlewares/isLoggin");
const usersRouter = express.Router();
// register route
usersRouter.post('/register', register);
// login route
usersRouter.post('/login', login);

// profile route
// isLoggin is a middleware that checks if the user is logged in or not before proceeding to the next function in the route handler
usersRouter.get('/profile/', isLoggin, getProfile);
// block user 
usersRouter.put('/block/:userIdToBlock', isLoggin, blockUser);
// Unblock user 
usersRouter.put('/unblock/:userIdToUnBlock', isLoggin, unblockUser);

// profile viewer 
usersRouter.get('/profile-viewer/:userProfileId', isLoggin, profileViewers);
// Following user 
usersRouter.put('/following/:userToFollowId', isLoggin, followingUser);
// UnFollowing user 
usersRouter.put('/unfollowing/:userToUnFollowId', isLoggin, unFollowingUser);
// Forgot password 
usersRouter.post('/forgot-password', forgotpassword);
// Reset password 
usersRouter.post('/reset-password/:resetToken', resetPassword);
// Account verification Email 
usersRouter.put('/account-verification-email',isLoggin, accountVerificationEmail);
// Verify Account  
usersRouter.put('/verify-account/:verifyToken',isLoggin, verifyAccount);

module.exports = usersRouter;