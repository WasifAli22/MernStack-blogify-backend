const mongoose = require("mongoose");

// Define the schema for the Post model
const postSchema = new mongoose.Schema(
    {
        // Title of the post, a required string field
        title: {
            type: String,
            required: true,
        },

        // URL of the post's image, defaults to an empty string
        image: {
            type: String,
            default: "",
        },

        // Number of claps (likes) the post has received, defaults to 0
        claps: {
            type: Number,
            default: 0,
        },

        // Content of the post, a required string field
        content: {
            type: String,
            required: true,
        },

        // Author of the post, referenced by the ObjectId from the User model, required field
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        // Number of times the post has been shared, defaults to 0
        shares: {
            type: Number,
            default: 0,
        },

        // Number of views the post has received, defaults to 0
        postViews: {
            type: Number,
            default: 0,
        },

        // Category of the post, referenced by the ObjectId from the Category model, required field
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Category",
        },

        // Scheduled publish date for the post, defaults to null
        scheduledPublished: {
            type: Date,
            default: null,
        },

        // Array of user references who liked the post
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        // Array of user references who disliked the post
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        // Array of comment references associated with the post
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    {
        // Automatically include createdAt and updatedAt fields
        timestamps: true,
    }
);

// Compile the schema into a model
const Post = mongoose.model("Post", postSchema);

// Export the model to use it in other parts of the application
module.exports = Post;
