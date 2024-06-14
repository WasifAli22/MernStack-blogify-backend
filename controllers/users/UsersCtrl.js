const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");

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
