const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

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
    user
    //   email: user?.email,
    //   _id: user?._id,
    //   username: user?.username,
    //   role: user?.role,
    //   token: generateToken(user),
  });
});