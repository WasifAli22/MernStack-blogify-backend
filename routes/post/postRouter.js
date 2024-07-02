const express = require("express");
const isLoggin = require("../../middlewares/isLoggin");
const { createPost, getPosts, getPost, updatePost, deletePost } = require("../../controllers/posts/posts");
const postsRouter = express.Router();

// create
postsRouter.post("/", isLoggin, createPost )
// get all posts
postsRouter.get("/", getPosts )
// get single post
postsRouter.get("/:id", getPost )
// update post
postsRouter.put("/:id",isLoggin, updatePost )
// delete post
postsRouter.delete("/:id",isLoggin, deletePost )


module.exports = postsRouter;