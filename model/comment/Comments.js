const mongoose = require("mongoose");

// Define the schema for the Comment model
const commentSchema = new mongoose.Schema(
    {
        // Text content of the comment, a required string field
        text: {
            type: String,
            required: true,
        },

        // Author of the comment, referenced by the ObjectId from the User model, required field
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        // Post to which the comment belongs, referenced by the ObjectId from the Post model, required field
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
    },
    {
        // Automatically include createdAt and updatedAt fields
        timestamps: true,
    }
);

// Compile the schema into a model
const Comment = mongoose.model("Comment", commentSchema);

// Export the model to use it in other parts of the application
module.exports = Comment;
