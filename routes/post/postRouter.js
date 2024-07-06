const express = require("express");
const isLoggin = require("../../middlewares/isLoggin");
const { createPost, getPosts, getPost, updatePost, deletePost, likePost, disLikePost, claps, schedule, getPublicPosts } = require("../../controllers/posts/posts");
const checkAccountVerification = require("../../middlewares/isAccountVerified");
const postsRouter = express.Router();

// create
postsRouter.post("/", isLoggin,checkAccountVerification, createPost )
// get all posts
postsRouter.get("/", getPosts )
// get single post
postsRouter.get("/:id", getPost )
//get only 4 posts
postsRouter.get("/public", getPublicPosts);
// update post
postsRouter.put("/:id",isLoggin, updatePost )
// delete post
postsRouter.delete("/:id",isLoggin, deletePost )
// Like post
postsRouter.put("/likes/:id",isLoggin, likePost )
// DisLike post
postsRouter.put("/dislikes/:id",isLoggin, disLikePost )
// Clap post
postsRouter.put("/claps/:id",isLoggin, claps )
// Schedule post
postsRouter.put("/schedule/:postId",isLoggin, schedule )


module.exports = postsRouter;