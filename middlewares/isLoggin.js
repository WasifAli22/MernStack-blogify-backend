const jwt = require("jsonwebtoken");
const User = require("../model/User/User");
const isLoggin =  (req, res, next) => {
    //Get token from header
    const token = req.headers.authorization?.split(" ")[1];

    //? Verify the token
    jwt.verify(token, process.env.JWT_KEY,async (err, decoded) => {

        const userId = decoded?.user?.id;
        //add user to req obj
        //get the user id

        const user = await User.findById(userId).select("username email role _id");
        // console.log("🚀 ~ jwt.verify ~ user:", user)
        // //save user into req obj
        req.userAuth = user;
        if (err) {
          const err = new Error("Token expired/Invalid");
          next(err);
        } else {
        }
        if (err) {
            return 'invalid token'
        }
        else {
            next();
        }

    });

};

module.exports = isLoggin;