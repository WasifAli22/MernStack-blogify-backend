const mongoose = require("mongoose");

// Define the schema for the User model
const userSchema = new mongoose.Schema(
    {
        // Username of the user, a required string field
        username: {
            type: String,
            required: true,
        },

        // Email of the user, a required string field
        email: {
            type: String,
            required: true,
        },

        // Role of the user, can be either "user" or "admin", defaults to "user"
        role: {
            type: String,
            required: true,
            enum: ["user", "admin"],
            default: "user",
        },

        // Password of the user, a required string field
        password: {
            type: String,
            required: true,
        },

        // Last login date, defaults to the current date and time
        lastLogin: {
            type: Date,
            default: Date.now(),
        },

        // Verification status of the user's account, defaults to false
        isVerified: {
            type: Boolean,
            default: false,
        },

        // Account level of the user, can be "bronze", "silver", or "gold", defaults to "bronze"
        accountLevel: {
            type: String,
            enum: ["bronze", "silver", "gold"],
            default: "bronze",
        },

        // URL of the user's profile picture, defaults to an empty string
        profilePicture: {
            type: String,
            default: "",
        },

        // URL of the user's cover image, defaults to an empty string
        coverImage: {
            type: String,
            default: "",
        },

        // Bio of the user
        bio: {
            type: String,
        },

        // Location of the user
        location: {
            type: String,
        },

        // Notification preferences of the user
        notificationPreferences: {
            email: { type: Boolean, default: true },
            // Other notification preferences (e.g., SMS) can be added here
        },

        // Gender of the user, with predefined options
        gender: {
            type: String,
            enum: ["male", "female", "prefer not to say", "non-binary"],
        },

        // Array of user references who have viewed the profile
        profileViewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

        // Array of user references who follow this user
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

        // Array of user references who are blocked by this user
        blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

        // Array of post references created by this user
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

        // Array of post references liked by this user
        likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

        // Token for password reset functionality
        passwordResetToken: {
            type: String,
        },

        // Expiry date for the password reset token
        passwordResetExpires: {
            type: Date,
        },

        // Token for account verification functionality
        accountVerificationToken: {
            type: String,
        },

        // Expiry date for the account verification token
        accountVerificationExpires: {
            type: Date,
        },
    },
    {
        // Automatically include createdAt and updatedAt fields
        timestamps: true,
    }
);

// Compile the schema into a model
const User = mongoose.model("User", userSchema);

// Export the model to use it in other parts of the application
module.exports = User;
