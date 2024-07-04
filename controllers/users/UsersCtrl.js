const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const generateToken = require("../../utils/generateToken");

// @desc    Register a new user
exports.register = async (req, res) => {
  try {
    // get the data
    const { username, password, email } = req.body;

    //! Check if user exists
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("User Already Exists");
    }
    //Register new user
    const newUser = new User({
      username,
      email,
      password,
    });
    //! hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    // save the user
    await newUser.save();
    res.status(201).json({
      status: "success",
      message: "User Created Successfully",
      // _id: newUser?._id,
      // username: newUser?.username,
      // email: newUser?.email,
      // role: newUser?.role,
      newUser,
    });

  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
}

// @desc    Login a user
// asyncHandler is a middleware that wraps around the function to catch any errors
exports.login = asyncHandler(async (req, res) => {
  //? get the login details
  const { username, password } = req.body;
  //! Check if exists
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid login credentials");
  }
  //compare the hashed password with the one the request
  const isMatched = await bcrypt.compare(password, user?.password);
  if (!isMatched) {
    throw new Error("Invalid login credentials");
  }
  //Update the last login
  user.lastLogin = new Date();
  res.json({
    status: "success",
      email: user?.email,
      _id: user?._id,
      username: user?.username,
      role: user?.role,
      token: generateToken(user),
  });
});

// @desc    profile
exports.getProfile = async (req, res,next) => {
 //! get user id from params
  const id = req.userAuth._id;
  const user = await User.findById(id);
  try {
    
    res.json({
      status: "success",
      message: "Profile fetched",
      user,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "Profile not fetched",
      // user,
    });
  }
};

//@desc   Block user
//@route  PUT /api/v1/users/block/:userIdToBlock
//@access Private

exports.blockUser = asyncHandler(async (req, res) => {
  //* Find the user to be blocked
  const userIdToBlock = req.params.userIdToBlock;
  const userToBlock = await User.findById(userIdToBlock);
  if (!userToBlock) {
    throw new Error("User to block not found");
  }
  // ! user who is blocking
  const userBlocking = req.userAuth._id;
  // check if user is blocking him/herself
  if (userIdToBlock.toString() === userBlocking.toString()) {
    throw new Error("Cannot block yourself");
  }
  //find the current user
  const currentUser = await User.findById(userBlocking);
  //? Check if user already blocked
  if (currentUser?.blockedUsers?.includes(userIdToBlock)) {
    throw new Error("User already blocked");
  }
  //push the user to be blocked in the array of the current user
  currentUser.blockedUsers.push(userIdToBlock);
  await currentUser.save();
  res.json({
    message: "User blocked successfully",
    status: "success",
  });
});


//@desc   unBlock user
//@route  PUT /api/v1/users/unblock/:userIdToUnBlock
//@access Private

exports.unblockUser = asyncHandler(async (req, res) => {
  //* Find the user to be unblocked
  const userIdToUnBlock = req.params.userIdToUnBlock;
  const userToUnBlock = await User.findById(userIdToUnBlock);
  if (!userToUnBlock) {
    throw new Error("User to be unblock not found");
  }
  //find the current user
  const userUnBlocking = req.userAuth._id;
  const currentUser = await User.findById(userUnBlocking);

  //check if user is blocked before unblocking
  if (!currentUser.blockedUsers.includes(userIdToUnBlock)) {
    throw new Error("User not block");
  }
  //remove the user from the current user blocked users array
  currentUser.blockedUsers = currentUser.blockedUsers.filter(
    (id) => id.toString() !== userIdToUnBlock.toString()
  );
  //resave the current user
  await currentUser.save();
  res.json({
    status: "success",
    message: "User unblocked successfully",
  });
});


//@desc   who view my profile
//@route  GET /api/v1/users/profile-viewer/:userProfileId
//@access Private

exports.profileViewers = asyncHandler(async (req, res) => {
  //* Find that we want to view his profile
  const userProfileId = req.params.userProfileId;

  const userProfile = await User.findById(userProfileId);
  if (!userProfile) {
    throw new Error("User to view his profile not found");
  }

  //find the current user
  const currentUserId = req.userAuth._id;
  //? Check if user already viewed the profile
  if (userProfile?.profileViewers?.includes(currentUserId)) {
    throw new Error("You have already viewed this profile");
  }
  //push the user current user id into the user profile
  userProfile.profileViewers.push(currentUserId);
  await userProfile.save();
  res.json({
    message: "You have successfully viewed his/her profile",
    status: "success",
  });
});
