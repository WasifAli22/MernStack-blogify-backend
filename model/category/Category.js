const mongoose = require("mongoose");

// Define the schema for the Category model
const categorySchema = new mongoose.Schema(
    {
        // Name of the category, a required string field
        name: {
            type: String,
            required: true,
        },

        // Author of the category, referenced by the ObjectId from the User model, required field
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        // Number of shares for the category, defaults to 0
        shares: {
            type: Number,
            default: 0,
        },

        // Posts related to the category, referenced by the ObjectId from the Post model
        posts: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    },
    {
        // Automatically include createdAt and updatedAt fields
        timestamps: true,
    }
);

// Compile the schema into a model
const Category = mongoose.model("Category", categorySchema);

// Export the model to use it in other parts of the application
module.exports = Category;
